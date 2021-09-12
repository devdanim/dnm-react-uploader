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
import FastAverageColor from 'fast-average-color';
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
    upperFirst,
};
import Waveform from './components/Waveform';

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
            imageBackgroundColor: 'rgba(0, 0, 0, 0)',
            imageIsDark: false,
            _forceUpdateCounter: 0
        };

        this.change = this.change.bind(this);
        this.getFileTypes = this.getFileTypes.bind(this);
        this.getSrcType = this.getSrcType.bind(this);
        this.getAcceptedExtensions = this.getAcceptedExtensions.bind(this);
        this.updateVideoLoop = this.updateVideoLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCropClick = this.handleCropClick.bind(this);
        this.handleVideoCutClick = this.handleVideoCutClick.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleInjectUrlClick = this.handleInjectUrlClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleAudioLoad = this.handleAudioLoad.bind(this);
        this.handleVideoLoad = this.handleVideoLoad.bind(this);
        this.handleVideoPlayerError = this.handleVideoPlayerError.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.get = this.get.bind(this);
        this.injectUrl = this.injectUrl.bind(this);
        this.change = this.change.bind(this);
        this.updateImageBackground = this.updateImageBackground.bind(this);
        this.updateImageBackgroundInState = this.updateImageBackgroundInState.bind(this);
        this._forceUpdate = this._forceUpdate.bind(this);
        this._handleWindowScroll = this._handleWindowScroll.bind(this);

        this.forceUpdateOnResize = _.debounce(this._forceUpdate, 250);
        this.handleWindowScroll = _.debounce(this._handleWindowScroll, 250);
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
        this.updateImageBackground();
        window.addEventListener('resize', this.forceUpdateOnResize);
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    componentDidUpdate(prevProps) {
        if (this.props.src !== prevProps.src) this.updateImageBackground();

        // If the user decided to redisplay the loader, but the source has not changed since, immediately trigger onLoad event
        if (this.props.fetching && !prevProps.fetching && this.props.src && prevProps.src === this.props.src && this.state.loaded) this.props.onLoad();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.forceUpdateOnResize);
        window.removeEventListener('scroll', this.handleWindowScroll);
    }
    
    // Hack: Force re-render by incrementing a counter to re-calculate the preview resizing infos after a window resize
    _forceUpdate() {
        const srcType = this.getSrcType();
        if (srcType !== "video") this.setState({ _forceUpdateCounter: this.state._forceUpdateCounter++ });
    }

    getFileTypes() {
        const { fileType } = this.props;
        return typeof fileType === "string" ? [fileType] : fileType;
    }

    getSrcType() {
        const fileTypes = this.getFileTypes();
        return this.guessType(this.props.srcType)
            || this.guessType(this.props.src)
            || fileTypes[0];
    }

    getAcceptedExtensions() {
        const fileTypes = this.getFileTypes();
        const extensions = [];
        fileTypes.forEach(fileType => {
            this.extensions()[fileType].forEach(extension => extensions.push(extension));
        });
        return extensions;
    }

    change(file, manual = true, callback = data => null) {
        let maxSize = this.props.maxSize;
        const fileTypes = this.getFileTypes(), type = this.guessType(file);
        if (fileTypes.indexOf(type) === -1) this.props.onInvalidFileExtensionError(this.extension(file), this.getAcceptedExtensions());
        else if (maxSize && file.size >= maxSize) this.props.onFileTooLargeError(file.size, maxSize);
        else this.props.onChange(file, manual, type);

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
        const { onUploaderClick } = this.props;
        if (onUploaderClick) {
            onUploaderClick().then((file) => {
                if (file) this.change(file);
            }).catch(e => {});
        } else this.input.click();
    }

    handleCropClick(ev) {
        ev.stopPropagation();

        this.props.onCropClick();
    }

    handleVideoCutClick(ev) {
        ev.stopPropagation();
        this.props.onVideoCutClick();
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

    handleInjectUrlClick() {
        this.injectUrl(this.state.url, true);
    }

    _handleWindowScroll() {
        const srcType = this.getSrcType();
        if (this.video && srcType === 'video') {
            const rect = this.video.getBoundingClientRect();
            // https://stackoverflow.com/a/60018490
            if ((rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth))) {
                this.video.play();
            } else {
                this.video.pause();
            }
        }
    }

    handleLoad() {
        const { onFirstLoad, onLoad } = this.props;
        if (typeof this.firstLoadDone === 'undefined') {
            this.firstLoadDone = true;
            onFirstLoad();
        }
        this.setState({ loaded: true }, onLoad);
    }

    updateImageBackground() {
        if (this.props.src && this.getSrcType() === 'image') {
            const img = new Image();
            const updateImageBackgroundInState = this.updateImageBackgroundInState;
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                const fac = new FastAverageColor();
                const color = fac.getColor(img);
                if (color) {
                    const { isDark, value } = color;
                    let rgba = isDark ? [235, 235, 235, 1] : [20, 20, 20, 1];
                    if (value[3] >= (0.95 * 255)) rgba = [value[0], value[1], value[2], 0.5];
                    updateImageBackgroundInState(rgba, isDark);
                }
            };
            img.src = this.props.src;
            return true;
        }
        return false;
    }

    updateImageBackgroundInState(rgba, imageIsDark) {
        this.setState({ imageBackgroundColor: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`, imageIsDark });
    }

    handleAudioLoad() {
        this.handleLoad();
    }

    handleImageLoad() {
        this.handleLoad();
    }

    handleVideoLoad() {
        if (this.video) {
            const { onVideoLoad } = this.props;
            this.video.addEventListener('timeupdate', this.updateVideoLoop, false);
            onVideoLoad(this.video);
        }
        this.handleLoad();
    }

    handleVideoPlayerError(event) {
        const { error } = event.target;
        if (error && error.code === 4) {
            const { onNotSupportedVideoLoad } = this.props;
            onNotSupportedVideoLoad(error.message);
        }
    }

    handleRemoveClick(ev) {
        ev.stopPropagation();

        this.props.onRemoveClick();
    }

    handleUrlChange(ev) {
        const value = ev.target.value;
        this.setState({url: value});
    }

    updateVideoLoop() {
        const { range } = this.props;
        if (this.video && range) {
            if (this.video.currentTime < range[0] || this.video.currentTime > range[1]) this.video.currentTime = range[0];
        }
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

    injectUrl(url, validate = false, callback = data => null) {
        if (validate && ! validator.isURL(url)) {
            this.props.onInvalidUrlError(url);

            return;
        }

        this.get(url)
            .then(response => {
                let name = _.last(_.split(url, '/')),
                    file = new File([response], name, {type: response.type});
                this.change(file, false, callback);
            }).catch(error => {
                this.props.onUrlInjectionError(error, url);
            });
    }

    render() {
        const srcType = this.getSrcType();
        let media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable || this.props.cuttable);

        if (this.props.src) {
            let cropStyle = null;
            if(this.props.imageCrop && this.cropImg && ((srcType === "image" && this.cropImg.nodeName === "IMG") || (srcType === "video" && this.cropImg.nodeName === "VIDEO"))) {
                let zoneWidth = this.zone.offsetWidth,
                    zoneHeight = this.zone.offsetHeight,
                    realWidth = srcType === "video" ? this.cropImg.videoWidth : this.cropImg.naturalWidth,
                    realHeight = srcType === "video" ? this.cropImg.videoHeight : this.cropImg.naturalHeight,
                    displayWidth = srcType === "video" ? realWidth : this.cropImg.offsetWidth,
                    displayHeight = srcType === "video" ? realHeight : this.cropImg.offsetHeight,
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

                    cropStyle = {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        backgroundColor: this.state.imageIsDark ? 'white' : 'black',
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
            switch (srcType) {
                case 'image':
                    if (this.state.loaded && this.state.mounted && this.props.imageCrop && this.zone) {
                        media = (
                            <img
                                alt=''
                                ref={obj => this.cropImg = obj}
                                crossOrigin="anonymous"
                                src={this.props.src}
                                onLoad={this._forceUpdate}
                                style={cropStyle}
                            />
                        );
                    } else {
                        media = (
                            <div style={{
                                backgroundColor: this.props.backgroundColor,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: this.props.backgroundSize,
                                backgroundImage: this.state.loaded ? `url(${this.props.src}${(typeof this.props.corsProof === 'boolean' ? this.props.corsProof : this.props.corsProof(this.props.src)) ? `${this.props.src.match(/^http/) ? `${this.props.src.includes('?') ? '&' : '?'}xCssCors=1` : ''}` : ''})` : null, // this is no-CORS request, we therefore need to be sure the cached response (e.g. Chrome) has been a CORS one (see the <img /> below) before display
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}>
                                <img
                                    alt=''
                                    crossOrigin="anonymous"
                                    src={this.props.src}
                                    onLoad={this.handleImageLoad}
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
                            crossOrigin="anonymous"
                            src={this.props.src}
                            onLoadedData={this.handleVideoLoad}
                            onError={this.handleVideoPlayerError}
                            ref={obj => this.video = obj}
                            style={cropStyle ? cropStyle : this.props.backgroundSize === 'cover'
                                ? {height: '100%'} // considering the majority of videos at landscape format
                                : {maxHeight: '100%', maxWidth: '100%'}
                            }
                        />
                    );
                    break;
                case 'audio':
                    media = (
                        <Waveform 
                            className="uploader-waveform"
                            height={this.zone ? this.zone.clientHeight : 100}
                            range={this.props.range}
                            src={this.props.src}
                            onReady={this.handleAudioLoad}
                        />
                    )
                    break;
            }
        }

        switch (srcType) {
            case 'image':
                icon = <Svg.Image className="uploader-zone-fog-img" /> ;
                break;
            case 'video':
                icon = <Svg.Video className="uploader-zone-fog-img" /> ;
                break;     
            case 'audio': 
                icon = <Svg.Audio className="uploader-zone-fog-img" /> ;
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
                    ${this.props.compact ? styles['uploader/compact'] : null};
                    ${this.props.withUrlInput ? styles['uploader/withUrl'] : null};
                    ${withControls ? styles['uploader/withControls'] : null};
                `}
            >
                <input data-attr="input" ref={obj => this.input = obj} type="file" className="uploader-input" onChange={this.handleChange} />
                <div
                    ref={obj => this.zone = obj}
                    className={`
                        uploader-zone
                        ${this.props.withUrlInput ? 'uploader-zone/withUrl' : ''}
                    `}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                    style={this.props.src && srcType === 'image' ? { backgroundColor: this.state.imageBackgroundColor } : null}
                >
                    { media }
                    <div className="uploader-zone-fog" onClick={this.handleClick}>
                        { this.props.fetching === true &&
                        <div className="uploader-zone-fog-loader">
                            {this.props.catalogue.loading}
                        </div>
                        }
                        <div className="uploader-zone-fog-core">
                            { !this.props.compact || (!this.props.removable && !this.props.croppable && !this.props.cuttable) || !this.props.src ? (
                                <React.Fragment>
                                    { this.state.beingDropTarget
                                        ? <Svg.CloudComputing className="uploader-zone-fog-img" />
                                        : icon
                                    }
                                    {
                                        !this.props.compact ? (
                                            <div className="uploader-zone-fog-caption">
                                                { `${this.props.catalogue.click}${this.props.catalogue.drop ? `/${this.props.catalogue.drop}` : ''}${this.props.withUrlInput ? `/${this.props.catalogue.typeUrl}` : ''}` }
                                            </div>
                                        ) : null
                                    }
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
                                        {srcType === "image" && this.props.croppable === true &&
                                            <span className="uploader-zone-fog-controls-control" onClick={this.handleCropClick}>
                                                {this.props.cropIcon || <Svg.Crop />}
                                            </span>
                                        }
                                        {(srcType === "video" || srcType === "audio") && this.props.cuttable === true &&
                                            <span className="uploader-zone-fog-controls-control" onClick={this.handleVideoCutClick}>
                                                {this.props.cutIcon || <Svg.Cut />}
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
                        { (this.props.src && this.state.loaded && this.props.credits !== null) === true &&
                        <span className="uploader-zone-fog-credits" onClick={ev => ev.stopPropagation()}>{this.props.credits}</span>
                        }
                    </div>
                </div>
                { this.props.withUrlInput === true &&
                <div className="uploader-url">
                    <input
                        className="uploader-url-input"
                        name="url"
                        value={this.state.url}
                        placeholder={this.props.catalogue.urlInputPlaceholder}
                        type="text"
                        onChange={this.handleUrlChange}
                        onKeyPress={ev => {
                            if (ev.which === 13) { // enter would otherwise submit form
                                ev.preventDefault();
                                this.handleInjectUrlClick();
                            }
                        }}
                    />
                    <span className="uploader-url-addon" onClick={this.handleInjectUrlClick}>
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
        return _.last(_.split(_.split(input, '?')[0], '.'));
    }

    extensions() {
        return {
            video: Constants.video.extensions,
            image: Constants.image.extensions,
            audio: Constants.audio.extensions,
        };
    }

    mimeTypes() {
        return {
            video: Constants.video.mimeTypes,
            image: Constants.image.mimeTypes,
            audio: Constants.audio.mimeTypes,
        };
    }

    /**
     * Input may be a MIME Type, an extension, url string, base64, or even a type
     * Ex:
     *      - null => null
     *      - undefined => null
     *      - https://cloud.path/to/file.mp4 => video
     *      - data:image/jpeg;base64...(folded)... => image
     *      - video/mp4 => video
     *      - .jpeg => image
     *      - .mock => null
     *      - application/octet-stream => null
     */
    guessType(input) {
        if (!input) return null;

        input = this.base64MimeType(input) || this.extension(input);

        let isExtension = !input.match(/\//);

        if (isExtension) {
            let extensions = this.extensions();

            for (let k in extensions) {
                let v = _.concat(extensions[k], _.map(extensions[k], ext => ext.toUpperCase())); // case insensitive
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
     * From ~ 100 000 000 => 100 MB
     */
    humanSize(size, round = true) {
        let units = ['B', 'KB', 'MB', 'GB', 'TB'];
        for (let power = units.length - 1; power >= 0; power--) {
            let tmpRes = size * 1.0 / Math.pow(1024, power);
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
    corsProof: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]), // func is a callback with src as its unique arg (e.g. we want to apply the CORS trick only for some urls, and not for others...)
    credits: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // e.g. you may directly provide the <a>
    croppable: PropTypes.bool,
    customAttributes: PropTypes.object,
    cuttable: PropTypes.bool,
    fileType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]), // expected file type
    imageCrop: PropTypes.object,
    maxSize: PropTypes.number,
    onChange: PropTypes.func,
    onCropClick: PropTypes.func,
    onCutClick: PropTypes.func,
    onFileTooLargeError: PropTypes.func,
    onFirstLoad: PropTypes.func,
    onInvalidFileExtensionError: PropTypes.func,
    onInvalidUrlError: PropTypes.func,
    onLoad: PropTypes.func,
    onRemoveClick: PropTypes.func,
    onUploaderClick: PropTypes.func,
    onUrlInjectionError: PropTypes.func,
    onVideoCutClick: PropTypes.func,
    onVideoLoad: PropTypes.func,
    range: PropTypes.array,
    removable: PropTypes.bool,
    src: PropTypes.string,
    srcType: PropTypes.string, // mime
    withUrlInput: PropTypes.bool,
};

Uploader.defaultProps = {
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    catalogue: {
        click: null,
        drop: null,
        typeUrl: null,
        loading: null,
        or: null,
        urlInputPlaceholder: null,
        urlSubmitText: null,
    },
    compact: false,
    corsProof: true,
    credits: null,
    croppable: false,
    cropIcon: null, // if let null, it will be default one
    customAttributes: {},
    cuttable: false,
    cutIcon: null, // if let null, it will be default one
    fileType: 'image', // may be one (or several) of: image, video
    imageCrop: null,
    maxSize: 10 * 1000 * 1000,
    onChange: (file, manual, type) => null, // manual: does it follow a manual action (vs. injections, for instance) ; type: image|video|...|null
    onCropClick: () => null,
    onFileTooLargeError: (size, maxSize) => null,
    onFirstLoad: () => null,
    onInvalidFileExtensionError: (extension, expectedExtensions) => null,
    onInvalidUrlError: url => null,
    onLoad: () => null,
    onNotSupportedVideoLoad: () => null,
    onRemoveClick: () => null,
    onUploaderClick: null, // Useful with electron to use a custom file dialog
    onUrlInjectionError: (error, url) => null,
    onVideoCutClick: () => null,
    onVideoLoad: () => null,
    range: null,
    removable: false,
    removeIcon: null, // if let null, it will be default one
    src: null,
    srcType: null, // e.g. video, video/mp4 (which is a more detailed MIME), etc.
    withUrlInput: false,
};