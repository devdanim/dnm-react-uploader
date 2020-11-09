import React from 'react';
import { render } from 'react-dom';
import Uploader from '../dist/dnm-react-uploader.es';
import * as Svg from '../src/svg';

const catalogue = {
    click: 'Custom: Click!',
    drop: null,
    typeURL: 'Type URL',
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
                src: 'https://wallpaperplay.com/walls/full/2/5/0/200799.jpg',
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
                    compact={true}
                    fileType={"image"}
                    catalogue={catalogue}
                    maxSize={50 * 1000 * 1000}
                    onChange={(file, manual) => console.log('onChange', file, manual ? 'Done manually' : 'Done programmatically')}
                    onFirstLoad={() => console.log('onFirstLoad')}
                    onLoad={() => console.log('onLoad')}
                    withURLInput={true}
                    extensions={['png', 'jpeg', 'jpg']}
                    mimeTypes={['image/png', 'image/jpeg']}
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
                    compact={true}
                    fetching={true}
                    fileType="image"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Osmium_crystals.jpg/2880px-Osmium_crystals.jpg"
                    catalogue={catalogue}
                    maxSize={50 * 1000 * 1000}
                    onChange={(file, manual) => console.log('onChange 2', file, manual ? 'Done manually' : 'Done programmatically')}
                    onFirstLoad={() => console.log('onFirstLoad 2 (but still showing loader since this a controlled prop)')}
                    onLoad={() => console.log('onLoad 2 (but still showing loader since this a controlled prop)')}
                    extensions={['png', 'jpeg', 'jpg']}
                    mimeTypes={['image/png', 'image/jpeg']}
                    onFileTooLargeError={() => alert('onFileTooLargeError 2')}
                    onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError 2')}
                    onInvalidURLError={() => alert('onInvalidURLError 2')}
                    onURLInjectionError={() => alert('onURLInjectionError 2')}
                />
                <div id="second-uploader-parent">
                    <Uploader
                        // heavy on purpose, to check loading look
                        src={this.state.second.src}
                        customAttributes={{
                            root: {
                                id: 'third-uploader'
                            }
                        }}
                        catalogue={catalogue}
                        compact={true}
                        removable={true}
                        onRemoveClick={() => alert('onRemoveClick 3')}
                        croppable={true}
                        onCropClick={() => alert('onCropClick 3')}
                        maxSize={500 * 1000 * 1000}
                        onChange={file => this.setState(prevState => ({
                            second: {
                                ...prevState.second,
                                src: URL.createObjectURL(file)
                            }
                        }))}
                        onFirstLoad={() => console.log('onFirstLoad 3')}
                        onLoad={() => console.log('onLoad 3')}
                        onFileTooLargeError={() => alert('onFileTooLargeError 3')}
                        onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError 3')}
                        onInvalidURLError={() => alert('onInvalidURLError 3')}
                        onURLInjectionError={() => alert('onURLInjectionError 3')}
                        removeIcon={<Svg.Erase />}
                        imageCrop={{x: 2000, y: 2000, width: 1000, height: 1000}}
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