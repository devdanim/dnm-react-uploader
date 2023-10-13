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
import uniq from 'lodash-es/uniq';
import upperFirst from 'lodash-es/upperFirst';
import FastAverageColor from 'fast-average-color';
import imageCompression from 'browser-image-compression';

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
    uniq,
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
            _forceUpdateCounter: 0,
        };

        this.change = this.change.bind(this);
        this.getFileTypes = this.getFileTypes.bind(this);
        this.getSrcType = this.getSrcType.bind(this);
        this.getAcceptedExtensions = this.getAcceptedExtensions.bind(this);
        this.updateMediaLoop = this.updateMediaLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCropClick = this.handleCropClick.bind(this);
        this.handleCutClick = this.handleCutClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleInjectUrlClick = this.handleInjectUrlClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleAudioLoad = this.handleAudioLoad.bind(this);
        this.handleVideoLoad = this.handleVideoLoad.bind(this);
        this.handleVideoLoadMetadata = this.handleVideoLoadMetadata.bind(this);
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
            ...nextProps.src !== _.get(prevState, '_src') ? { _src: nextProps.src } : null,
            // derivation
            ...nextProps.src !== _.get(prevState, '_src') ? { loaded: false, _forceUpdateCounter: 0 } : null
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
        this.initializeDrag();
        this.updateImageBackground();
        window.addEventListener('resize', this.forceUpdateOnResize);
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    componentDidUpdate(prevProps) {
        if (this.props.src !== prevProps.src) {
            if (this.props.src) this.lastChangeStart = new Date().getTime();
            this.updateImageBackground();
        }

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
            || (fileTypes.indexOf('video') !== -1 ? fileTypes.indexOf('image') !== -1 ? 'iv' : 'video' : fileTypes[0]);
    }

    getAcceptedExtensions() {
        const fileTypes = this.getFileTypes();
        const extensions = [];
        fileTypes.forEach(fileType => {
            this.extensions()[fileType].forEach(extension => extensions.push(extension));
        });
        return extensions;
    }

    async change(file, manual = true, callback = data => null) {
        const changeStartTime = new Date().getTime();
        this.lastChangeStart = changeStartTime;
        const fileTypes = this.getFileTypes(), type = this.guessType(file);
        const maxSize = this.props.maxSizes[type] || this.props.maxSize;
        if (fileTypes.indexOf(type) === -1) this.props.onInvalidFileExtensionError(this.extension(file), this.getAcceptedExtensions());
        else {
            let compressionError = null;
            if (maxSize && file.size >= maxSize) {
                if (type === 'image') {
                    let compressedFile = null;
                    this.props.onCompressStart(file);
                    try {
                        compressedFile = await imageCompression(file, {
                            maxSizeMB: maxSize / 1024 / 1024,
                            useWebWorker: true
                        });
                        if (compressedFile) file = compressedFile;
                    } catch (error) {
                        compressionError = error;
                    }
                    // If lastChangeStart has changed because of controlled or uncontrolled behavior, abort this change
                    if (this.lastChangeStart > changeStartTime) return;
                    this.props.onCompressEnd(compressedFile);
                }
            }
            if (maxSize && file.size >= maxSize) {
                this.props.onFileTooLargeError(file.size, maxSize, compressionError);
            } else this.props.onChange(file, manual, type);
        }

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
            }).catch(e => { });
        } else this.input.click();
    }

    handleCropClick(ev) {
        ev.stopPropagation();

        this.props.onCropClick();
    }

    handleCutClick(ev) {
        ev.stopPropagation();
        this.props.onCutClick();
    }

    handleEditClick(ev) {
        ev.stopPropagation();
        console.log('in');
        this.props.onEditClick();
    }

    handleDragLeave() {
        if (--this.dndCounter === 0) this.setState({ beingDropTarget: false });
    }

    handleDragEnter(ev) {
        ev.preventDefault(); // needed for IE
        if (this.dndCounter === undefined) this.dndCounter = 0;
        this.dndCounter++;
        this.setState({ beingDropTarget: true });
    }

    handleMouseEnter() {
        const srcType = this.getSrcType();
        if (!this.playing && this.props.hoverPlay && srcType === 'audio') {
            this.playing = true;
            if (this.audio) this.audio.play();
        }
    }

    handleMouseOver() {
        const srcType = this.getSrcType();
        if (!this.playing && this.props.hoverPlay && srcType === 'audio') {
            this.playing = true;
            if (this.audio) this.audio.play();
        }
    }

    handleMouseLeave() {
        const srcType = this.getSrcType();
        if (this.playing && this.props.hoverPlay && srcType === 'audio') {
            this.playing = false;
            if (this.audio) this.audio.pause();
        }
    }

    handleDrop(ev) {
        ev.preventDefault();
        this.dndCounter = 0;
        this.setState({ beingDropTarget: false });
        const file = _.get(ev, 'dataTransfer.files.0');
        if (file) this.change(file);
    }

    handleInjectUrlClick() {
        this.injectUrl(this.state.url, true);
    }

    _handleWindowScroll() {
        const srcType = this.getSrcType();
        if (this.video && (srcType === 'video' || srcType === 'iv')) {
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
            img.onload = function () {
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
        if (this.audio) {
            const { onAudioLoad } = this.props;
            this.audio.addEventListener('timeupdate', () => this.updateMediaLoop(this.audio), false);
            onAudioLoad(this.audio);
        }
        this.handleLoad();
    }

    handleImageLoad() {
        this.handleLoad();
    }

    handleVideoLoad() {
        if (this.video) {
            const { onVideoLoad } = this.props;
            this.video.addEventListener('timeupdate', () => this.updateMediaLoop(this.video), false);
            onVideoLoad(this.video);
        }
        this.handleLoad();
    }

    handleVideoLoadMetadata(event) {
        const { videoHeight } = event.target;
        if (videoHeight === 0) {
            const { onNotSupportedVideoLoad } = this.props;
            if (onNotSupportedVideoLoad) onNotSupportedVideoLoad('Video format is not supported');
        }
    }

    handleVideoPlayerError(event) {
        const { error } = event.target;
        if (error && error.code === 4) {
            const { onNotSupportedVideoLoad } = this.props;
            onNotSupportedVideoLoad(error.message);
        }
        this.handleLoad();
    }

    handleRemoveClick(ev) {
        ev.stopPropagation();

        this.props.onRemoveClick();
    }

    handleUrlChange(ev) {
        const value = ev.target.value;
        this.setState({ url: value });
    }

    updateMediaLoop(media) {
        const { range } = this.props;
        if (media && range) {
            if (media.currentTime < range[0] || media.currentTime > range[1]) media.currentTime = range[0];
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
        if (validate && !validator.isURL(url)) {
            this.props.onInvalidUrlError(url);

            return;
        }

        this.get(url)
            .then(response => {
                let name = _.last(_.split(url, '/')),
                    file = new File([response], name, { type: response.type });
                this.change(file, false, callback);
            }).catch(error => {
                this.props.onUrlInjectionError(error, url);
            });
    }

    render() {
        const srcType = this.getSrcType ? this.getSrcType() : null;
        let media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable || this.props.cuttable),
            autoPlay = null === this.props.autoPlay ? (srcType === 'video' ? true : srcType === 'iv' ? true : false) : this.props.autoPlay;

        if (this.props.src) {
            let cropStyle = null;
            if (this.props.mediaCrop && this.cropMedia && ((srcType === "image" && this.cropMedia.nodeName === "IMG") || ((srcType === "video" || srcType === "iv") && this.cropMedia.nodeName === "VIDEO"))) {
                let zoneWidth = this.zone.offsetWidth,
                    zoneHeight = this.zone.offsetHeight,
                    realWidth = (srcType === "video" || srcType === 'iv') ? this.cropMedia.videoWidth : this.cropMedia.naturalWidth,
                    realHeight = (srcType === "video" || srcType === 'iv') ? this.cropMedia.videoHeight : this.cropMedia.naturalHeight,
                    displayWidth = (srcType === "video" || srcType === 'iv') ? realWidth : this.cropMedia.offsetWidth,
                    displayHeight = (srcType === "video" || srcType === 'iv') ? realHeight : this.cropMedia.offsetHeight,
                    // Math.min usage is important, because any overflow would otherwise result in an ugly crop preview
                    mediaCrop = {
                        x: Math.min(this.props.mediaCrop.x, realWidth),
                        y: Math.min(this.props.mediaCrop.y, realHeight),
                        width: Math.min(this.props.mediaCrop.width, realWidth - this.props.mediaCrop.x),
                        height: Math.min(this.props.mediaCrop.height, realHeight - this.props.mediaCrop.y),
                    },
                    displayCropX = displayWidth * mediaCrop.x / realWidth,
                    displayCropY = displayHeight * mediaCrop.y / realHeight,
                    displayCropWidth = displayWidth * mediaCrop.width / realWidth,
                    displayCropHeight = displayHeight * mediaCrop.height / realHeight,
                    displayCropRatio = displayCropWidth / displayCropHeight,
                    displayCropTop = displayCropY,
                    displayCropRight = displayCropX + displayCropWidth,
                    displayCropBottom = displayCropY + displayCropHeight,
                    displayCropLeft = displayCropX,
                    scale = null;

                if (mediaCrop.width > 0 && mediaCrop.height > 0) {
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
                    if (this.state.loaded && this.state.mounted && this.props.mediaCrop && this.zone) {
                        media = (
                            <img
                                alt=''
                                ref={obj => this.cropMedia = obj}
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
                case 'iv':
                    media = (
                        <video
                            autoPlay={autoPlay}
                            loop
                            muted
                            crossOrigin="anonymous"
                            src={this.props.src}
                            onLoadedData={this.handleVideoLoad}
                            onLoadedMetadata={this.handleVideoLoadMetadata}
                            onError={this.handleVideoPlayerError}
                            ref={obj => {
                                this.video = obj;
                                this.cropMedia = obj;
                            }}
                            style={cropStyle ? cropStyle : this.props.backgroundSize === 'cover'
                                ? { height: '100%' } // considering the majority of videos at landscape format
                                : { maxHeight: '100%', maxWidth: '100%' }
                            }
                        />
                    );
                    break;
                case 'audio':
                    // Why key={...}?
                    // Waves would otherwise cumulate and give a final homogeneous color because of an issue in the Waveform module...
                    media = <React.Fragment key={this.props.src}>
                        <Waveform
                            className="uploader-waveform"
                            height={this.zone ? this.zone.clientHeight : 100}
                            range={this.props.range}
                            src={this.props.src}
                            onReady={this.handleAudioLoad}
                        />
                        <audio
                            autoPlay={autoPlay}
                            ref={obj => this.audio = obj}
                            src={this.props.src}
                            loop
                            controls
                            style={{
                                position: 'fixed',
                                top: '-9999px',
                                left: '-9999px',
                            }}
                        />
                    </React.Fragment>
                    break;
            }
        }

        switch (srcType) {
            case 'image':
                icon = <Svg.Image className="uploader-zone-fog-img" />;
                break;
            case 'video':
                icon = <Svg.Video className="uploader-zone-fog-img" />;
                break;
            case 'iv':
                icon = <Svg.ImageAndVideo className="uploader-zone-fog-img" />;
                break;
            case 'audio':
                icon = <Svg.Audio className="uploader-zone-fog-img" />;
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
                    ${this.props.disabled ? styles['uploader/disabled'] : null};
                `}
            >
                <input data-attr="input" ref={obj => this.input = obj} type="file" disabled={this.props.disabled} className="uploader-input" onChange={this.handleChange} />
                <div
                    ref={obj => this.zone = obj}
                    className={`
                        uploader-zone
                        ${this.props.withUrlInput ? 'uploader-zone/withUrl' : ''}
                    `}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                    onDrop={this.handleDrop}
                    style={this.props.src && srcType === 'image' ? { backgroundColor: this.state.imageBackgroundColor } : null}
                >
                    {media}
                    <div className="uploader-zone-fog" onClick={this.props.disabled ? null : this.handleClick}>
                        {this.props.fetching === true &&
                            <div className="uploader-zone-fog-loader">
                                {this.props.catalogue.loading}
                            </div>
                        }
                        <div className="uploader-zone-fog-core">
                            {!withControls ? (
                                <React.Fragment>
                                    {this.state.beingDropTarget
                                        ? <Svg.CloudComputing className="uploader-zone-fog-img" />
                                        : icon
                                    }
                                </React.Fragment>
                            ) : null}
                            {withControls === true &&
                                <React.Fragment>
                                    <div className="uploader-zone-fog-controls">
                                        {srcType === "image" && this.props.croppable === true &&
                                            <span className="uploader-zone-fog-controls-control" onClick={this.handleCropClick}>
                                                {this.props.cropIcon || <Svg.Crop />}
                                            </span>
                                        }
                                        {srcType === "audio" && this.props.cuttable === true &&
                                            <span className="uploader-zone-fog-controls-control" onClick={this.handleCutClick}>
                                                {this.props.cutIcon || <Svg.Cut />}
                                            </span>
                                        }
                                        {(srcType === "video" || srcType === 'iv') && this.props.editable === true &&
                                            <span className="uploader-zone-fog-controls-control" onClick={this.handleEditClick}>
                                                {this.props.editIcon || <Svg.Edit />}
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
                        {this.props.caption !== null &&
                            <span className="uploader-zone-fog-caption" onClick={ev => ev.stopPropagation()}>{this.props.caption}</span>
                        }
                    </div>
                </div>
                {
                    this.props.withUrlInput === true &&
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
            </div >
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
        const { additionalExtensions, extendedFileFormatSupport } = this.props;

        const extensions = {};
        ['audio', 'image', 'video'].forEach(type => {
            extensions[type] = _.uniq([...Constants.browser[type].extensions, ...(extendedFileFormatSupport === true || _.get(extendedFileFormatSupport, type) === true ? Constants.extended[type].extensions : []), ...(_.get(additionalExtensions, type) || [])])
        });
        return extensions;
    }

    mimeTypes() {
        const { additionalMimeTypes, extendedFileFormatSupport } = this.props;

        const mimeTypes = {};
        ['audio', 'image', 'video'].forEach(type => {
            mimeTypes[type] = _.uniq([...Constants.browser[type].mimeTypes, ...(extendedFileFormatSupport === true || _.get(extendedFileFormatSupport, type) === true ? Constants.extended[type].mimeTypes : []), ...(_.get(additionalMimeTypes, type) || [])])
        });
        return mimeTypes;
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

        input = this.base64MimeType(input) || this.extension(input) || input?.type;

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
    additionalExtensions: PropTypes.shape({
        audio: PropTypes.array,
        image: PropTypes.array,
        video: PropTypes.array,
    }),
    additionalMimeTypes: PropTypes.shape({
        audio: PropTypes.array,
        image: PropTypes.array,
        video: PropTypes.array,
    }),
    autoPlay: PropTypes.bool,
    backgroundColor: PropTypes.string,
    backgroundSize: PropTypes.oneOf(['contain', 'cover']),
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    catalogue: PropTypes.object,
    compact: PropTypes.bool,
    corsProof: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]), // func is a callback with src as its unique arg (e.g. we want to apply the CORS trick only for some urls, and not for others...)
    croppable: PropTypes.bool,
    editable: PropTypes.bool,
    customAttributes: PropTypes.object,
    cuttable: PropTypes.bool,
    disabled: PropTypes.bool,
    extendedFileFormatSupport: PropTypes.oneOfType([
        PropTypes.shape({
            audio: PropTypes.bool,
            image: PropTypes.bool,
            video: PropTypes.bool,
        }),
        PropTypes.bool,
    ]),
    fileType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]), // expected file type
    hoverPlay: PropTypes.bool,
    mediaCrop: PropTypes.object,
    maxSize: PropTypes.number,
    maxSizes: PropTypes.shape({
        audio: PropTypes.number,
        image: PropTypes.number,
        video: PropTypes.number,
    }),
    onChange: PropTypes.func,
    onCompressStart: PropTypes.func,
    onCompressEnd: PropTypes.func,
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
    onCutClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onAudioLoad: PropTypes.func,
    onVideoLoad: PropTypes.func,
    range: PropTypes.array,
    removable: PropTypes.bool,
    src: PropTypes.string,
    srcType: PropTypes.string, // mime
    withUrlInput: PropTypes.bool,
};

Uploader.defaultProps = {
    additionalExtensions: {},
    additionalMimeTypes: {},
    autoPlay: null, // true for video, false for audio
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    caption: null,
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
    editable: false,
    editIcon: null, // if let null, it will be default one
    croppable: false,
    cropIcon: null, // if let null, it will be default one
    customAttributes: {},
    cuttable: false,
    cutIcon: null, // if let null, it will be default one
    disabled: false,
    extendedFileFormatSupport: false,
    fileType: 'image', // may be one (or several) of: image, video
    hoverPlay: true,
    mediaCrop: null,
    maxSize: 10 * 1024 * 1024,
    maxSizes: {},
    onChange: (file, manual, type) => null, // manual: does it follow a manual action (vs. injections, for instance) ; type: image|video|...|null
    onCompressStart: () => null,
    onCompressEnd: () => null,
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
    onCutClick: () => null,
    onEditClick: () => null,
    onAudioLoad: () => null,
    onVideoLoad: () => null,
    range: null,
    removable: false,
    removeIcon: null, // if let null, it will be default one
    src: null,
    srcType: null, // e.g. video, video/mp4 (which is a more detailed MIME), etc.
    withUrlInput: false,
};