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
        this.forceUpdateOnResize = _.debounce(this._forceUpdate, 500);
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

    change(file, callback = data => null) {
        let maxSize = this.props.maxSize;
        if (this.guessFileType(file) !== this.props.fileType) this.props.onInvalidFileExtensionError();
        else if (maxSize && file.size >= maxSize) this.props.onFileTooLargeError();
        else this.props.onChange(file);

        callback(file);

        this.input.value = null; // clear input (same image set in twice would otherwise be ignored, for example)
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
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.responseType = 'blob';

            xhr.open('GET', url, true);

            xhr.onload = () => {
                if (xhr.status === 200) resolve(xhr.response);
                else reject(Error(xhr.statusText));
            };

            xhr.onerror = () => reject(Error('Network Error'));

            xhr.send();
        });
    }

    injectURL(url, validate = false, callback = data => null) {
        if (validate && ! validator.isURL(url)) {
            this.props.onInvalidURLError();

            return;
        }

        this.get(url)
            .then(response => {
                let name = _.last(_.split(url, '/')),
                    file = new File([response], name, {type: response.type});
                this.change(file, callback);
            }).catch(error => {
                this.props.onURLInjectionError(error);
            });
    }

    render() {
        let media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable);

        console.log('---------')
        console.log(this.state.loaded)
        console.log(this.props.imageCrop)
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
                                displayCropX = displayWidth * this.props.imageCrop.x / realWidth,
                                displayCropY = displayHeight * this.props.imageCrop.y / realHeight,
                                displayCropWidth = displayWidth * this.props.imageCrop.width / realWidth,
                                displayCropHeight = displayHeight * this.props.imageCrop.height / realHeight,
                                displayCropRatio = displayCropWidth / displayCropHeight,
                                scale = null;

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
                                transformOrigin: `${displayCropX + displayCropWidth / 2}px ${displayCropY + displayCropHeight / 2}px`,
                                transform: `
                                    translateX(-${displayCropX + displayCropWidth / 2}px)
                                    translateY(-${displayCropY + displayCropHeight / 2}px)
                                    scale(${scale})
                                `,
                                clip: `rect(
                                    ${displayCropY}px
                                    ${displayCropX + displayCropWidth}px
                                    ${displayCropY + displayCropHeight}px
                                    ${displayCropX}px)
                                `
                            };
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

    /**
     * Input may be a MIME Type or an extension
     * Ex: video/mp4 => video, or application/zip => compressedFile
     */
    fileType(input) {
        let isExtension = ! input.match(/\//);

        if (isExtension) {
            let extensions = {
                video: Constants.video.extensions,
                image: Constants.image.extensions,
                compressedFile: Constants.compressedFile.extensions,
            };
            // unless some have explicitly been provided
            if (this.props.extensions) extensions = {[this.props.fileType]: this.props.extensions};

            for (let k in extensions) {
                let v = _.concat(extensions[k], _.map(extensions[k], ext => _.upperCase(ext))); // case insensitive
                if (v.indexOf(input) !== -1) return k;
            }
        } else {
            let mimeTypes = {
                video: Constants.video.mimeTypes,
                image: Constants.image.mimeTypes,
                compressedFile: Constants.compressedFile.mimeTypes,
            };
            // unless some have explicitly been provided
            if (this.props.mimeTypes) mimeTypes = {[this.props.fileType]: this.props.mimeTypes};

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
    fileType: 'image',
    imageCrop: null,
    maxSize: 10 * 1000 * 1000,
    mimeTypes: null, // if not set and left as it is, we'll use default ones
    onChange: file => null,
    onCropClick: () => null,
    onFileTooLargeError: () => null,
    onFirstLoad: () => null,
    onInvalidFileExtensionError: () => null,
    onInvalidURLError: () => null,
    onLoad: () => null,
    onRemoveClick: () => null,
    onURLInjectionError: () => null,
    removable: false,
    removeIcon: null, // if let null, it will be default one
    src: null,
    withURLInput: false,
};