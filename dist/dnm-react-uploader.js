(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global = global || self, global.Uploader = factory(global.React, global.PropTypes));
}(this, function (React, PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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

  var validator = {
    isURL: require('validator/lib/isURL')
  };

  var Svg = require('./svg/index.js');

  var FileManager = require('./file-manager.js')["default"];

  var _ = {
    camelCase: require('lodash/camelCase'),
    difference: require('lodash/difference'),
    get: require('lodash/get'),
    last: require('lodash/last'),
    upperFirst: require('lodash/upperFirst'),
    split: require('lodash/split')
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
        width: null
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
      return _this;
    }

    _createClass(Uploader, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setState({
          mounted: true
        });
        FileManager.initializeDrag();
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
        var file = _.get(ev, 'target.files.0');

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

        var file = _.get(ev, 'dataTransfer.files.0');

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
          var name = _.last(_.split(url, '/')),
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
              if (this.state.loaded && this.state.mounted && this.props.imageCrop) {
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
            icon = React.createElement(Svg.PhotoCamera, {
              className: "uploader-zone-fog-img"
            });
            break;

          case 'video':
            icon = React.createElement(Svg.VideoCamera, {
              className: "uploader-zone-fog-img"
            });
            break;
        }

        return React.createElement("div", _extends({
          "data-attr": "root"
        }, _.get(this.props.customAttributes, 'root', {}), {
          className: "\n                    uploader\n                    ".concat(_.get(this.props.customAttributes, 'root.className', ''), "\n                    ").concat(this.props.fetching ? 'uploader/fetching' : '', "\n                    ").concat(this.props.withURLInput ? 'uploader/withUrl' : '', "\n                    ").concat(withControls ? 'uploader/withControls' : '', "\n                ")
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
        }, this.state.beingDropTarget ? React.createElement(Svg.CloudComputing, {
          className: "uploader-zone-fog-img"
        }) : icon, React.createElement("div", {
          className: "uploader-zone-fog-caption"
        }, this.props.fetching ? this.props.catalogue.loading : this.props.catalogue.callToAction), withControls === true && React.createElement(React.Fragment, null, React.createElement("span", {
          className: "uploader-zone-fog-or"
        }, "\u2013\u2013\u2013\u2013\u2013 ", this.props.catalogue.or, " \u2013\u2013\u2013\u2013\u2013"), React.createElement("div", {
          className: "uploader-zone-fog-controls"
        }, this.props.croppable === true && React.createElement("span", {
          className: "uploader-zone-fog-controls-control",
          onClick: this.handleCropClick
        }, this.props.cropIcon || React.createElement(Svg.Crop, null)), this.props.removable === true && React.createElement("span", {
          className: "uploader-zone-fog-controls-control",
          onClick: this.handleRemoveClick
        }, this.props.removeIcon || React.createElement(Svg.Garbage, null)))))), this.props.withURLInput === true && React.createElement("div", {
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
        }, React.createElement(Svg.InternetGlobe, {
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

      var diffKeys = _.difference(expectedPropsKeys, givenPropsKeys);

      if (diffKeys.length) throw new Error('Given catalogue is insufficient. Missing keys: ' + JSON.stringify(diffKeys));
    },
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
      callToAction: null,
      loading: null,
      or: null,
      urlInputPlaceholder: null,
      urlSubmitText: null
    },
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

  var css = "@keyframes app_uploader_fog_camera_pulse {\n    from {\n        transform: scale(0.7);\n    }\n    50% {\n        transform: scale(1);\n    }\n    to {\n        transform: scale(0.7);\n    }\n}\n.uploader {\n    position: relative;\n}\n.uploader\\/fetching .uploader-zone-fog-img {\n    animation: app_uploader_fog_camera_pulse 2s linear infinite;\n}\n.uploader\\/withUrl .uploader-zone {\n    border-top-left-radius: 0.25rem !important;\n    border-top-right-radius: 0.25rem !important;\n    border-bottom-left-radius: 0 !important;\n    border-bottom-right-radius: 0 !important;\n}\n.uploader\\/withControls .uploader-zone-fog-caption {\n    margin-top: 0;\n    bottom: 0;\n}\n.uploader\\/withControls .uploader-zone-fog-img {\n    width: 2.6rem;\n    top: 0.3rem;\n}\n.uploader\\/withControls .uploader-zone-fog-controls {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-flow: row wrap;\n    position: relative;\n    bottom: 0.3rem;\n}\n.uploader\\/withControls .uploader-zone-fog-or {\n    font-size: 80%;\n}\n.uploader\\/withControls .uploader-zone-fog-controls > * {\n    margin: 0 0.3rem;\n}\n.uploader\\/withControls .uploader-zone-fog-controls-control {\n    height: 1.6rem;\n    width: 1.6rem;\n    fill: white;\n}\n.uploader img {\n    max-height: 100%;\n    max-width: 100%;\n    height: auto;\n    width: auto;\n}\n.uploader-url-addon {\n    display: flex;\n    align-items: center;\n    padding: .375rem .75rem;\n    margin-bottom: 0;\n    font-weight: 400;\n    line-height: 1.5;\n    color: #495057;\n    text-align: center;\n    white-space: nowrap;\n    background-color: #e9ecef;\n    border: 1px solid #ced4da;\n    border-left-width: 0;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: .25rem;\n}\n.uploader-url-addon svg {\n    margin-right: 0.6rem;\n    fill: #495057;\n    height: 1.4rem;\n}\n.uploader-url-input {\n    display: block;\n    height: calc(1.5em + .75rem + 2px);\n    padding: .375rem .75rem;\n    font-weight: 400;\n    font-size: 1rem;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    border-radius: .25rem;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    position: relative;\n    flex-grow: 1;\n    margin-bottom: 0;\n}\n.uploader-url-input:focus {\n    outline: none;\n}\n.uploader-url {\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: stretch;\n    flex-flow: row;\n    cursor: pointer;\n}\n.uploader-zone {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-flow: row wrap;\n    width: 100%;\n    height: 14rem;\n    overflow: hidden;\n    position: relative;\n    border-radius: 500rem;\n    color: white;\n}\n.uploader-zone-fog {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-flow: column;\n    background: rgba(0, 0, 0, 0.2);\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n}\n.uploader-zone-fog:hover {\n    background: rgba(0, 0, 0, 0.5);\n}\n.uploader-zone-fog-caption {\n    width: 80%;\n    text-align: center;\n    position: relative;\n    bottom: 1rem;\n    margin-top: 1rem;\n    text-shadow: 0 0 0.5rem black;\n}\n.uploader-zone-fog-img {\n    width: 5rem;\n    fill: white;\n    position: relative;\n    top: 1rem;\n}\n.uploader-input {\n    position: fixed;\n    top: -9999px;\n    left: -9999px;\n}";
  styleInject(css);

  return Uploader;

}));
