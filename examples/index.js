import React from 'react';
import { render } from 'react-dom';
import Uploader from '../dist/dnm-react-uploader.es';
import * as Svg from '../src/svg';

const catalogue = {
    click: 'Custom: Click!',
    drop: null,
    typeURL: 'Type URL',
    loading: 'Only PNG',
    or: 'Custom OR',
    urlInputPlaceholder: 'Custom URL input',
    urlSubmitText: 'Custom URL submit',
};

render(
    <React.Fragment>
        <Uploader
            customAttributes={{
                root: {
                    id: 'first-uploader'
                }
            }}
            compact={true}
            fetching={true}
            fileType="image"
            catalogue={catalogue}
            maxSize={50 * 1000 * 1000}
            onChange={file => console.log('onChange', file)}
            onFirstLoad={() => console.log('onFirstLoad')}
            onLoad={() => console.log('onLoad')}
            withURLInput={true}
            extensions={['png']}
            mimeTypes={['image/png']}
            onFileTooLargeError={() => alert('onFileTooLargeError')}
            onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError')}
            onInvalidURLError={() => alert('onInvalidURLError')}
            onURLInjectionError={() => alert('onURLInjectionError')}
        />
        <div id="second-uploader-parent">
            <Uploader
                // heavy on purpose, to check loading look
                src="https://wallpaperplay.com/walls/full/2/5/0/200799.jpg"
                customAttributes={{
                    root: {
                        id: 'second-uploader'
                    }
                }}
                catalogue={catalogue}
                compact={true}
                removable={true}
                onRemoveClick={() => alert('onRemoveClick')}
                croppable={true}
                onCropClick={() => alert('onCropClick')}
                maxSize={500 * 1000 * 1000}
                onChange={file => console.log('onChange', file)}
                onFirstLoad={() => console.log('onFirstLoad')}
                onLoad={() => console.log('onLoad')}
                onFileTooLargeError={() => alert('onFileTooLargeError')}
                onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError')}
                onInvalidURLError={() => alert('onInvalidURLError')}
                onURLInjectionError={() => alert('onURLInjectionError')}
                removeIcon={<Svg.Erase />}
                imageCrop={{
                    x: 50, y: 50, width: 200, height: 150
                }}
                backgroundSize="contain"
            />
        </div>
    </React.Fragment>,
    document.getElementById('root')
);