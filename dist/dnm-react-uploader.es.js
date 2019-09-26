import React from 'react';
import PropTypes from 'prop-types';
import isURL from 'validator/lib/isURL';
import concat from 'lodash-es/concat';
import isString from 'lodash-es/isString';
import last from 'lodash-es/last';
import map from 'lodash-es/map';
import round from 'lodash-es/round';
import split from 'lodash-es/split';
import upperCase from 'lodash-es/upperCase';
import camelCase from 'lodash-es/camelCase';
import difference from 'lodash-es/difference';
import get from 'lodash-es/get';
import upperFirst from 'lodash-es/upperFirst';
import debounce from 'lodash-es/debounce';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var CloudComputing = function CloudComputing(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 512.001 512.001"
  }, props), React.createElement("path", {
    d: "M405.967 187.467c-1.069-78.061-64.902-141.239-143.213-141.239-34.835 0-68.396 12.672-94.498 35.682-23.296 20.535-39.232 47.977-45.543 78.106-.461-.005-.918-.009-1.374-.009C54.434 160.008 0 214.441 0 281.347s54.434 121.339 121.34 121.339h44.534c6.029 0 10.919-4.888 10.919-10.919 0-6.031-4.89-10.919-10.919-10.919H121.34c-54.866 0-99.502-44.636-99.502-99.501s44.636-99.501 99.502-99.501c2.923 0 6.013.157 9.448.48 5.822.54 11.049-3.596 11.842-9.396 3.932-28.82 18.161-55.327 40.067-74.638 22.111-19.492 50.542-30.226 80.056-30.226 66.935 0 121.389 54.455 121.389 121.389 0 2.41-.449 8.642-.449 8.642a10.92 10.92 0 0 0 11.984 11.634 87.102 87.102 0 0 1 8.708-.44c47.297 0 85.778 38.48 85.778 85.778 0 47.297-38.48 85.777-85.778 85.777h-48.902c-6.029 0-10.919 4.888-10.919 10.919s4.89 10.919 10.919 10.919h48.902c59.339 0 107.616-48.275 107.616-107.615-.001-58.808-47.421-106.752-106.034-107.602z"
  }), React.createElement("path", {
    d: "M262.755 97.548c-45.658 0-84.742 34.121-90.914 79.367-.815 5.975 3.371 11.462 9.343 12.295 6.368.888 11.548-3.869 12.295-9.343 4.702-34.479 34.484-60.48 69.276-60.48 6.031 0 10.919-4.888 10.919-10.919 0-6.032-4.889-10.92-10.919-10.92zm50.524 312.735c-4.017-4.496-10.92-4.887-15.418-.868l-26.265 23.463V298.547c0-6.031-4.89-10.919-10.919-10.919-6.031 0-10.919 4.888-10.919 10.919v134.33l-26.264-23.463c-4.496-4.018-11.401-3.627-15.417.868-4.018 4.498-3.63 11.399.868 15.418l39.717 35.483a17.983 17.983 0 0 0 12.014 4.59 17.99 17.99 0 0 0 12.013-4.589l39.719-35.483c4.499-4.017 4.888-10.92.871-15.418z"
  }));
};

var Crop = function Crop(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 32 32"
  }, props), React.createElement("path", {
    d: "M29.5 8C30.879 8 32 6.879 32 5.5v-3C32 1.121 30.879 0 29.5 0h-3A2.502 2.502 0 0 0 24 2.5V3H8v-.5C8 1.121 6.879 0 5.5 0h-3A2.503 2.503 0 0 0 0 2.5v3C0 6.879 1.122 8 2.5 8H3v16h-.5A2.503 2.503 0 0 0 0 26.5v3C0 30.879 1.122 32 2.5 32h3C6.879 32 8 30.879 8 29.5V29h16v.5c0 1.379 1.121 2.5 2.5 2.5h3c1.379 0 2.5-1.121 2.5-2.5v-3c0-1.379-1.121-2.5-2.5-2.5H29V8h.5zm-27-2a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3zM6 29.5c0 .275-.225.5-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3c.275 0 .5.225.5.5v3zm18-3v.5H8v-.5C8 25.121 6.879 24 5.5 24H5V8h.5C6.879 8 8 6.879 8 5.5V5h16v.5C24 6.879 25.121 8 26.5 8h.5v16h-.5a2.502 2.502 0 0 0-2.5 2.5zm5.5-.5c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3a.501.501 0 0 1-.5-.5v-3c0-.275.225-.5.5-.5h3zm-3-20a.501.501 0 0 1-.5-.5v-3c0-.275.225-.5.5-.5h3c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3z"
  }));
};

var Garbage = function Garbage(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 486.4 486.4"
  }, props), React.createElement("path", {
    d: "M446 70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5 0-53.5 24-53.5 53.5V70H40.4c-7.5 0-13.5 6-13.5 13.5S32.9 97 40.4 97h24.4v317.2c0 39.8 32.4 72.2 72.2 72.2h212.4c39.8 0 72.2-32.4 72.2-72.2V97H446c7.5 0 13.5-6 13.5-13.5S453.5 70 446 70zM168.6 53.5c0-14.6 11.9-26.5 26.5-26.5h96.2c14.6 0 26.5 11.9 26.5 26.5V70H168.6V53.5zm226 360.7c0 24.9-20.3 45.2-45.2 45.2H137c-24.9 0-45.2-20.3-45.2-45.2V97h302.9v317.2h-.1z"
  }), React.createElement("path", {
    d: "M243.2 411c7.5 0 13.5-6 13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v238.5c0 7.5 6 13.6 13.5 13.6zm-88.1-14.9c7.5 0 13.5-6 13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6.1 13.5 13.5 13.5zm176.2 0c7.5 0 13.5-6 13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6 13.5 13.5 13.5z"
  }));
};

var InternetGlobe = function InternetGlobe(props) {
  return React.createElement("svg", _extends({
    height: 596,
    viewBox: "0 0 447.632 447"
  }, props), React.createElement("path", {
    d: "M231.816 447.05c34.23-4.863 64.239-40.59 83.121-93.35a406.317 406.317 0 0 0-83.12-9.786zm0 0M286.504 438.66c2.023-.586 4.039-1.176 6.039-1.824 1.687-.543 3.352-1.129 5.016-1.711a203.39 203.39 0 0 0 5.882-2.121c1.664-.633 3.313-1.305 4.965-1.977 1.906-.8 3.809-1.597 5.692-2.398a240.401 240.401 0 0 0 10.422-4.922c1.601-.816 3.199-1.648 4.8-2.504 1.793-.96 3.575-1.941 5.344-2.95a203.403 203.403 0 0 0 4.703-2.753c1.735-1.066 3.461-2.133 5.176-3.2a191.535 191.535 0 0 0 4.578-2.991 221.095 221.095 0 0 0 5.008-3.504 417.693 417.693 0 0 0 4.422-3.2 365.942 365.942 0 0 0 4.847-3.793c1.426-1.136 2.848-2.265 4.25-3.433 1.598-1.328 3.13-2.703 4.68-4.078 1.36-1.207 2.727-2.403 4.055-3.64 1.527-1.427 3.015-2.903 4.504-4.368 1.289-1.273 2.593-2.527 3.855-3.832.235-.242.457-.504.7-.754a268.883 268.883 0 0 0-54.817-21.094 198.517 198.517 0 0 1-51.129 83.024c.649-.168 1.297-.305 1.945-.473 1.711-.48 3.391-1.008 5.063-1.504zm0 0M447.633 231.684H351.71a414.882 414.882 0 0 1-16.152 110.68 278.228 278.228 0 0 1 60.714 24.16 223.51 223.51 0 0 0 51.36-134.84zm0 0M231.816 215.684h103.895a400.208 400.208 0 0 0-15.75-106.743 421.384 421.384 0 0 1-88.145 10.512zm0 0M231.816.316v103.137a406.589 406.589 0 0 0 83.121-9.785C296.055 40.906 266.048 5.18 231.817.316zm0 0M231.816 327.914a421.648 421.648 0 0 1 88.145 10.516 400.236 400.236 0 0 0 15.75-106.746H231.816zm0 0M396.273 80.844a278.228 278.228 0 0 1-60.714 24.16 414.882 414.882 0 0 1 16.152 110.68h95.922a223.577 223.577 0 0 0-51.36-134.84zm0 0M385.465 68.707c-.235-.238-.457-.496-.688-.742-1.265-1.305-2.578-2.563-3.867-3.832-1.484-1.465-2.965-2.945-4.496-4.367-1.324-1.235-2.695-2.403-4.055-3.633-1.55-1.375-3.101-2.762-4.695-4.09-1.383-1.168-2.8-2.285-4.207-3.406a171.24 171.24 0 0 0-4.89-3.825 220.477 220.477 0 0 0-4.383-3.199 192.844 192.844 0 0 0-5.055-3.547 200.251 200.251 0 0 0-4.535-2.957 190.441 190.441 0 0 0-5.219-3.257 223.26 223.26 0 0 0-4.664-2.727 220.848 220.848 0 0 0-5.39-2.984c-1.602-.801-3.2-1.672-4.801-2.473-1.84-.93-3.696-1.824-5.598-2.703a174.071 174.071 0 0 0-4.875-2.227c-1.895-.84-3.809-1.597-5.719-2.398a225.094 225.094 0 0 0-4.953-1.969 191.214 191.214 0 0 0-5.879-2.117 210.272 210.272 0 0 0-5.016-1.715c-2-.648-4-1.238-6.054-1.832-1.664-.488-3.336-.984-5.02-1.43-.644-.175-1.3-.312-1.949-.48a198.532 198.532 0 0 1 51.129 83.023 268.485 268.485 0 0 0 54.879-21.113zm0 0M0 215.684h95.922a415.035 415.035 0 0 1 16.148-110.68 277.885 277.885 0 0 1-60.71-24.16A223.519 223.519 0 0 0 0 215.684zm0 0M215.816 447.05V343.915a406.589 406.589 0 0 0-83.12 9.785c18.878 52.762 48.89 88.488 83.12 93.352zm0 0M215.816 231.684H111.922a400.079 400.079 0 0 0 15.75 106.746 421.097 421.097 0 0 1 88.144-10.516zm0 0M215.816.316c-34.23 4.864-64.242 40.59-83.12 93.352a406.045 406.045 0 0 0 83.12 9.785zm0 0M215.816 119.453a421.384 421.384 0 0 1-88.144-10.512 400.05 400.05 0 0 0-15.75 106.743h103.894zm0 0M168.113 6.79c-.648.167-1.297.304-1.945.472-1.695.453-3.367.957-5.055 1.445-2.008.586-4 1.176-6.015 1.816-1.7.551-3.371 1.137-5.043 1.72-1.957.69-3.918 1.378-5.856 2.112-1.672.641-3.32 1.305-4.976 1.985-1.903.8-3.809 1.601-5.688 2.398-1.648.723-3.277 1.48-4.91 2.242a223.908 223.908 0 0 0-5.512 2.68 228.526 228.526 0 0 0-10.137 5.457 149.244 149.244 0 0 0-4.718 2.75c-1.738 1.047-3.457 2.13-5.168 3.2-1.54.984-3.067 1.976-4.578 3a221.095 221.095 0 0 0-5.008 3.503 403.614 403.614 0 0 0-4.426 3.203c-1.637 1.23-3.2 2.512-4.848 3.79-1.421 1.136-2.855 2.265-4.246 3.44-1.601 1.321-3.12 2.688-4.664 4.056-1.367 1.218-2.746 2.402-4.082 3.664-1.52 1.418-3 2.89-4.484 4.351-1.29 1.274-2.602 2.531-3.867 3.84-.23.242-.453.508-.696.754a268.581 268.581 0 0 0 54.817 21.098 198.45 198.45 0 0 1 51.105-82.977zm0 0M66.719 383.234c1.488 1.465 2.969 2.946 4.496 4.371 1.328 1.23 2.695 2.399 4.058 3.63 1.551 1.378 3.102 2.761 4.696 4.09 1.383 1.16 2.793 2.28 4.207 3.405 1.601 1.297 3.199 2.586 4.894 3.833 1.442 1.082 2.907 2.128 4.371 3.203 1.672 1.199 3.36 2.398 5.063 3.55a214.813 214.813 0 0 0 4.535 2.961c1.73 1.11 3.457 2.2 5.219 3.254 1.543.93 3.101 1.84 4.664 2.73a208.275 208.275 0 0 0 5.39 2.981c1.598.801 3.2 1.672 4.801 2.473 1.84.93 3.696 1.824 5.598 2.707 1.601.754 3.226 1.496 4.875 2.223 1.894.84 3.805 1.597 5.719 2.398 1.648.672 3.289 1.336 4.953 1.969 1.941.746 3.91 1.441 5.879 2.12 1.664.583 3.328 1.169 5.015 1.712 2 .648 4 1.242 6.055 1.832 1.664.488 3.336.984 5.016 1.433.648.176 1.304.313 1.953.48a198.57 198.57 0 0 1-51.13-83.027 268.607 268.607 0 0 0-54.816 21.106c.235.238.458.496.692.742 1.2 1.297 2.492 2.555 3.797 3.824zm0 0M51.36 366.523a278.275 278.275 0 0 1 60.71-24.16 415.035 415.035 0 0 1-16.148-110.68H0a223.552 223.552 0 0 0 51.36 134.84zm0 0"
  }));
};

var Image = function Image(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), React.createElement("path", {
    d: "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
  }));
};

var Video = function Video(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), React.createElement("path", {
    d: "M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
  }));
};

var Constants = {
  video: {
    // see https://en.wikipedia.org/wiki/Video_file_format
    mimeTypes: ['video/x-flv', 'video/mp4', 'application/octet-stream', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'],
    extensions: ['3g2', '3gp', 'amv', 'asf', 'avi', 'drc', 'f4a', 'f4b', 'f4p', 'f4v', 'flv', 'gif', 'gifv', 'm2v', 'm4p', 'm4v', 'mkv', 'mov', 'mng', 'mp2', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'MTS', 'M2TS', 'mxf', 'nsv', 'ogg', 'qt', 'rm', 'rmvb', 'roq', 'svi', 'vob', 'webm', 'wmv', 'yuv']
  },
  image: {
    // see https://github.com/arthurvr/image-extensions/blob/master/image-extensions.json
    mimeTypes: ['image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/vnd.microsoft.icon', 'image/vnd.djvu', 'image/svg+xml'],
    extensions: ['3dv', 'PI1', 'PI2', 'PI3', 'ai', 'amf', 'art', 'art', 'ase', 'awg', 'blp', 'bmp', 'bw', 'bw', 'cd5', 'cdr', 'cgm', 'cit', 'cmx', 'cpt', 'cr2', 'cur', 'cut', 'dds', 'dib', 'djvu', 'dxf', 'e2d', 'ecw', 'egt', 'egt', 'emf', 'eps', 'exif', 'fs', 'gbr', 'gif', 'gpl', 'grf', 'hdp', 'icns', 'ico', 'iff', 'iff', 'int', 'int', 'inta', 'jfif', 'jng', 'jp2', 'jpeg', 'jpg', 'jps', 'jxr', 'lbm', 'lbm', 'liff', 'max', 'miff', 'mng', 'msp', 'nitf', 'nrrd', 'odg', 'ota', 'pam', 'pbm', 'pc1', 'pc2', 'pc3', 'pcf', 'pct', 'pcx', 'pcx', 'pdd', 'pdn', 'pgf', 'pgm', 'pict', 'png', 'pnm', 'pns', 'ppm', 'psb', 'psd', 'psp', 'px', 'pxm', 'pxr', 'qfx', 'ras', 'raw', 'rgb', 'rgb', 'rgba', 'rle', 'sct', 'sgi', 'sgi', 'sid', 'stl', 'sun', 'svg', 'sxd', 'tga', 'tga', 'tif', 'tiff', 'v2d', 'vnd', 'vrml', 'vtf', 'wdp', 'webp', 'wmf', 'x3d', 'xar', 'xbm', 'xcf', 'xpm']
  },
  compressedFile: {
    // see https://en.wikipedia.org/wiki/List_of_archive_formats
    mimeTypes: [// compression only
    'application/x-bzip2', 'application/gzip', 'application/x-lzip', 'application/x-lzma', 'application/x-lzop', 'application/x-snappy-framed', 'application/x-xz', 'application/x-compress', // archiving and compression
    'application/x-7z-compressed', 'application/x-ace-compressed', 'application/x-astrotite-afa', 'application/x-alz-compressed', 'application/vnd.android.package-archive', 'application/x-arj', 'application/x-b1', 'application/vnd.ms-cab-compressed', 'application/x-cfs-compressed', 'application/x-dar', 'application/x-dgc-compressed', 'application/x-apple-diskimage', 'application/x-gca-compressed', 'application/x-lzh', 'application/x-lzx', 'application/x-rar-compressed', 'application/x-stuffit', 'application/x-stuffitx', 'application/x-gtar', 'application/zip', 'application/x-zoo'],
    extensions: [// compression only
    'bz2', 'gz', 'F', 'lz', 'lzma', 'lzo', 'rz', 'sfark', 'sz', 'xz', 'z', 'Z', '?Q?', '?XF', '?Z?', '??_', // archiving and compression
    '7z', 'ace', 'afa', 'alz', 'apk', 'arc', 'arj', 'b1', 'b6z', 'ba', 'bh', 'cab', 'car', 'cfs', 'cpt', 'dar', 'dd', 'dgc', 'dmg', 'ear', 'gca', 'ha', 'hki', 'ice', 'jar', 'kgb', 'lha', 'lzh', 'lzx', 'pak', 'paq6', 'paq7', 'paq8', 'partimg', 'pea', 'pim', 'pit', 'qda', 'rar', 'rk', 's7z', 'sda', 'sea', 'sen', 'sfx', 'shk', 'sit', 'sitx', 'sqx', 'tar.bz2', 'tar.gz', 'tar.lzma', 'tar.xz', 'tar.Z', 'tbz2', 'tgz', 'tlz', 'txz', 'ue2', 'uc', 'uc0', 'uc2', 'uca', 'ucn', 'uha', 'ur2', 'war', 'wim', 'xar', 'xp3', 'yz1', 'zip', 'zipx', 'zoo', 'zpaq', 'zz']
  }
};

var FileManager = {};
var _ = {
  concat: concat,
  isString: isString,
  last: last,
  map: map,
  round: round,
  split: split,
  upperCase: upperCase
};

FileManager.initializeDrag = function () {
  // avoid browser drop management
  window.addEventListener('dragover', function (ev) {
    ev = ev || event;
    ev.preventDefault();
  }, false);
  window.addEventListener('drop', function (ev) {
    ev = ev || event;
    ev.preventDefault();
  }, false);
};
/**
 * From Base64 dataURL to MIME Type
 * Returns null when input is invalid
 */


FileManager.base64MimeType = function (encoded) {
  var result = null;
  if (typeof encoded !== 'string') return result;
  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) result = mime[1];
  return result;
};

FileManager.isBase64 = function (input) {
  return FileManager.base64MimeType(input) !== null;
};
/**
 * From string|File to extension
 * Ex: https://upload.wikimedia.org/wikipedia/commons/d/da/Nelson_Mandela%2C_2000_%285%29_%28cropped%29.jpg => jpg
 */


FileManager.extension = function (input) {
  input = _.isString(input) ? input : input.name;
  return _.last(_.split(input, '.'));
};
/**
 * Input may be a MIME Type or an extension
 * Ex: video/mp4 => video, or application/zip => compressedFile
 */


FileManager.fileType = function (input) {
  var isExtension = !input.match(/\//);

  if (isExtension) {
    var extensions = {
      video: Constants.video.extensions,
      image: Constants.image.extensions,
      compressedFile: Constants.compressedFile.extensions
    };

    for (var k in extensions) {
      var v = _.concat(extensions[k], _.map(extensions[k], function (ext) {
        return _.upperCase(ext);
      })); // case insensitive


      if (v.indexOf(input) !== -1) return k;
    }
  } else {
    var mimeTypes = {
      video: Constants.video.mimeTypes,
      image: Constants.image.mimeTypes,
      compressedFile: Constants.compressedFile.mimeTypes
    };

    for (var _k in mimeTypes) {
      var _v = mimeTypes[_k];
      if (_v.indexOf(input) !== -1) return _k;
    }
  }

  return null;
};
/**
 * Input may be url string, base64, File.
 */


FileManager.guessFileType = function (input) {
  return FileManager.fileType(FileManager.base64MimeType(input) || FileManager.extension(input));
};
/**
 * From '100000000' to '100 MB'
 */


FileManager.humanSize = function (size) {
  var round = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var units = ['B', 'KB', 'MB', 'GB', 'TB'];

  for (var power = units.length - 1; power >= 0; power--) {
    var tmpRes = size * 1.0 / Math.pow(1000, power);

    if (tmpRes >= 1) {
      if (round) tmpRes = _.round(tmpRes);
      return "".concat(tmpRes, " ").concat(units[power]);
    }
  }
};

var validator = {
  isURL: isURL
};
var _$1 = {
  camelCase: camelCase,
  difference: difference,
  get: get,
  last: last,
  upperFirst: upperFirst,
  split: split,
  debounce: debounce
};

var Uploader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Uploader, _React$Component);

  function Uploader(props) {
    var _this;

    _classCallCheck(this, Uploader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Uploader).call(this, props));
    _this.state = {
      beingDropTarget: false,
      height: null,
      file: null,
      loaded: true,
      mounted: false,
      url: '',
      width: null,
      counter: 0
    };
    _this.change = _this.change.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleCropClick = _this.handleCropClick.bind(_assertThisInitialized(_this));
    _this.handleDragLeave = _this.handleDragLeave.bind(_assertThisInitialized(_this));
    _this.handleDragOver = _this.handleDragOver.bind(_assertThisInitialized(_this));
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_this));
    _this.handleInjectURLClick = _this.handleInjectURLClick.bind(_assertThisInitialized(_this));
    _this.handleLoad = _this.handleLoad.bind(_assertThisInitialized(_this));
    _this.handleRemoveClick = _this.handleRemoveClick.bind(_assertThisInitialized(_this));
    _this.handleURLChange = _this.handleURLChange.bind(_assertThisInitialized(_this));
    _this.get = _this.get.bind(_assertThisInitialized(_this));
    _this.injectURL = _this.injectURL.bind(_assertThisInitialized(_this));
    _this.change = _this.change.bind(_assertThisInitialized(_this));
    _this._forceUpdate = _this._forceUpdate.bind(_assertThisInitialized(_this));
    _this.forceUpdateOnResize = _$1.debounce(_this._forceUpdate, 500);
    return _this;
  }

  _createClass(Uploader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
      FileManager.initializeDrag();
      window.addEventListener("resize", this.forceUpdateOnResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.forceUpdateOnResize);
    } // Hack: Force re-render by incrementing a counter to re-calculate the preview resizing infos after a window resize

  }, {
    key: "_forceUpdate",
    value: function _forceUpdate() {
      var src = this.state.src;
      if (src) this.setState({
        counter: this.state.counter++
      });
    }
  }, {
    key: "change",
    value: function change(file) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (data) {
        return null;
      };
      var maxSize = this.props.maxSize;
      if (FileManager.guessFileType(file) !== this.props.fileType) this.props.onInvalidFileExtensionError();else if (maxSize && file.size >= maxSize) this.props.onFileTooLargeError();else this.props.onChange(file);
      callback(file);
      this.refs.input.value = null; // clear input (same image set in twice would otherwise be ignored, for example)
    }
  }, {
    key: "handleChange",
    value: function handleChange(ev) {
      var file = _$1.get(ev, 'target.files.0');

      if (file) this.change(file);
    }
  }, {
    key: "handleClick",
    value: function handleClick(ev) {
      this.refs.input.click();
    }
  }, {
    key: "handleCropClick",
    value: function handleCropClick(ev) {
      ev.stopPropagation();
      this.props.onCropClick();
    }
  }, {
    key: "handleDragLeave",
    value: function handleDragLeave() {
      this.setState({
        beingDropTarget: false
      });
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver() {
      this.setState({
        beingDropTarget: true
      });
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(ev) {
      ev.preventDefault();
      this.setState({
        beingDropTarget: false
      });

      var file = _$1.get(ev, 'dataTransfer.files.0');

      if (file) this.change(file);
    }
  }, {
    key: "handleInjectURLClick",
    value: function handleInjectURLClick() {
      this.injectURL(this.state.url, true);
    }
  }, {
    key: "handleLoad",
    value: function handleLoad() {
      if (typeof this.firstLoadDone === 'undefined') {
        this.firstLoadDone = true;
        this.props.onFirstLoad();
        this.setState({
          loaded: true
        });
      }

      this.props.onLoad();
    }
  }, {
    key: "handleRemoveClick",
    value: function handleRemoveClick(ev) {
      ev.stopPropagation();
      this.props.onRemoveClick();
    }
  }, {
    key: "handleURLChange",
    value: function handleURLChange(ev) {
      var value = ev.target.value;
      this.setState({
        url: value
      });
    }
  }, {
    key: "get",
    value: function get(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url, true);

        xhr.onload = function () {
          if (xhr.status === 200) resolve(xhr.response);else reject(Error(xhr.statusText));
        };

        xhr.onerror = function () {
          return reject(Error('Network Error'));
        };

        xhr.send();
      });
    }
  }, {
    key: "injectURL",
    value: function injectURL(url) {
      var _this2 = this;

      var validate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (data) {
        return null;
      };

      if (validate && !validator.isURL(url)) {
        this.props.onInvalidURLError();
        return;
      }

      this.get(url).then(function (response) {
        var name = _$1.last(_$1.split(url, '/')),
            file = new File([response], name, {
          type: response.type
        });

        _this2.change(file, callback);
      })["catch"](function (error) {
        _this2.props.onURLInjectionError();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var media = null,
          icon = null,
          withControls = this.props.src && (this.props.removable || this.props.croppable);

      if (this.props.src) {
        var fileType = this.props.fileType || FileManager.guessFileType(this.props.src);

        switch (fileType) {
          case 'image':
            if (this.state.loaded && this.state.mounted && this.props.imageCrop && this.refs.zone && this.refs.img) {
              var zoneWidth = this.refs.zone.offsetWidth,
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
                  scale = null; // image fit to zone

              if (this.props.backgroundSize === 'contain') {
                if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneWidth / displayCropWidth;else scale = zoneHeight / displayCropHeight;
              } else {
                if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneHeight / displayCropHeight;else scale = zoneWidth / displayCropWidth;
              }

              media = React.createElement("img", {
                alt: "",
                ref: "img",
                src: this.props.src,
                onLoad: this.handleLoad,
                style: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transformOrigin: "".concat(displayCropX + displayCropWidth / 2, "px ").concat(displayCropY + displayCropHeight / 2, "px"),
                  transform: "\n                                        translateX(-".concat(displayCropX + displayCropWidth / 2, "px)\n                                        translateY(-").concat(displayCropY + displayCropHeight / 2, "px)\n                                        scale(").concat(scale, ")\n                                    "),
                  clip: "rect(\n                                        ".concat(displayCropY, "px\n                                        ").concat(displayCropX + displayCropWidth, "px\n                                        ").concat(displayCropY + displayCropHeight, "px\n                                        ").concat(displayCropX, "px)\n                                    ")
                }
              });
            } else {
              media = React.createElement("div", {
                style: {
                  backgroundColor: this.props.backgroundColor,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: this.props.backgroundSize,
                  backgroundImage: "url(".concat(this.props.src, ")"),
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }
              }, React.createElement("img", {
                alt: "",
                ref: "img",
                src: this.props.src,
                onLoad: this.handleLoad,
                style: {
                  position: 'fixed',
                  top: '-9999px',
                  left: '-9999px'
                }
              }));
            }

            break;

          case 'video':
            media = React.createElement("video", {
              autoPlay: true,
              loop: true,
              muted: true,
              src: this.props.src,
              onLoadedData: this.handleLoad,
              style: this.props.backgroundSize === 'cover' ? {
                height: '100%' // considering the majority of videos at landscape format

              } : {
                maxHeight: '100%',
                maxWidth: '100%'
              }
            });
            break;
        }
      }

      switch (this.props.fileType) {
        case 'image':
          icon = React.createElement(Image, {
            className: "uploader-zone-fog-img"
          });
          break;

        case 'video':
          icon = React.createElement(Video, {
            className: "uploader-zone-fog-img"
          });
          break;
      }

      return React.createElement("div", _extends({
        "data-attr": "root"
      }, _$1.get(this.props.customAttributes, 'root', {}), {
        className: "\n                    uploader\n                    ".concat(_$1.get(this.props.customAttributes, 'root.className', ''), "\n                    ").concat(this.props.fetching ? 'uploader/fetching' : '', "\n                    ").concat(this.props.withURLInput ? 'uploader/withUrl' : '', "\n                    ").concat(withControls ? 'uploader/withControls' : '', "\n                ")
      }), React.createElement("input", {
        "data-attr": "input",
        ref: "input",
        type: "file",
        className: "uploader-input",
        onChange: this.handleChange
      }), React.createElement("div", {
        ref: "zone",
        className: "\n                        uploader-zone\n                        ".concat(this.props.withURLInput ? 'uploader-zone/withUrl' : '', "\n                    "),
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop
      }, media, React.createElement("div", {
        className: "uploader-zone-fog",
        onClick: this.handleClick
      }, !this.props.compact || !this.props.removable && !this.props.croppable || !this.props.src ? React.createElement(React.Fragment, null, this.state.beingDropTarget ? React.createElement(CloudComputing, {
        className: "uploader-zone-fog-img"
      }) : icon, React.createElement("div", {
        className: "uploader-zone-fog-caption"
      }, this.props.fetching ? this.props.catalogue.loading : "".concat(this.props.catalogue.click).concat(this.props.catalogue.drop ? "/".concat(this.props.catalogue.drop) : '').concat(this.props.withURLInput ? "/".concat(this.props.catalogue.typeURL) : ''))) : null, withControls === true && React.createElement(React.Fragment, null, !this.props.compact ? React.createElement("div", {
        className: "uploader-zone-fog-or"
      }, React.createElement("div", {
        className: "uploader-zone-fog-or-wing"
      }), React.createElement("div", {
        className: "uploader-zone-fog-or-body"
      }, this.props.catalogue.or), React.createElement("div", {
        className: "uploader-zone-fog-or-wing"
      })) : null, React.createElement("div", {
        className: "uploader-zone-fog-controls"
      }, this.props.croppable === true && React.createElement("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleCropClick
      }, this.props.cropIcon || React.createElement(Crop, null)), this.props.removable === true && React.createElement("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleRemoveClick
      }, this.props.removeIcon || React.createElement(Garbage, null)))))), this.props.withURLInput === true && React.createElement("div", {
        className: "uploader-url"
      }, React.createElement("input", {
        className: "uploader-url-input",
        name: "url",
        value: this.state.url,
        placeholder: this.props.catalogue.urlInputPlaceholder,
        type: "text",
        onChange: this.handleURLChange,
        onKeyPress: function onKeyPress(ev) {
          if (ev.which === 13) {
            // enter would otherwise submit form
            ev.preventDefault();

            _this3.handleInjectURLClick();
          }
        }
      }), React.createElement("span", {
        className: "uploader-url-addon",
        onClick: this.handleInjectURLClick
      }, React.createElement(InternetGlobe, {
        className: "uploader-url-addon-icon"
      }), this.props.catalogue.urlSubmitText)));
    }
  }]);

  return Uploader;
}(React.Component);
Uploader.propTypes = {
  // optional
  backgroundColor: PropTypes.string,
  backgroundSize: PropTypes.oneOf(['contain', 'cover']),
  catalogue: function catalogue(props, propName, componentName) {
    var givenCatalogue = props[propName],
        givenPropsKeys = Object.keys(props[propName]),
        expectedPropsKeys = Object.keys(Uploader.defaultProps[propName]);
    if (!givenCatalogue || _typeof(givenCatalogue) !== 'object') throw new Error('Catalogue must be an object.');

    var diffKeys = _$1.difference(expectedPropsKeys, givenPropsKeys);

    if (diffKeys.length) throw new Error('Given catalogue is insufficient. Missing keys: ' + JSON.stringify(diffKeys));
  },
  compact: PropTypes.bool,
  croppable: PropTypes.bool,
  customAttributes: PropTypes.object,
  fetching: PropTypes.bool,
  fileType: PropTypes.oneOf(['image', 'video']),
  // expected file type
  imageCrop: PropTypes.object,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  onCropClick: PropTypes.func,
  onFileTooLargeError: PropTypes.func,
  onFirstLoad: PropTypes.func,
  onInvalidFileExtensionError: PropTypes.func,
  onInvalidURLError: PropTypes.func,
  onLoad: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onURLInjectionError: PropTypes.func,
  removable: PropTypes.bool,
  src: PropTypes.string,
  withURLInput: PropTypes.bool
};
Uploader.defaultProps = {
  backgroundColor: 'transparent',
  backgroundSize: 'cover',
  catalogue: {
    click: null,
    drop: null,
    typeURL: null,
    loading: null,
    or: null,
    urlInputPlaceholder: null,
    urlSubmitText: null
  },
  compact: true,
  croppable: false,
  cropIcon: null,
  // if let null, it will be default one
  customAttributes: {},
  fetching: false,
  fileType: 'image',
  imageCrop: null,
  maxSize: 10 * 1000 * 1000,
  onChange: function onChange(file) {
    return null;
  },
  onCropClick: function onCropClick() {
    return null;
  },
  onFileTooLargeError: function onFileTooLargeError() {
    return null;
  },
  onFirstLoad: function onFirstLoad() {
    return null;
  },
  onInvalidFileExtensionError: function onInvalidFileExtensionError() {
    return null;
  },
  onInvalidURLError: function onInvalidURLError() {
    return null;
  },
  onLoad: function onLoad() {
    return null;
  },
  onRemoveClick: function onRemoveClick() {
    return null;
  },
  onURLInjectionError: function onURLInjectionError() {
    return null;
  },
  removable: false,
  removeIcon: null,
  // if let null, it will be default one
  src: null,
  withURLInput: false
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "@keyframes pulse {\r\n    from {\r\n        transform: scale(0.7);\r\n    }\r\n    50% {\r\n        transform: scale(1);\r\n    }\r\n    to {\r\n        transform: scale(0.7);\r\n    }\r\n}\r\n.uploader {\r\n    position: relative;\r\n}\r\n.uploader\\/fetching .uploader-zone-fog-img {\r\n    animation: pulse 2s linear infinite;\r\n}\r\n.uploader\\/withUrl .uploader-zone {\r\n    border-top-left-radius: 0.25rem !important;\r\n    border-top-right-radius: 0.25rem !important;\r\n    border-bottom-left-radius: 0 !important;\r\n    border-bottom-right-radius: 0 !important;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-caption {\r\n    margin-top: 0;\r\n    bottom: 0;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-img {\r\n    width: 2.6rem;\r\n    top: 0.3rem;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-controls {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-flow: row wrap;\r\n    position: relative;\r\n    bottom: 0.3rem;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-or {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-flow: row;\r\n    font-size: 80%;\r\n    width: 100%;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-or-wing {\r\n    flex-grow: 1;\r\n    height: 0;\r\n    border-style: solid;\r\n    border-width: .06rem 0 0 0;\r\n    border-color: white;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-or-body {\r\n    padding: 0.5rem 0.7rem;\r\n    user-select: none;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-controls > * {\r\n    margin: 0 0.3rem;\r\n}\r\n.uploader\\/withControls .uploader-zone-fog-controls-control {\r\n    height: 1.6rem;\r\n    width: 1.6rem;\r\n    fill: white;\r\n}\r\n.uploader img {\r\n    max-height: 100%;\r\n    max-width: 100%;\r\n    height: auto;\r\n    width: auto;\r\n}\r\n.uploader-url-addon {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: .375rem .75rem;\r\n    margin-bottom: 0;\r\n    font-weight: 400;\r\n    line-height: 1.5;\r\n    color: #495057;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    background-color: #e9ecef;\r\n    border: 1px solid #ced4da;\r\n    border-left-width: 0;\r\n    border-top-right-radius: 0;\r\n    border-top-left-radius: 0;\r\n    border-bottom-left-radius: 0;\r\n    border-bottom-right-radius: .25rem;\r\n}\r\n.uploader-url-addon svg {\r\n    margin-right: 0.6rem;\r\n    fill: #495057;\r\n    height: 1.4rem;\r\n}\r\n.uploader-url-input {\r\n    display: block;\r\n    height: calc(1.5em + .75rem + 2px);\r\n    padding: .375rem .75rem;\r\n    font-weight: 400;\r\n    font-size: 1rem;\r\n    line-height: 1.5;\r\n    color: #495057;\r\n    background-color: #fff;\r\n    background-clip: padding-box;\r\n    border: 1px solid #ced4da;\r\n    border-radius: .25rem;\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n    border-bottom-right-radius: 0;\r\n    position: relative;\r\n    flex-grow: 1;\r\n    margin-bottom: 0;\r\n}\r\n.uploader-url-input:focus {\r\n    outline: none;\r\n}\r\n.uploader-url {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: stretch;\r\n    flex-flow: row;\r\n    cursor: pointer;\r\n}\r\n.uploader-zone {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-flow: row wrap;\r\n    width: 100%;\r\n    height: 14rem;\r\n    overflow: hidden;\r\n    position: relative;\r\n    border-radius: 500rem;\r\n    color: white;\r\n}\r\n.uploader-zone-fog {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    align-items: center;\r\n    flex-flow: column;\r\n    background: rgba(0, 0, 0, 0.2);\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n.uploader-zone-fog:hover {\r\n    background: rgba(0, 0, 0, 0.5);\r\n}\r\n.uploader-zone-fog-caption {\r\n    width: 80%;\r\n    text-align: center;\r\n    position: relative;\r\n    bottom: 1rem;\r\n    margin-top: 1rem;\r\n    text-shadow: 0 0 0.5rem black;\r\n}\r\n.uploader-zone-fog-img {\r\n    width: 5rem;\r\n    fill: white;\r\n    position: relative;\r\n    top: 1rem;\r\n}\r\n.uploader-input {\r\n    position: fixed;\r\n    top: -9999px;\r\n    left: -9999px;\r\n}";
styleInject(css);

export default Uploader;
