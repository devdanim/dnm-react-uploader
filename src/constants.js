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
    audio: {
        mimeTypes: [
            'audio/wav',
            'audio/x-wav',
            'audio/mpeg',
            'audio/mp3',
            'audio/mpeg3',
            'audio/x-mpeg',
            'audio/x-mp3',
            'audio/x-mpeg3',
        ],
        extensions: [
            'wav',
            'mp3',
        ]
    }
};

export default Constants;