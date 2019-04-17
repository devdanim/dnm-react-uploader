import React from 'react';
import { render } from 'react-dom';
import Uploader from '../src';
import * as Svg from '../src/svg';

render(
    <React.Fragment>
        <Uploader
            customAttributes={{
                root: {
                    id: 'first-uploader'
                }
            }}
            fetching={true}
            catalogue={{
                callToAction: 'Custom call to action',
                loading: 'Custom loading caption',
                or: 'Custom OR',
                urlInputPlaceholder: 'Custom URL input',
                urlSubmitText: 'Custom URL submit',
            }}
            maxSize={50 * 1000 * 1000}
            onChange={file => console.log('onChange', file)}
            onFirstLoad={() => console.log('onFirstLoad')}
            withURLInput={true}
            onFileTooLargeError={() => alert('onFileTooLargeError')}
            onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError')}
            onInvalidURLError={() => alert('onInvalidURLError')}
            onURLInjectionError={() => alert('onURLInjectionError')}
        />
        <Uploader
            src="https://images.unsplash.com/photo-1554676187-e9a89ddb659e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            customAttributes={{
                root: {
                    id: 'second-uploader'
                }
            }}
            catalogue={{
                callToAction: 'Custom call to action',
                loading: 'Custom loading caption',
                or: 'Custom OR',
                urlInputPlaceholder: 'Custom URL input',
                urlSubmitText: 'Custom URL submit',
            }}
            removable={true}
            onRemoveClick={() => alert('onRemoveClick')}
            croppable={true}
            onCropClick={() => alert('onCropClick')}
            maxSize={500 * 1000 * 1000}
            onChange={file => console.log('onChange', file)}
            onFirstLoad={() => console.log('onFirstLoad')}
            onFileTooLargeError={() => alert('onFileTooLargeError')}
            onInvalidFileExtensionError={() => alert('onInvalidFileExtensionError')}
            onInvalidURLError={() => alert('onInvalidURLError')}
            onURLInjectionError={() => alert('onURLInjectionError')}
            removeIcon={<Svg.Erase />}
        />
    </React.Fragment>,
    document.getElementById('root')
);