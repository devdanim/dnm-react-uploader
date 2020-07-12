import React from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './assets/styles';
import PropTypes from 'prop-types';
import isURL from 'validator/lib/isURL';
const validator = { isURL };
import * as Svg from './svg/index';
import Constants from './constants';
// lodash
import camelCase from 'lodash-es/camelCase';
import concat from 'lodash-es/concat';
import debounce from 'lodash-es/debounce';
import difference from 'lodash-es/difference';
import get from 'lodash-es/get';
import isString from 'lodash-es/isString';
import last from 'lodash-es/last';
import map from 'lodash-es/map';
import round from 'lodash-es/round';
import split from 'lodash-es/split';
import upperFirst from 'lodash-es/upperFirst';
import upperCase from 'lodash-es/upperCase';
import 'whatwg-fetch'; // importing will automatically polyfill window.fetch and related APIs
const _ = {
    camelCase,
    concat,
    debounce,
    difference,
    get,
    isString,
    last,
    map,
    round,
    split,
    upperCase,
    upperFirst,
};

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beingDropTarget: false,
            height: null,
            file: null,
            loaded: false,
            mounted: false,
            url: '',
            width: null,
            _forceUpdateCounter: 0
        };

        this.change = this.change.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCropClick = this.handleCropClick.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleInjectURLClick = this.handleInjectURLClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.get = this.get.bind(this);
        this.injectURL = this.injectURL.bind(this);
        this.change = this.change.bind(this);
        this._forceUpdate = this._forceUpdate.bind(this);
        this.forceUpdateOnResize = _.debounce(this._forceUpdate, 250);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            // mirroring, see https://stackoverflow.com/a/50080417/6503789
            ...nextProps.src !== _.get(prevState, '_src') ? {_src: nextProps.src} : null,
            // derivation
            ...nextProps.src !== _.get(prevState, '_src') ? {loaded: false, _forceUpdateCounter: 0} : null
        };
    }

    componentDidMount() {
        this.setState({mounted: true});
        this.initializeDrag();
        window.addEventListener('resize', this.forceUpdateOnResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.forceUpdateOnResize);
    }
    
    // Hack: Force re-render by incrementing a counter to re-calculate the preview resizing infos after a window resize
    _forceUpdate() {
        this.setState({ _forceUpdateCounter: this.state._forceUpdateCounter++ });
    }

    change(file, manual = true, callback = data => null) {
        let maxSize = this.props.maxSize;
        if (this.guessFileType(file) !== this.props.fileType) this.props.onInvalidFileExtensionError(this.extension(file), this.extensions()[this.props.fileType]);
        else if (maxSize && file.size >= maxSize) this.props.onFileTooLargeError(file.size, maxSize);
        else this.props.onChange(file, manual);

        callback(file);

        this.input.value = null; // clear input (same image set in twice would otherwise be ignored, for example)

        // reinit xhr
        if (this.xhr) this.xhr.abort(); // important, ex: heavy file (HF) injection, and the user importing another light file manually (LF) during the HF loading. If the xhr were not aborted, the user would find the HF replacing its LF at any unexpected later moment
        this.xhr = null;
    }

    handleChange(ev) {
        const file = _.get(ev, 'target.files.0');
        if (file) this.change(file);
    }

    handleClick(ev) {
        this.input.click();
    }

    handleCropClick(ev) {
        ev.stopPropagation();

        this.props.onCropClick();
    }

    handleDragLeave() {
        if (--this.dndCounter === 0) this.setState({beingDropTarget: false});
    }

    handleDragEnter(ev) {
        ev.preventDefault(); // needed for IE
        if (this.dndCounter === undefined) this.dndCounter = 0;
        this.dndCounter++;
        this.setState({beingDropTarget: true});
    }

    handleDrop(ev) {
        ev.preventDefault();
        this.dndCounter = 0;
        this.setState({beingDropTarget: false});
        const file = _.get(ev, 'dataTransfer.files.0');
        if (file) this.change(file);
    }

    handleInjectURLClick() {
        this.injectURL(this.state.url, true);
    }

    handleLoad() {
        if (typeof this.firstLoadDone === 'undefined') {
            this.firstLoadDone = true;
            this.props.onFirstLoad();
        }
        this.setState({loaded: true}, this.props.onLoad);
    }

    handleRemoveClick(ev) {
        ev.stopPropagation();

        this.props.onRemoveClick();
    }

    handleURLChange(ev) {
        const value = ev.target.value;
        this.setState({url: value});
    }

    get(url) {
        // return fetch(url, {mode: 'cors'}).then(response => response.blob());

        return new Promise((resolve, reject) => {
            this.xhr = new XMLHttpRequest();

            this.xhr.responseType = 'blob';

            this.xhr.open('GET', url, true);

            this.xhr.onload = () => {
                if (this.xhr.status === 200) resolve(this.xhr.response);
                else reject(Error(this.xhr.statusText));
            };

            this.xhr.onerror = () => reject(Error('Network Error'));

            this.xhr.send();
        });
    }

    injectURL(url, validate = false, callback = data => null) {
        if (validate && ! validator.isURL(url)) {
            this.props.onInvalidURLError(url);

            return;
        }

        this.get(url)
            .then(response => {
                let name = _.last(_.split(url, '/')),
                    file = new File([response], name, {type: response.type});
                this.change(file, false, callback);
            }).catch(error => {
                this.props.onURLInjectionError(error, url);
            });
    }

    render() {
        let media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable);

        if (this.props.src) {
            const fileType = this.props.fileType || this.guessFileType(this.props.src);
            switch (fileType) {
                case 'image':
                    if (this.state.loaded && this.state.mounted && this.props.imageCrop && this.zone) {
                        let style = {};
                        if (this.cropImg) {
                            let zoneWidth = this.zone.offsetWidth,
                                zoneHeight = this.zone.offsetHeight,
                                displayWidth = this.cropImg.offsetWidth,
                                displayHeight = this.cropImg.offsetHeight,
                                realWidth = this.cropImg.naturalWidth,
                                realHeight = this.cropImg.naturalHeight,
                                // Math.min usage is important, because any overflow would otherwise result in an ugly crop preview
                                imageCrop = {
                                    x: Math.min(this.props.imageCrop.x, realWidth),
                                    y: Math.min(this.props.imageCrop.y, realHeight),
                                    width: Math.min(this.props.imageCrop.width, realWidth - this.props.imageCrop.x),
                                    height: Math.min(this.props.imageCrop.height, realHeight - this.props.imageCrop.y),
                                },
                                displayCropX = displayWidth * imageCrop.x / realWidth,
                                displayCropY = displayHeight * imageCrop.y / realHeight,
                                displayCropWidth = displayWidth * imageCrop.width / realWidth,
                                displayCropHeight = displayHeight * imageCrop.height / realHeight,
                                displayCropRatio = displayCropWidth / displayCropHeight,
                                displayCropTop = displayCropY,
                                displayCropRight = displayCropX + displayCropWidth,
                                displayCropBottom = displayCropY + displayCropHeight,
                                displayCropLeft = displayCropX,
                                scale = null;

                            if (imageCrop.width > 0 && imageCrop.height > 0) {
                                // image fit to zone
                                if (this.props.backgroundSize === 'contain') {
                                    if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneWidth / displayCropWidth;
                                    else scale = zoneHeight / displayCropHeight;
                                } else {
                                    if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneHeight / displayCropHeight;
                                    else scale = zoneWidth / displayCropWidth;
                                }

                                style = {
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transformOrigin: `${(displayCropLeft + displayCropRight) / 2}px ${(displayCropTop + displayCropBottom) / 2}px`,
                                    transform: `
                                        translateX(-${(displayCropLeft + displayCropRight) / 2}px)
                                        translateY(-${(displayCropTop + displayCropBottom) / 2}px)
                                        scale(${scale})
                                    `,
                                    clip: `rect(
                                        ${displayCropTop}px
                                        ${displayCropRight}px
                                        ${displayCropBottom}px
                                        ${displayCropLeft}px)
                                    `
                                };
                            }
                        }

                        media = (
                            <img
                                alt=''
                                ref={obj => this.cropImg = obj}
                                src={this.props.src}
                                onLoad={this._forceUpdate}
                                style={style}
                            />
                        );
                    } else {
                        media = (
                            <div style={{
                                backgroundColor: this.props.backgroundColor,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: this.props.backgroundSize,
                                backgroundImage: `url(${this.props.src})`,
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}>
                                <img
                                    alt=''
                                    ref={obj => this.img = obj}
                                    src={this.props.src}
                                    onLoad={this.handleLoad}
                                    style={{
                                        position: 'fixed',
                                        top: '-9999px',
                                        left: '-9999px',
                                    }}
                                />
                            </div>
                        );
                    }
                    break;
                case 'video':
                    media = (
                        <video
                            autoPlay
                            loop
                            muted
                            src={this.props.src}
                            onLoadedData={this.handleLoad}
                            style={this.props.backgroundSize === 'cover'
                                ? {height: '100%'} // considering the majority of videos at landscape format
                                : {maxHeight: '100%', maxWidth: '100%'}
                            }
                        />
                    );
                    break;
            }
        }

        switch (this.props.fileType) {
            case 'image':
                icon = <Svg.Image className="uploader-zone-fog-img" /> ;
                break;
            case 'video':
                icon = <Svg.Video className="uploader-zone-fog-img" /> ;
                break;
        }

        return (
            <div
                data-attr="root"
                {..._.get(this.props.customAttributes, 'root', {})}
                className={`
                    uploader
                    ${_.get(this.props.customAttributes, 'root.className', '')}
                `}
                css={css`
                    ${styles.uploader};
                    ${this.props.fetching ? styles['uploader/fetching'] : null};
                    ${this.props.withURLInput ? styles['uploader/withUrl'] : null};
                    ${withControls ? styles['uploader/withControls'] : null};
                `}
            >
                <input data-attr="input" ref={obj => this.input = obj} type="file" className="uploader-input" onChange={this.handleChange} />
                <div
                    ref={obj => this.zone = obj}
                    className={`
                        uploader-zone
                        ${this.props.withURLInput ? 'uploader-zone/withUrl' : ''}
                    `}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                >
                    { media }
                    <div className="uploader-zone-fog" onClick={this.handleClick}>
                        { !this.props.compact || (!this.props.removable && !this.props.croppable) || !this.props.src ? (       
                            <React.Fragment>
                                { this.state.beingDropTarget
                                    ? <Svg.CloudComputing className="uploader-zone-fog-img" />
                                    : icon
                                }
                                <div className="uploader-zone-fog-caption">
                                    { this.props.fetching
                                        ? this.props.catalogue.loading
                                        : `${this.props.catalogue.click}${this.props.catalogue.drop ? `/${this.props.catalogue.drop}` : ''}${this.props.withURLInput ? `/${this.props.catalogue.typeURL}` : ''}`
                                    }
                                </div>
                            </React.Fragment>
                        ) : null }
                        { withControls === true &&
                        <React.Fragment>
                            { !this.props.compact ? (
                                <div className="uploader-zone-fog-or">
                                    <div className="uploader-zone-fog-or-wing" />
                                    <div className="uploader-zone-fog-or-body">{ this.props.catalogue.or }</div>
                                    <div className="uploader-zone-fog-or-wing" />
                                </div>
                            ) : null }
                            <div className="uploader-zone-fog-controls">
                                {this.props.croppable === true &&
                                <span className="uploader-zone-fog-controls-control" onClick={this.handleCropClick}>
                                    {this.props.cropIcon || <Svg.Crop />}
                                </span>
                                }
                                {this.props.removable === true &&
                                <span className="uploader-zone-fog-controls-control" onClick={this.handleRemoveClick}>
                                    {this.props.removeIcon || <Svg.Garbage />}
                                </span>
                                }
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </div>
                { this.props.withURLInput === true &&
                <div className="uploader-url">
                    <input
                        className="uploader-url-input"
                        name="url"
                        value={this.state.url}
                        placeholder={this.props.catalogue.urlInputPlaceholder}
                        type="text"
                        onChange={this.handleURLChange}
                        onKeyPress={ev => {
                            if (ev.which === 13) { // enter would otherwise submit form
                                ev.preventDefault();
                                this.handleInjectURLClick();
                            }
                        }}
                    />
                    <span className="uploader-url-addon" onClick={this.handleInjectURLClick}>
                        <Svg.InternetGlobe className="uploader-url-addon-icon" />
                        {this.props.catalogue.urlSubmitText}
                    </span>
                </div>
                }
            </div>
        );
    }

    // + utils

    /**
     * Input may be url string, base64, File.
     */
    guessFileType(input) {
        return this.fileType(this.base64MimeType(input) || this.extension(input))
    }

    /**
     * From Base64 dataURL to MIME Type
     * Returns null when input is invalid
     */
    base64MimeType(encoded) {
        let result = null;

        if (typeof encoded !== 'string') return result;

        let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) result = mime[1];

        return result;
    }

    isBase64(input) {
        return this.base64MimeType(input) !== null;
    }

    /**
     * From string|File to extension
     * Ex: https://upload.wikimedia.org/wikipedia/commons/d/da/Nelson_Mandela%2C_2000_%285%29_%28cropped%29.jpg => jpg
     */
    extension(input) {
        input = _.isString(input) ? input : input.name;
        return _.last(_.split(input, '.'));
    }

    extensions() {
        let extensions = {
            video: Constants.video.extensions,
            image: Constants.image.extensions,
            compressedFile: Constants.compressedFile.extensions,
        };
        // unless some have explicitly been provided
        if (this.props.extensions) extensions = {[this.props.fileType]: this.props.extensions};

        return extensions;
    }

    mimeTypes() {
        let mimeTypes = {
            video: Constants.video.mimeTypes,
            image: Constants.image.mimeTypes,
            compressedFile: Constants.compressedFile.mimeTypes,
        };
        // unless some have explicitly been provided
        if (this.props.mimeTypes) mimeTypes = {[this.props.fileType]: this.props.mimeTypes};

        return mimeTypes;
    }

    /**
     * Input may be a MIME Type or an extension
     * Ex: video/mp4 => video, or application/zip => compressedFile
     */
    fileType(input) {
        let isExtension = !input.match(/\//);

        if (isExtension) {
            let extensions = this.extensions();

            for (let k in extensions) {
                let v = _.concat(extensions[k], _.map(extensions[k], ext => _.upperCase(ext))); // case insensitive
                if (v.indexOf(input) !== -1) return k;
            }
        } else {
            let mimeTypes = this.mimeTypes();

            for (let k in mimeTypes) {
                let v = mimeTypes[k];
                if (v.indexOf(input) !== -1) return k;
            }
        }

        return null;
    }

    /**
     * From '100000000' to '100 MB'
     */
    humanSize(size, round = true) {
        let units = ['B', 'KB', 'MB', 'GB', 'TB'];
        for (let power = units.length - 1; power >= 0; power--) {
            let tmpRes = size * 1.0 / Math.pow(1000, power);
            if (tmpRes >= 1) {
                if (round) tmpRes = _.round(tmpRes);
                return `${tmpRes} ${units[power]}`;
            }
        }
    }

    initializeDrag() {
        // avoid browser drop management
        window.addEventListener('dragover', ev => {
            ev = ev || event;
            ev.preventDefault();
        }, false);
        window.addEventListener('drop', ev => {
            ev = ev || event;
            ev.preventDefault();
        }, false);
    }
}

Uploader.propTypes = {
    // optional
    backgroundColor: PropTypes.string,
    backgroundSize: PropTypes.oneOf(['contain', 'cover']),
    catalogue: (props, propName, componentName) => {
        const givenCatalogue = props[propName],
            givenPropsKeys = Object.keys(props[propName]),
            expectedPropsKeys = Object.keys(Uploader.defaultProps[propName]);

        if (!givenCatalogue || typeof givenCatalogue !== 'object') throw new Error('Catalogue must be an object.');

        const diffKeys = _.difference(expectedPropsKeys, givenPropsKeys);

        if (diffKeys.length) throw new Error('Given catalogue is insufficient. Missing keys: ' + JSON.stringify(diffKeys));
    },
    compact: PropTypes.bool,
    croppable: PropTypes.bool,
    customAttributes: PropTypes.object,
    extensions: PropTypes.array,
    fetching: PropTypes.bool,
    fileType: PropTypes.oneOf(['compressedFile', 'image', 'video']), // expected file type
    imageCrop: PropTypes.object,
    maxSize: PropTypes.number,
    mimeTypes: PropTypes.array,
    onChange: PropTypes.func,
    onCropClick: PropTypes.func,
    onFileTooLargeError: PropTypes.func,
    onFirstLoad: PropTypes.func,
    onInvalidFileExtensionError: PropTypes.func,
    onInvalidURLError: PropTypes.func,
    onLoad: PropTypes.func,
    onRemoveClick: PropTypes.func,
    onURLInjectionError: PropTypes.func,
    removable: PropTypes.bool,
    src: PropTypes.string,
    withURLInput: PropTypes.bool,
};

Uploader.defaultProps = {
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    catalogue: {
        click: null,
        drop: null,
        typeURL: null,
        loading: null,
        or: null,
        urlInputPlaceholder: null,
        urlSubmitText: null,
    },
    compact: true,
    croppable: false,
    cropIcon: null, // if let null, it will be default one
    customAttributes: {},
    extensions: null, // if not set and left as it is, we'll use default ones
    fetching: false,
    fileType: 'image', // may be one of: image, video
    imageCrop: null,
    maxSize: 10 * 1000 * 1000,
    mimeTypes: null, // if not set and left as it is, we'll use default ones
    onChange: (file, manual) => null, // manual: does it follow a manual action (vs. injections, for instance)
    onCropClick: () => null,
    onFileTooLargeError: (size, maxSize) => null,
    onFirstLoad: () => null,
    onInvalidFileExtensionError: (extension, expectedExtensions) => null,
    onInvalidURLError: url => null,
    onLoad: () => null,
    onRemoveClick: () => null,
    onURLInjectionError: (error, url) => null,
    removable: false,
    removeIcon: null, // if let null, it will be default one
    src: null,
    withURLInput: false,
};