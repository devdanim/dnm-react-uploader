import React from 'react';
import PropTypes from 'prop-types';
const validator = {
    isURL: require('validator/isURL')
};
const Svg = require('./svg/index.js');
const FileManager = require('./file-manager.js').default;
const _ = {
    camelCase: require('lodash/camelCase'),
    difference: require('lodash/difference'),
    get: require('lodash/get'),
    last: require('lodash/last'),
    upperFirst: require('lodash/upperFirst'),
    split: require('lodash/split'),
};

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beingDropTarget: false,
            height: null,
            file: null,
            loaded: true,
            mounted: false,
            url: '',
            width: null,
        };

        this.change = this.change.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCropClick = this.handleCropClick.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleInjectURLClick = this.handleInjectURLClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.get = this.get.bind(this);
        this.injectURL = this.injectURL.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.setState({mounted: true});

        FileManager.initializeDrag();
    }

    change(file, callback = data => null) {
        let maxSize = this.props.maxSize;
        if (FileManager.guessFileType(file) !== this.props.fileType) this.props.onInvalidFileExtensionError();
        else if (maxSize && file.size >= maxSize) this.props.onFileTooLargeError();
        else this.props.onChange(file);

        callback(file);

        this.refs.input.value = null; // clear input (same image set in twice would otherwise be ignored, for example)
    }

    handleChange(ev) {
        const file = _.get(ev, 'target.files.0');
        if (file) this.change(file);
    }

    handleClick(ev) {
        this.refs.input.click();
    }

    handleCropClick(ev) {
        ev.stopPropagation();

        this.props.onCropClick();
    }

    handleDragLeave() {
        this.setState({beingDropTarget: false});
    }

    handleDragOver() {
        this.setState({beingDropTarget: true});
    }

    handleDrop(ev) {
        ev.preventDefault();
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
            this.setState({loaded: true});
        }
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
                this.props.onURLInjectionError();
            });
    }

    render() {
        let style = null,
            media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable);

        if (this.props.src) {
            const fileType = this.props.fileType || FileManager.guessFileType(this.props.src);
            switch (fileType) {
                case 'image':
                    if (this.state.loaded && this.state.mounted && this.props.imageCrop) {
                        let zoneWidth = this.refs.zone.offsetWidth,
                            zoneHeight = this.refs.zone.offsetHeight,
                            displayWidth = this.refs.img.offsetWidth,
                            displayHeight = this.refs.img.offsetHeight,
                            realWidth = this.refs.img.naturalWidth,
                            realHeight = this.refs.img.naturalHeight,
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

                        media = (
                            <img
                                alt=''
                                ref="img"
                                src={this.props.src}
                                onLoad={this.handleLoad}
                                style={{
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
                                    `,
                                }}
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
                                    ref="img"
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
                icon = <Svg.PhotoCamera className="uploader-zone-fog-img" /> ;
                break;
            case 'video':
                icon = <Svg.VideoCamera className="uploader-zone-fog-img" /> ;
                break;
        }

        return (
            <div
                data-attr="root"
                {..._.get(this.props.customAttributes, 'root', {})}
                className={`
                    uploader
                    ${_.get(this.props.customAttributes, 'root.className', '')}
                    ${this.props.fetching ? 'uploader/fetching' : ''}
                    ${this.props.withURLInput ? 'uploader/withUrl' : ''}
                    ${withControls ? 'uploader/withControls' : ''}
                `}
            >
                <input data-attr="input" ref="input" type="file" className="uploader-input" onChange={this.handleChange} />
                <div
                    ref="zone"
                    className={`
                        uploader-zone
                        ${this.props.withURLInput ? 'uploader-zone/withUrl' : ''}
                    `}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                >
                    { media }
                    <div className="uploader-zone-fog" onClick={this.handleClick}>
                        { this.state.beingDropTarget
                            ? <Svg.CloudComputing className="uploader-zone-fog-img" />
                            : icon
                        }
                        <div className="uploader-zone-fog-caption">
                            { this.props.fetching
                                ? this.props.catalogue.loading
                                : this.props.catalogue.callToAction
                            }
                        </div>
                        { withControls === true &&
                        <React.Fragment>
                            <span className="uploader-zone-fog-or">––––– { this.props.catalogue.or } –––––</span>
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
    croppable: PropTypes.bool,
    customAttributes: PropTypes.object,
    fetching: PropTypes.bool,
    fileType: PropTypes.oneOf(['image', 'video']), // expected file type
    imageCrop: PropTypes.object,
    maxSize: PropTypes.number,
    onChange: PropTypes.func,
    onCropClick: PropTypes.func,
    onFileTooLargeError: PropTypes.func,
    onFirstLoad: PropTypes.func,
    onInvalidFileExtensionError: PropTypes.func,
    onInvalidURLError: PropTypes.func,
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
        callToAction: null,
        loading: null,
        or: null,
        urlInputPlaceholder: null,
        urlSubmitText: null,
    },
    croppable: false,
    cropIcon: null, // if let null, it will be default one
    customAttributes: {},
    fetching: false,
    fileType: 'image',
    imageCrop: null,
    maxSize: 10 * 1000 * 1000,
    onChange: file => null,
    onCropClick: () => null,
    onFileTooLargeError: () => null,
    onFirstLoad: () => null,
    onInvalidFileExtensionError: () => null,
    onInvalidURLError: () => null,
    onRemoveClick: () => null,
    onURLInjectionError: () => null,
    removable: false,
    removeIcon: null, // if let null, it will be default one
    src: null,
    withURLInput: false,
};