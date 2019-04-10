export default class SmartCroppr extends React.Component {
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
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    change(file, callback = data => null) {
        let maxSize = this.props.maxSize;
        if (! maxSize && this.props.src) maxSize = root.state.constants[`${_.upperFirst(_.camelCase(guessFileType(this.props.src)))}File`].MAX_SIZE.value;
        if (guessFileType(file) !== this.props.fileType)
            addFlash({
                type: 'danger',
                message: trans('front.uploader.invalid_file_extension', {}, 'bridge-general', this.context.locale.catalogue)
            });
        else if (maxSize && file.size >= maxSize)
            addFlash({
                type: 'danger',
                message: trans('front.uploader.file_too_large', {max_size: humanSize(maxSize)}, 'bridge-general', this.context.locale.catalogue)
            });
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

            xhr.withCredentials = true;
            xhr.responseType = 'blob';

            xhr.open('GET', url);

            xhr.onload = () => {
                if (xhr.status === 200) resolve(xhr.response);
                else reject(Error(xhr.statusText));
            };

            xhr.onerror = () => reject(Error("Network Error"));

            xhr.send();
        });
    }

    injectURL(url, validate = false, callback = data => null) {
        if (validate && ! validator.isURL(url)) {
            addFlash({
                type: 'danger',
                message: trans('front.uploader.url.invalid', {}, 'bridge-general', this.context.locale.catalogue)
            });

            return;
        }

        this.get(url)
            .then(response => {
                let name = _.last(_.split(url, '/')),
                    file = new File([response.data], name, {type: response.data.type});
                this.change(file, callback);
            }).catch(error => {
                cl(error.message);
                addFlash({
                    type: 'danger',
                    message: trans('front.uploader.url.error', {}, 'bridge-general', this.context.locale.catalogue)
                });
            });
    }

    render() {
        let style = null,
            media = null,
            icon = null,
            withControls = this.props.src && (this.props.removable || this.props.croppable);

        if (this.props.src) {
            switch (guessFileType(this.props.src)) {
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
                                alt
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
                                    alt
                                    ref="img"
                                    className="hidden"
                                    src={this.props.src}
                                    onLoad={this.handleLoad}
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
                icon = <App.Svg.PhotoCamera className="uploader-zone-fog-img" /> ;
                break;
            case 'video':
                icon = <App.Svg.VideoCamera className="uploader-zone-fog-img" /> ;
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
                { (this.props.label || '') !== '' &&
                <label className="uploader-label">{this.props.label}</label>
                }
                { (this.props.feedback || '') !== '' &&
                <div className={`uploader-feedback ${this.props.valid !== null ? `uploader-feedback/${this.props.valid ? 'valid' : 'invalid'}` : ''}`}>{this.props.feedback}</div>
                }
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
                            ? <App.Svg.CloudComputing className="uploader-zone-fog-img" />
                            : icon
                        }
                        <div className="uploader-zone-fog-caption">
                            { this.props.fetching
                                ? trans('front.uploader.loading', {}, 'bridge-general', this.context.locale.catalogue)
                                : (
                                    <React.Fragment>
                                        { trans('front.uploader.call_to_action.part_1', {}, 'bridge-general', this.context.locale.catalogue) }
                                        { this.props.withURLInput === true && trans('front.uploader.call_to_action.part_2', {}, 'bridge-general', this.context.locale.catalogue) }
                                    </React.Fragment>
                                )
                            }
                        </div>
                        { withControls === true &&
                        <React.Fragment>
                            <App.Or text={trans('front.uploader.or', {}, 'bridge-general', this.context.locale.catalogue)} />
                            <div className="uploader-zone-fog-controls">
                                { this.props.croppable === true &&
                                <App.TooltipBox caption={trans('front.uploader.controls.crop', {}, 'bridge-general', this.context.locale.catalogue)} positionStyle={{left: '50%', bottom: 'calc(100% + 0.5rem)', transform: 'translateX(-50%)'}}>
                                    <App.Svg.Crop className="uploader-zone-fog-controls-control" onClick={this.handleCropClick} />
                                </App.TooltipBox>
                                }
                                { this.props.removable === true &&
                                <App.TooltipBox caption={trans('front.uploader.controls.remove', {}, 'bridge-general', this.context.locale.catalogue)} positionStyle={{left: '50%', bottom: 'calc(100% + 0.5rem)', transform: 'translateX(-50%)'}}>
                                    <App.Svg.Garbage className="uploader-zone-fog-controls-control" onClick={this.handleRemoveClick} />
                                </App.TooltipBox>
                                }
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </div>
                { this.props.withURLInput === true &&
                <Strap.InputGroup className="uploader-url">
                    <Strap.Input
                        className="uploader-url-input"
                        name="url"
                        value={this.state.url}
                        placeholder={trans('front.uploader.url.placeholder', {}, 'bridge-general', this.context.locale.catalogue)}
                        type="text"
                        onChange={this.handleURLChange}
                        onKeyPress={ev => {
                            if (ev.which === 13) { // enter would otherwise submit form
                                ev.preventDefault();
                                this.handleInjectURLClick();
                            }
                        }}
                    />
                    <Strap.InputGroupAddon addonType="append" onClick={this.handleInjectURLClick}>
                        <Strap.InputGroupText>
                            <Fa.Icon icon="globe" />
                            {trans('front.uploader.url.submit', {}, 'bridge-general', this.context.locale.catalogue)}
                        </Strap.InputGroupText>
                    </Strap.InputGroupAddon>
                </Strap.InputGroup>
                }
            </div>
        );
    }
}

SmartCroppr.propTypes = {
    // optional
    backgroundColor: PropTypes.string,
    backgroundSize: PropTypes.oneOf(['contain', 'cover']),
    croppable: PropTypes.bool,
    customAttributes: PropTypes.object,
    feedback: PropTypes.string, // todo: remove
    fetching: PropTypes.bool,
    fileType: PropTypes.oneOf(['image', 'video']), // expected file type
    label: PropTypes.string, // todo: remove
    imageCrop: PropTypes.object,
    maxSize: PropTypes.number,
    onChange: PropTypes.func,
    onCropClick: PropTypes.func,
    onFirstLoad: PropTypes.func,
    onRemoveClick: PropTypes.func,
    removable: PropTypes.bool,
    src: PropTypes.string,
    valid: PropTypes.bool, // todo: remove
    withURLInput: PropTypes.bool,
};

SmartCroppr.defaultProps = {
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    croppable: false,
    customAttributes: {},
    feedback: '',
    fetching: false,
    fileType: 'image',
    imageCrop: null,
    label: '',
    maxSize: null,
    onChange: file => null,
    onCropClick: () => null,
    onFirstLoad: () => null,
    onRemoveClick: () => null,
    removable: false,
    src: null,
    valid: null,
    withURLInput: false,
};