var FileManager = {};

import Constants from './constants';
// lodash
import _concat from 'lodash/concat';
import _isString from 'lodash/isString';
import _last from 'lodash/last';
import _map from 'lodash/map';
import _round from 'lodash/round';
import _split from 'lodash/split';
import _upperCase from 'lodash/upperCase';
const _ = {
    concat: _concat,
    isString: _isString,
    last: _last,
    map: _map,
    round: _round,
    split: _split,
    upperCase: _upperCase,
};

FileManager.initializeDrag = () => {
    // avoid browser drop management
    window.addEventListener('dragover', ev => {
        ev = ev || event;
        ev.preventDefault();
    }, false);
    window.addEventListener('drop', ev => {
        ev = ev || event;
        ev.preventDefault();
    }, false);
};

/**
 * From Base64 dataURL to MIME Type
 * Returns null when input is invalid
 */
FileManager.base64MimeType = encoded => {
    let result = null;

    if (typeof encoded !== 'string') return result;

    let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) result = mime[1];

    return result;
};

FileManager.isBase64 = input => FileManager.base64MimeType(input) !== null;

/**
 * From string|File to extension
 * Ex: https://upload.wikimedia.org/wikipedia/commons/d/da/Nelson_Mandela%2C_2000_%285%29_%28cropped%29.jpg => jpg
 */
FileManager.extension = input => {
    input = _.isString(input) ? input : input.name;
    return _.last(_.split(input, '.'));
};

/**
 * Input may be a MIME Type or an extension
 * Ex: video/mp4 => video, or application/zip => compressedFile
 */
FileManager.fileType = input => {
    let isExtension = ! input.match(/\//);

    if (isExtension) {
        let extensions = {
            video: Constants.video.extensions,
            image: Constants.image.extensions,
            compressedFile: Constants.compressedFile.extensions,
        };

        for (let k in extensions) {
            let v = _.concat(extensions[k], _.map(extensions[k], ext => _.upperCase(ext))); // case insensitive
            if (v.indexOf(input) !== -1) return k;
        }
    } else {
        let mimeTypes = {
            video: Constants.video.mimeTypes,
            image: Constants.image.mimeTypes,
            compressedFile: Constants.compressedFile.mimeTypes,
        };

        for (let k in mimeTypes) {
            let v = mimeTypes[k];
            if (v.indexOf(input) !== -1) return k;
        }
    }

    return null;
};

/**
 * Input may be url string, base64, File.
 */
FileManager.guessFileType = input => FileManager.fileType(FileManager.base64MimeType(input) || FileManager.extension(input));

/**
 * From '100000000' to '100 MB'
 */
FileManager.humanSize = (size, round = true) => {
    let units = ['B', 'KB', 'MB', 'GB', 'TB'];
    for (let power = units.length - 1; power >= 0; power--) {
        let tmpRes = size * 1.0 / Math.pow(1000, power);
        if (tmpRes >= 1) {
            if (round) tmpRes = _.round(tmpRes);
            return `${tmpRes} ${units[power]}`;
        }
    }
};

export default FileManager;