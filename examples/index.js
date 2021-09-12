import React from 'react';
import { render } from 'react-dom';
import Uploader from '../dist/dnm-react-uploader.es';
import * as Svg from '../src/svg';

const catalogue = {
    click: 'Custom: Click!',
    drop: null,
    typeUrl: 'Type URL',
    loading: 'Loading...',
    or: 'Custom OR',
    urlInputPlaceholder: 'Custom URL input',
    urlSubmitText: 'Custom URL submit',
};

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: {},
            second: {
                // src: 'https://images.unsplash.com/photo-1617642171292-afad99eee7ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
                // src: 'https://app.danim.com/logo.png',
                // src: null,
                src: 'https://s3.eu-west-3.amazonaws.com/com.danim.test/fireplace.mp3',
                // srcType: 'image/png'
            },
        };
    }

    render() {
        return (
            <React.Fragment>
                <Uploader
                    customAttributes={{
                        root: {
                            id: 'first-uploader'
                        }
                    }}
                    compact={false}
                    fileType={['image', 'video']}
                    catalogue={catalogue}
                    maxSize={50 * 1000 * 1000}
                    onChange={(file, manual) => console.log('onChange', file, manual ? 'Done manually' : 'Done programmatically')}
                    onFirstLoad={() => console.log('onFirstLoad')}
                    onLoad={() => console.log('onLoad')}
                    withURLInput={true}
                    onUploaderClick={() => new Promise(resolve => {
                        alert("Custom uploader click");
                        resolve(null);
                    })}
                    onFileTooLargeError={() => alert('onFileTooLargeError')}
                    onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError')}
                    onInvalidURLError={() => alert('onInvalidURLError')}
                    onURLInjectionError={() => alert('onURLInjectionError')}
                />
                <Uploader
                    customAttributes={{
                        root: {
                            id: 'second-uploader'
                        }
                    }}
                    compact={false}
                    fetching={true}
                    fileType="image"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Osmium_crystals.jpg/2880px-Osmium_crystals.jpg"
                    catalogue={catalogue}
                    maxSize={50 * 1000 * 1000}
                    onChange={(file, manual) => console.log('onChange 2', file, manual ? 'Done manually' : 'Done programmatically')}
                    onFirstLoad={() => console.log('onFirstLoad 2 (but still showing loader since this a controlled prop)')}
                    onLoad={() => console.log('onLoad 2 (but still showing loader since this a controlled prop)')}
                    onFileTooLargeError={() => alert('onFileTooLargeError 2')}
                    onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError 2')}
                    onInvalidURLError={() => alert('onInvalidURLError 2')}
                    onURLInjectionError={() => alert('onURLInjectionError 2')}
                />
                <div id="second-uploader-parent">
                    <Uploader
                        // heavy on purpose, to check loading look
                        src={this.state.second.src}
                        srcType={this.state.second.srcType}
                        customAttributes={{
                            root: {
                                id: 'third-uploader'
                            }
                        }}
                        catalogue={catalogue}
                        compact={true}
                        removable
                        onRemoveClick={() => alert('onRemoveClick 3')}
                        croppable
                        onCropClick={() => alert('onCropClick 3')}
                        cuttable
                        onCutClick={() => {
                            alert('onCutClick 3')
                            console.log('Fireplace replaced with rain in 4s')
                            setTimeout(() => {
                                this.setState({
                                    second: {
                                        src: 'https://s3.eu-west-3.amazonaws.com/com.danim.test/rain.mp3',
                                    }
                                })
                            }, 4000)
                        }}
                        maxSize={500 * 1000 * 1000}
                        onChange={file => this.setState(prevState => ({
                            second: {
                                ...prevState.second,
                                src: URL.createObjectURL(file),
                                srcType: file.type,
                            }
                        }))}
                        fileType="audio"
                        onFirstLoad={() => console.log('onFirstLoad 3')}
                        onLoad={() => console.log('onLoad 3')}
                        onFileTooLargeError={() => alert('onFileTooLargeError 3')}
                        onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError 3')}
                        onInvalidURLError={() => alert('onInvalidURLError 3')}
                        onURLInjectionError={() => alert('onURLInjectionError 3')}
                        onNotSupportedVideoLoad={(err) => console.error("Video source not supported", err)}
                        removeIcon={<Svg.Erase />}
                        imageCrop={{x: 0, y: 0, width: 100, height: 100}}
                        backgroundSize="contain"
                    />
                </div>
            </React.Fragment>
        );
    }
}

render(
    <Page />,
    document.getElementById('root')
);