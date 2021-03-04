const Constants = {
    video: { // see https://en.wikipedia.org/wiki/Video_file_format
        mimeTypes: [
            'video/mp4',
            'video/quicktime',
            'application/octet-stream', // /!\ Important for JS blobs. This is valid as long as the only used types are image/video.
        ],
        extensions: [
            'mp4',
            'mov',
        ]
    },
    image: { // see https://github.com/arthurvr/image-extensions/blob/master/image-extensions.json
        mimeTypes: [
            'image/jpeg',
            'image/png',
        ],
        extensions: [
            'jpeg',
            'jpg',
            'png',
        ]
    },
};

export default Constants;