const Constants = {
    video: { // see https://en.wikipedia.org/wiki/Video_file_format
        mimeTypes: [
            'video/mp4',
            'video/quicktime',
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