import React, { createContext, forwardRef, createElement, Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import isURL from 'validator/lib/isURL';
import camelCase from 'lodash-es/camelCase';
import concat from 'lodash-es/concat';
import debounce from 'lodash-es/debounce';
import difference from 'lodash-es/difference';
import get from 'lodash-es/get';
import isString from 'lodash-es/isString';
import last from 'lodash-es/last';
import map from 'lodash-es/map';
import round from 'lodash-es/round';
import split from 'lodash-es/split';
import upperFirst from 'lodash-es/upperFirst';
import imageCompression from 'browser-image-compression';
import WavesurferPlayer from '@wavesurfer/react';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayLikeToArray);

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayWithoutHoles);

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(iterableToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(unsupportedIterableToArray);

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(nonIterableSpread);

var toConsumableArray = createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}

module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _extends = unwrapExports(_extends_1);

var taggedTemplateLiteral = createCommonjsModule(function (module) {
function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

module.exports = _taggedTemplateLiteral, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _taggedTemplateLiteral = unwrapExports(taggedTemplateLiteral);

var asyncToGenerator = createCommonjsModule(function (module) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _asyncToGenerator = unwrapExports(asyncToGenerator);

var classCallCheck = createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _createClass = unwrapExports(createClass);

var assertThisInitialized = createCommonjsModule(function (module) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _assertThisInitialized = unwrapExports(assertThisInitialized);

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(setPrototypeOf);

var inherits = createCommonjsModule(function (module) {
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
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _inherits = unwrapExports(inherits);

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];



function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _getPrototypeOf = unwrapExports(getPrototypeOf);

var defineProperty = createCommonjsModule(function (module) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _defineProperty = unwrapExports(defineProperty);

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var regenerator = runtime_1;

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (process.env.NODE_ENV !== 'production' && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$2 = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /*#__PURE__*/createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? createCache() : null);
var ThemeContext = /*#__PURE__*/createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return /*#__PURE__*/forwardRef(render);
};

if (!isBrowser$2) {
  var BasicProvider = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(BasicProvider, _React$Component);

    function BasicProvider(props, context, updater) {
      var _this;

      _this = _React$Component.call(this, props, context, updater) || this;
      _this.state = {
        value: createCache()
      };
      return _this;
    }

    var _proto = BasicProvider.prototype;

    _proto.render = function render() {
      return /*#__PURE__*/createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    };

    return BasicProvider;
  }(Component);

  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (context) {
        if (context === null) {
          return /*#__PURE__*/createElement(BasicProvider, null, function (newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // TODO: check if this still works with all of those different JSX functions

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};

var Noop = function Noop() {
  return null;
};

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles);

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/createElement(type, newProps);
  var possiblyStyleElement = /*#__PURE__*/createElement(Noop, null);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    possiblyStyleElement = /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // Need to return the same number of siblings or else `React.useId` will cause hydration mismatches.


  return /*#__PURE__*/createElement(Fragment, null, possiblyStyleElement, ele);
}; // eslint-disable-next-line no-undef


var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  if (typeof props.css === 'function') {
    return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return createElement.apply(null, createElementArgArray);
};

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Noop$1 = function Noop() {
  return null;
};

var ClassNames = withEmotionCache(function (props, context) {
  return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      if (isBrowser$2) {
        insertStyles(context, serialized, false);
      } else {
        var res = insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!isBrowser$2) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;
    var possiblyStyleElement = /*#__PURE__*/createElement(Noop$1, null);

    if (!isBrowser$2 && rules.length !== 0) {
      var _ref;

      possiblyStyleElement = /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref));
    } // Need to return the same number of siblings or else `React.useId` will cause hydration mismatches.


    return /*#__PURE__*/createElement(Fragment, null, possiblyStyleElement, ele);
  });
});

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var pulse = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        transform: scale(0.7);\n    }\n    50% {\n        transform: scale(1);\n    }\n    to {\n        transform: scale(0.7);\n    }\n"])));
var styles = {
  uploader: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        position: relative;\n        \n        img {\n            max-height: 100%;\n            max-width: 100%;\n            height: auto;\n            width: auto;\n        }\n        \n        .uploader-url-addon {\n            display: flex;\n            align-items: center;\n            padding: .375rem .75rem;\n            margin-bottom: 0;\n            font-weight: 400;\n            line-height: 1.5;\n            color: #495057;\n            text-align: center;\n            white-space: nowrap;\n            background-color: #e9ecef;\n            border: 1px solid #ced4da;\n            border-left-width: 0;\n            border-top-right-radius: 0;\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n            border-bottom-right-radius: .25rem;\n            \n            svg {\n                margin-right: 0.6rem;\n                fill: #495057;\n                height: 1.4rem;\n            }\n        }\n        \n        .uploader-url-input {\n            display: block;\n            height: calc(1.5em + .75rem + 2px);\n            padding: .375rem .75rem;\n            font-weight: 400;\n            font-size: 1rem;\n            line-height: 1.5;\n            color: #495057;\n            background-color: #fff;\n            background-clip: padding-box;\n            border: 1px solid #ced4da;\n            border-radius: .25rem;\n            border-top-left-radius: 0;\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n            position: relative;\n            flex-grow: 1;\n            margin-bottom: 0;\n            \n            &:focus {\n                outline: none;\n            }\n        }\n        \n        .uploader-url {\n            width: 100%;\n            display: flex;\n            justify-content: center;\n            align-items: stretch;\n            flex-flow: row;\n            cursor: pointer;\n        }\n        \n        .uploader-zone {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-flow: row wrap;\n            width: 100%;\n            height: 14rem;\n            overflow: hidden;\n            position: relative;\n            color: white;\n        }\n    \n        .uploader-zone-fog {\n            display: flex;\n            justify-content: space-evenly;\n            align-items: center;\n            flex-flow: column;\n            background: rgba(0, 0, 0, 0.2);\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            cursor: pointer;\n            z-index: 0;\n\n            &:hover {\n                background: rgba(0, 0, 0, 0.5);\n            }\n        }\n        \n        .uploader-zone-fog-core {\n            display: flex;\n            justify-content: space-evenly;\n            align-items: center;\n            flex-flow: column;\n            width: 100%;\n            height: 100%;\n        }\n        \n        .uploader-zone-fog-text {\n            width: 80%;\n            text-align: center;\n            position: relative;\n            bottom: 1rem;\n            margin-top: 1rem;\n            text-shadow: 0 0 0.5rem black;\n        }\n        \n        .uploader-zone-fog-img {\n            width: 5rem;\n            fill: white;\n        }\n        \n        .uploader-zone-fog-caption {\n            background: rgba(0, 0, 0, 0.3);\n            padding: 0.2rem 0.4rem;\n            font-size: 75%;\n            color: white;\n            border-radius: 0.3rem 0.3rem 0px 0px;\n            position: absolute;\n            bottom: 0px;\n            left: 50%;\n            transform: translateX(-50%);\n        }\n        \n        .uploader-input {\n            position: fixed;\n            top: -9999px;\n            left: -9999px;\n        }\n\n        .uploader-waveform {\n            width: 100%;\n            padding: 0;\n            margin: 0;\n            z-index: 0;\n            canvas {\n                max-width: none;\n                width: 100% !important;\n            }\n        }\n\n        .uploader-string {\n            color: white;\n            z-index: 1;\n            user-select: none;\n        }\n\n        .wavesurfer-region {\n            z-index: 3 !important;\n          }\n          \n        .wavesurfer-handle {\n            background-color: rgba(146, 210, 117, 0.9) !important;\n            width: 4px !important;\n        }\n    "]))),
  'uploader/fetching': css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        .uploader-zone-fog-core {\n            position: fixed;\n            top: -9999px;\n            left: -9999px;\n        }\n    "]))),
  'uploader/withUrl': css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        .uploader-zone {\n            border-top-left-radius: 0.25rem !important;\n            border-top-right-radius: 0.25rem !important;\n            border-bottom-left-radius: 0 !important;\n            border-bottom-right-radius: 0 !important;\n        }\n    "]))),
  'uploader/withControls': css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        .uploader-zone-fog-text {\n            margin-top: 0;\n            bottom: 0;\n        }\n        .uploader-zone-fog-img {\n            width: 2.6rem;\n            top: 0.3rem;\n        }\n        .uploader-zone-fog-controls {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-flow: row wrap;\n            position: relative;\n            bottom: 0.3rem;\n            gap: 1rem;\n        }\n        .uploader-zone-fog-or {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-flow: row;\n            font-size: 80%;\n            width: 100%;\n        }\n        .uploader-zone-fog-or-wing {\n            flex-grow: 1;\n            height: 0;\n            border-style: solid;\n            border-width: .06rem 0 0 0;\n            border-color: white;\n        }\n        .uploader-zone-fog-or-body {\n            padding: 0.5rem 0.7rem;\n            user-select: none;\n        }\n        .uploader-zone-fog-controls-control {\n            height: 2rem;\n            width: 2rem;\n            fill: white;\n        }\n    "]))),
  'uploader/compact': css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        .uploader-zone {\n            border-radius: .5rem;\n            height: 4rem;\n        }\n        .uploader-zone-fog-img {\n            width: 2rem;\n            top: 0;\n        }\n        .uploader-zone-fog-controls-control {\n            width: 1.5rem !important;\n            height: 1.5rem !important;\n        }\n    "]))),
  'uploader/disabled': css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n        .uploader-zone {\n            cursor: not-allowed;\n        }\n        .uploader-zone-fog {\n            cursor: not-allowed;\n            &:hover {\n                background: rgba(0, 0, 0, 0.2);\n            }\n        }\n        .uploader-zone-fog-img {\n            fill: #707070;\n        }\n        .uploader-zone-fog-caption {\n            background: rgba(0, 0, 0, 0.1);\n        }\n        .uploader-zone-fog-text {\n            color: #707070;\n        }\n        .uploader-zone-fog-controls-control {\n            fill: #707070;\n        }\n    "])))
};

var CloudComputing = function CloudComputing(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 512.001 512.001"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M405.967 187.467c-1.069-78.061-64.902-141.239-143.213-141.239-34.835 0-68.396 12.672-94.498 35.682-23.296 20.535-39.232 47.977-45.543 78.106-.461-.005-.918-.009-1.374-.009C54.434 160.008 0 214.441 0 281.347s54.434 121.339 121.34 121.339h44.534c6.029 0 10.919-4.888 10.919-10.919 0-6.031-4.89-10.919-10.919-10.919H121.34c-54.866 0-99.502-44.636-99.502-99.501s44.636-99.501 99.502-99.501c2.923 0 6.013.157 9.448.48 5.822.54 11.049-3.596 11.842-9.396 3.932-28.82 18.161-55.327 40.067-74.638 22.111-19.492 50.542-30.226 80.056-30.226 66.935 0 121.389 54.455 121.389 121.389 0 2.41-.449 8.642-.449 8.642a10.92 10.92 0 0 0 11.984 11.634 87.102 87.102 0 0 1 8.708-.44c47.297 0 85.778 38.48 85.778 85.778 0 47.297-38.48 85.777-85.778 85.777h-48.902c-6.029 0-10.919 4.888-10.919 10.919s4.89 10.919 10.919 10.919h48.902c59.339 0 107.616-48.275 107.616-107.615-.001-58.808-47.421-106.752-106.034-107.602z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M262.755 97.548c-45.658 0-84.742 34.121-90.914 79.367-.815 5.975 3.371 11.462 9.343 12.295 6.368.888 11.548-3.869 12.295-9.343 4.702-34.479 34.484-60.48 69.276-60.48 6.031 0 10.919-4.888 10.919-10.919 0-6.032-4.889-10.92-10.919-10.92zm50.524 312.735c-4.017-4.496-10.92-4.887-15.418-.868l-26.265 23.463V298.547c0-6.031-4.89-10.919-10.919-10.919-6.031 0-10.919 4.888-10.919 10.919v134.33l-26.264-23.463c-4.496-4.018-11.401-3.627-15.417.868-4.018 4.498-3.63 11.399.868 15.418l39.717 35.483a17.983 17.983 0 0 0 12.014 4.59 17.99 17.99 0 0 0 12.013-4.589l39.719-35.483c4.499-4.017 4.888-10.92.871-15.418z"
  }));
};

var Cut = function Cut(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 448 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M278.06 256L444.48 89.57c4.69-4.69 4.69-12.29 0-16.97-32.8-32.8-85.99-32.8-118.79 0L210.18 188.12l-24.86-24.86c4.31-10.92 6.68-22.81 6.68-35.26 0-53.02-42.98-96-96-96S0 74.98 0 128s42.98 96 96 96c4.54 0 8.99-.32 13.36-.93L142.29 256l-32.93 32.93c-4.37-.61-8.83-.93-13.36-.93-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-12.45-2.37-24.34-6.68-35.26l24.86-24.86L325.69 439.4c32.8 32.8 85.99 32.8 118.79 0 4.69-4.68 4.69-12.28 0-16.97L278.06 256zM96 160c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm0 256c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32z",
    className: ""
  }));
};

var Edit = function Edit(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M12.92 2.873a2.975 2.975 0 0 1 4.207 4.207l-.669.669l-4.207-4.207l.67-.669ZM11.544 4.25l-7.999 7.999a2.438 2.438 0 0 0-.655 1.194l-.878 3.95a.5.5 0 0 0 .597.597l3.926-.873a2.518 2.518 0 0 0 1.234-.678l7.982-7.982l-4.207-4.207Z"
  }));
};

var Crop = function Crop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M488 352h-40V96c0-17.67-14.33-32-32-32H192v96h160v328c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24v-40h40c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24zM160 24c0-13.26-10.75-24-24-24H88C74.75 0 64 10.74 64 24v40H24C10.75 64 0 74.74 0 88v48c0 13.25 10.75 24 24 24h40v256c0 17.67 14.33 32 32 32h224v-96H160V24z"
  }));
};

var Garbage = function Garbage(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 448 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
  }));
};

var InternetGlobe = function InternetGlobe(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    height: 596,
    viewBox: "0 0 447.632 447"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M231.816 447.05c34.23-4.863 64.239-40.59 83.121-93.35a406.317 406.317 0 0 0-83.12-9.786zm0 0M286.504 438.66c2.023-.586 4.039-1.176 6.039-1.824 1.687-.543 3.352-1.129 5.016-1.711a203.39 203.39 0 0 0 5.882-2.121c1.664-.633 3.313-1.305 4.965-1.977 1.906-.8 3.809-1.597 5.692-2.398a240.401 240.401 0 0 0 10.422-4.922c1.601-.816 3.199-1.648 4.8-2.504 1.793-.96 3.575-1.941 5.344-2.95a203.403 203.403 0 0 0 4.703-2.753c1.735-1.066 3.461-2.133 5.176-3.2a191.535 191.535 0 0 0 4.578-2.991 221.095 221.095 0 0 0 5.008-3.504 417.693 417.693 0 0 0 4.422-3.2 365.942 365.942 0 0 0 4.847-3.793c1.426-1.136 2.848-2.265 4.25-3.433 1.598-1.328 3.13-2.703 4.68-4.078 1.36-1.207 2.727-2.403 4.055-3.64 1.527-1.427 3.015-2.903 4.504-4.368 1.289-1.273 2.593-2.527 3.855-3.832.235-.242.457-.504.7-.754a268.883 268.883 0 0 0-54.817-21.094 198.517 198.517 0 0 1-51.129 83.024c.649-.168 1.297-.305 1.945-.473 1.711-.48 3.391-1.008 5.063-1.504zm0 0M447.633 231.684H351.71a414.882 414.882 0 0 1-16.152 110.68 278.228 278.228 0 0 1 60.714 24.16 223.51 223.51 0 0 0 51.36-134.84zm0 0M231.816 215.684h103.895a400.208 400.208 0 0 0-15.75-106.743 421.384 421.384 0 0 1-88.145 10.512zm0 0M231.816.316v103.137a406.589 406.589 0 0 0 83.121-9.785C296.055 40.906 266.048 5.18 231.817.316zm0 0M231.816 327.914a421.648 421.648 0 0 1 88.145 10.516 400.236 400.236 0 0 0 15.75-106.746H231.816zm0 0M396.273 80.844a278.228 278.228 0 0 1-60.714 24.16 414.882 414.882 0 0 1 16.152 110.68h95.922a223.577 223.577 0 0 0-51.36-134.84zm0 0M385.465 68.707c-.235-.238-.457-.496-.688-.742-1.265-1.305-2.578-2.563-3.867-3.832-1.484-1.465-2.965-2.945-4.496-4.367-1.324-1.235-2.695-2.403-4.055-3.633-1.55-1.375-3.101-2.762-4.695-4.09-1.383-1.168-2.8-2.285-4.207-3.406a171.24 171.24 0 0 0-4.89-3.825 220.477 220.477 0 0 0-4.383-3.199 192.844 192.844 0 0 0-5.055-3.547 200.251 200.251 0 0 0-4.535-2.957 190.441 190.441 0 0 0-5.219-3.257 223.26 223.26 0 0 0-4.664-2.727 220.848 220.848 0 0 0-5.39-2.984c-1.602-.801-3.2-1.672-4.801-2.473-1.84-.93-3.696-1.824-5.598-2.703a174.071 174.071 0 0 0-4.875-2.227c-1.895-.84-3.809-1.597-5.719-2.398a225.094 225.094 0 0 0-4.953-1.969 191.214 191.214 0 0 0-5.879-2.117 210.272 210.272 0 0 0-5.016-1.715c-2-.648-4-1.238-6.054-1.832-1.664-.488-3.336-.984-5.02-1.43-.644-.175-1.3-.312-1.949-.48a198.532 198.532 0 0 1 51.129 83.023 268.485 268.485 0 0 0 54.879-21.113zm0 0M0 215.684h95.922a415.035 415.035 0 0 1 16.148-110.68 277.885 277.885 0 0 1-60.71-24.16A223.519 223.519 0 0 0 0 215.684zm0 0M215.816 447.05V343.915a406.589 406.589 0 0 0-83.12 9.785c18.878 52.762 48.89 88.488 83.12 93.352zm0 0M215.816 231.684H111.922a400.079 400.079 0 0 0 15.75 106.746 421.097 421.097 0 0 1 88.144-10.516zm0 0M215.816.316c-34.23 4.864-64.242 40.59-83.12 93.352a406.045 406.045 0 0 0 83.12 9.785zm0 0M215.816 119.453a421.384 421.384 0 0 1-88.144-10.512 400.05 400.05 0 0 0-15.75 106.743h103.894zm0 0M168.113 6.79c-.648.167-1.297.304-1.945.472-1.695.453-3.367.957-5.055 1.445-2.008.586-4 1.176-6.015 1.816-1.7.551-3.371 1.137-5.043 1.72-1.957.69-3.918 1.378-5.856 2.112-1.672.641-3.32 1.305-4.976 1.985-1.903.8-3.809 1.601-5.688 2.398-1.648.723-3.277 1.48-4.91 2.242a223.908 223.908 0 0 0-5.512 2.68 228.526 228.526 0 0 0-10.137 5.457 149.244 149.244 0 0 0-4.718 2.75c-1.738 1.047-3.457 2.13-5.168 3.2-1.54.984-3.067 1.976-4.578 3a221.095 221.095 0 0 0-5.008 3.503 403.614 403.614 0 0 0-4.426 3.203c-1.637 1.23-3.2 2.512-4.848 3.79-1.421 1.136-2.855 2.265-4.246 3.44-1.601 1.321-3.12 2.688-4.664 4.056-1.367 1.218-2.746 2.402-4.082 3.664-1.52 1.418-3 2.89-4.484 4.351-1.29 1.274-2.602 2.531-3.867 3.84-.23.242-.453.508-.696.754a268.581 268.581 0 0 0 54.817 21.098 198.45 198.45 0 0 1 51.105-82.977zm0 0M66.719 383.234c1.488 1.465 2.969 2.946 4.496 4.371 1.328 1.23 2.695 2.399 4.058 3.63 1.551 1.378 3.102 2.761 4.696 4.09 1.383 1.16 2.793 2.28 4.207 3.405 1.601 1.297 3.199 2.586 4.894 3.833 1.442 1.082 2.907 2.128 4.371 3.203 1.672 1.199 3.36 2.398 5.063 3.55a214.813 214.813 0 0 0 4.535 2.961c1.73 1.11 3.457 2.2 5.219 3.254 1.543.93 3.101 1.84 4.664 2.73a208.275 208.275 0 0 0 5.39 2.981c1.598.801 3.2 1.672 4.801 2.473 1.84.93 3.696 1.824 5.598 2.707 1.601.754 3.226 1.496 4.875 2.223 1.894.84 3.805 1.597 5.719 2.398 1.648.672 3.289 1.336 4.953 1.969 1.941.746 3.91 1.441 5.879 2.12 1.664.583 3.328 1.169 5.015 1.712 2 .648 4 1.242 6.055 1.832 1.664.488 3.336.984 5.016 1.433.648.176 1.304.313 1.953.48a198.57 198.57 0 0 1-51.13-83.027 268.607 268.607 0 0 0-54.816 21.106c.235.238.458.496.692.742 1.2 1.297 2.492 2.555 3.797 3.824zm0 0M51.36 366.523a278.275 278.275 0 0 1 60.71-24.16 415.035 415.035 0 0 1-16.148-110.68H0a223.552 223.552 0 0 0 51.36 134.84zm0 0"
  }));
};

var Image$1 = function Image(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
  }));
};

var Audio = function Audio(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 576 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
  }));
};

var Video = function Video(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
  }));
};

var ImageAndVideo = function ImageAndVideo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 640 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z"
  }));
};

var Constants = {
  browser: {
    video: {
      // see https://en.wikipedia.org/wiki/Video_file_format
      mimeTypes: ["video/mp4", "video/quicktime"],
      extensions: ["mp4", "mov"]
    },
    image: {
      // see https://github.com/arthurvr/image-extensions/blob/master/image-extensions.json
      mimeTypes: ["image/jpeg", "image/png"],
      extensions: ["jpeg", "jpg", "png"]
    },
    audio: {
      mimeTypes: ["audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp3", "audio/mpeg3", "audio/x-mpeg", "audio/x-mp3", "audio/x-mpeg3"],
      extensions: ["wav", "mp3"]
    }
  },
  extended: {
    video: {
      mimeTypes: [],
      extensions: []
    },
    image: {
      mimeTypes: ["application/pdf", "application/postscript", "application/tif", "application/tiff", "application/vnd.3gpp.pic-bw-small", "application/x-pdf", "application/x-tif", "application/x-tiff", "image/avif", "image/avif-sequence", "image/bmp", "image/bmp2", "image/bmp3", "image/heic", "image/heif", "image/jbg", "image/jbig", "image/jng", "image/jpeg2000", "image/jpeg2000-image", "image/jxl", "image/jxr", "image/svg", "image/svg+xml", "image/tif", "image/tiff", "image/vnd.adobe.photoshop", "image/vnd.radiance", "image/webp", "image/x-adobe-dng", "image/x-canon-cr2", "image/x-canon-crw", "image/x-canon-raw", "image/x-dcraw", "image/x-exr", "image/x-fuji-raf", "image/x-icon", "image/x-kodak-dcr", "image/x-kodak-k25", "image/x-kodak-kdc", "image/x-minolta-mrw", "image/x-nikon-nef", "image/x-olympus-orf", "image/x-panasonic-raw", "image/x-pentax-pef", "image/x-sigma-x3f", "image/x-sony-arw", "image/x-sony-raw", "image/x-sony-sr2", "image/x-sony-srf", "image/x-targa", "image/x-tga"],
      extensions: ["arw", "avif", "avifs", "bmp", "bmp2", "bmp3", "cr2", "crw", "dcr", "dng", "eps", "eps2", "eps3", "exr", "hdr", "heic", "heif", "ico", "jbg", "jbig", "jfif", "jng", "jp2", "jxl", "jxr", "k25", "kdc", "mrw", "nef", "openexr", "orf", "orf", "pdf", "pef", "ps", "ps2", "ps3", "psb", "psd", "raf", "raf", "raw", "sr2", "srf", "svg", "tga", "tif", "tiff", "webp", "x3f"]
    },
    audio: {
      mimeTypes: [],
      extensions: []
    }
  }
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root, 'Set');

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set$1 && (1 / setToArray(new Set$1([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set$1(values);
};

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

/*! Fast Average Color | © 2021 Denis Seleznev | MIT License | https://github.com/fast-average-color/fast-average-color */
function toHex(num) {
    const str = num.toString(16);

    return str.length === 1 ? '0' + str : str;
}

function arrayToHex(arr) {
    return '#' + arr.map(toHex).join('');
}

function isDark(color) {
    // http://www.w3.org/TR/AERT#color-contrast
    const result = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;

    return result < 128;
}

function prepareIgnoredColor(color) {
    if (!color) { return color; }

    if (Array.isArray(color)) {
        return typeof color[0] === 'number' ? [color.slice()] : color;
    }

    return [color];
}

function isIgnoredColor(data, index, ignoredColor) {
    for (let i = 0; i < ignoredColor.length; i++) {
        if (isIgnoredColorAsNumbers(data, index, ignoredColor[i])) {
            return true;
        }
    }

    return false;
}

function isIgnoredColorAsNumbers(data, index, ignoredColor) {
    switch (ignoredColor.length) {
        case 3:
            // [red, green, blue]
            if (isIgnoredRGBColor(data, index, ignoredColor)) {
                return true;
            }

            break;
        case 4:
            // [red, green, blue, alpha]
            if (isIgnoredRGBAColor(data, index, ignoredColor)) {
                return true;
            }

            break;
        case 5:
            // [red, green, blue, alpha, threshold]
            if (isIgnoredRGBAColorWithThreshold(data, index, ignoredColor)) {
                return true;
            }

            break;
        default:
            return false;
    }
}

function isIgnoredRGBColor(data, index, ignoredColor) {
    // Ignore if the pixel are transparent.
    if (data[index + 3] !== 255) {
        return true;
    }

    if (data[index] === ignoredColor[0] &&
        data[index + 1] === ignoredColor[1] &&
        data[index + 2] === ignoredColor[2]
    ) {
        return true;
    }

    return false;
}

function isIgnoredRGBAColor(data, index, ignoredColor) {
    if (data[index + 3] && ignoredColor[3]) {
        return data[index] === ignoredColor[0] &&
            data[index + 1] === ignoredColor[1] &&
            data[index + 2] === ignoredColor[2] &&
            data[index + 3] === ignoredColor[3];
    }

    // Ignore rgb components if the pixel are fully transparent.
    return data[index + 3] === ignoredColor[3];
}

function inRange(colorComponent, ignoredColorComponent, value) {
    return colorComponent >= (ignoredColorComponent - value) &&
        colorComponent <= (ignoredColorComponent + value);
}

function isIgnoredRGBAColorWithThreshold(data, index, ignoredColor) {
    const redIgnored = ignoredColor[0];
    const greenIgnored = ignoredColor[1];
    const blueIgnored = ignoredColor[2];
    const alphaIgnored = ignoredColor[3];
    const threshold = ignoredColor[4];
    const alphaData = data[index + 3];

    const alphaInRange = inRange(alphaData, alphaIgnored, threshold);
    if (!alphaIgnored) {
        return alphaInRange;
    }

    if (!alphaData && alphaInRange) {
        return true;
    }

    if (inRange(data[index], redIgnored, threshold) &&
        inRange(data[index + 1], greenIgnored, threshold) &&
        inRange(data[index + 2], blueIgnored, threshold) &&
        alphaInRange
    ) {
        return true;
    }

    return false;
}

function dominantAlgorithm(arr, len, options) {
    const colorHash = {};
    const divider = 24;
    const ignoredColor = options.ignoredColor;
    const step = options.step;
    let max = [0, 0, 0, 0, 0];
    
    for (let i = 0; i < len; i += step) {
        const red = arr[i];
        const green = arr[i + 1];
        const blue = arr[i + 2];
        const alpha = arr[i + 3];

        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }

        const key = Math.round(red / divider) + ',' +
                Math.round(green / divider) + ',' +
                Math.round(blue / divider);

        if (colorHash[key]) {
            colorHash[key] = [
                colorHash[key][0] + red * alpha,
                colorHash[key][1] + green * alpha,
                colorHash[key][2] + blue * alpha,
                colorHash[key][3] + alpha,
                colorHash[key][4] + 1
            ];
        } else {
            colorHash[key] = [red * alpha, green * alpha, blue * alpha, alpha, 1];
        }
        
        if (max[4] < colorHash[key][4]) {
            max = colorHash[key];
        }
    }

    const redTotal = max[0];
    const greenTotal = max[1];
    const blueTotal = max[2];

    const alphaTotal = max[3];
    const count = max[4];

    return alphaTotal ? [
        Math.round(redTotal / alphaTotal),
        Math.round(greenTotal / alphaTotal),
        Math.round(blueTotal / alphaTotal),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function simpleAlgorithm(arr, len, options) {
    let redTotal = 0;
    let greenTotal = 0;
    let blueTotal = 0;
    let alphaTotal = 0;
    let count = 0;

    const ignoredColor = options.ignoredColor;
    const step = options.step;

    for (let i = 0; i < len; i += step) {
        const alpha = arr[i + 3];
        const red = arr[i] * alpha;
        const green = arr[i + 1] * alpha;
        const blue = arr[i + 2] * alpha;

        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }

        redTotal += red;
        greenTotal += green;
        blueTotal += blue;
        alphaTotal += alpha;

        count++;
    }

    return alphaTotal ? [
        Math.round(redTotal / alphaTotal),
        Math.round(greenTotal / alphaTotal),
        Math.round(blueTotal / alphaTotal),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function sqrtAlgorithm(arr, len, options) {
    let redTotal = 0;
    let greenTotal = 0;
    let blueTotal = 0;
    let alphaTotal = 0;
    let count = 0;

    const ignoredColor = options.ignoredColor;
    const step = options.step;

    for (let i = 0; i < len; i += step) {
        const red = arr[i];
        const green = arr[i + 1];
        const blue = arr[i + 2];
        const alpha = arr[i + 3];

        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }

        redTotal += red * red * alpha;
        greenTotal += green * green * alpha;
        blueTotal += blue * blue * alpha;
        alphaTotal += alpha;

        count++;
    }

    return alphaTotal ? [
        Math.round(Math.sqrt(redTotal / alphaTotal)),
        Math.round(Math.sqrt(greenTotal / alphaTotal)),
        Math.round(Math.sqrt(blueTotal / alphaTotal)),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function getDefaultColor(options) {
    return getOption(options, 'defaultColor', [0, 0, 0, 0]);
}

function getOption(options, name, defaultValue) {
    return typeof options[name] === 'undefined' ? defaultValue : options[name];
}

const MIN_SIZE = 10;
const MAX_SIZE = 100;

function isSvg(filename) {
    return filename.search(/\.svg(\?|$)/i) !== -1;
}

function getOriginalSize(resource) {
    if (resource instanceof HTMLImageElement) {
        let width = resource.naturalWidth;
        let height = resource.naturalHeight;

        // For SVG images with only viewBox attr.
        if (!resource.naturalWidth && isSvg(resource.src)) {
            width = height = MAX_SIZE;
        }

        return {
            width,
            height,
        };
    }

    if (resource instanceof HTMLVideoElement) {
        return {
            width: resource.videoWidth,
            height: resource.videoHeight
        };
    }

    return {
        width: resource.width,
        height: resource.height
    };
}

function prepareSizeAndPosition(originalSize, options) {
    const srcLeft = getOption(options, 'left', 0);
    const srcTop = getOption(options, 'top', 0);
    const srcWidth = getOption(options, 'width', originalSize.width);
    const srcHeight = getOption(options, 'height', originalSize.height);

    let destWidth = srcWidth;
    let destHeight = srcHeight;

    if (options.mode === 'precision') {
        return {
            srcLeft,
            srcTop,
            srcWidth,
            srcHeight,
            destWidth,
            destHeight
        };
    }

    let factor;

    if (srcWidth > srcHeight) {
        factor = srcWidth / srcHeight;
        destWidth = MAX_SIZE;
        destHeight = Math.round(destWidth / factor);
    } else {
        factor = srcHeight / srcWidth;
        destHeight = MAX_SIZE;
        destWidth = Math.round(destHeight / factor);
    }

    if (
        destWidth > srcWidth || destHeight > srcHeight ||
        destWidth < MIN_SIZE || destHeight < MIN_SIZE
    ) {
        destWidth = srcWidth;
        destHeight = srcHeight;
    }

    return {
        srcLeft,
        srcTop,
        srcWidth,
        srcHeight,
        destWidth,
        destHeight
    };
}

function makeCanvas() {
    return typeof window === 'undefined' ?
        new OffscreenCanvas(1, 1) :
        document.createElement('canvas');
}

const ERROR_PREFIX = 'FastAverageColor: ';

function outputError(options, text, details) {
    if (!options.silent) {
        console.error(ERROR_PREFIX + text);

        if (details) {
            console.error(details);
        }
    }
}

function getError(text) {
    return Error(ERROR_PREFIX + text);
}

class FastAverageColor {
    /**
     * Get asynchronously the average color from not loaded image.
     *
     * @param {string | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | null} resource
     * @param {FastAverageColorOptions} [options]
     *
     * @returns {Promise<FastAverageColorOptions>}
     */
    getColorAsync(resource, options) {
        if (!resource) {
            return Promise.reject(getError('call .getColorAsync() without resource.'));
        }

        if (typeof resource === 'string') {
            const img = new Image();
            img.crossOrigin = '';
            img.src = resource;

            return this._bindImageEvents(img, options);
        } else if (resource instanceof Image && !resource.complete) {
            return this._bindImageEvents(resource, options);
        } else {
            const result = this.getColor(resource, options);

            return result.error ? Promise.reject(result.error) : Promise.resolve(result);
        }
    }

    /**
     * Get the average color from images, videos and canvas.
     *
     * @param {HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | null} resource
     * @param {FastAverageColorOptions} [options]
     *
     * @returns {FastAverageColorResult}
     */
    getColor(resource, options) {
        options = options || {};

        const defaultColor = getDefaultColor(options);

        if (!resource) {
            outputError(options, 'call .getColor(null) without resource.');

            return this.prepareResult(defaultColor);
        }

        const originalSize = getOriginalSize(resource);
        const size = prepareSizeAndPosition(originalSize, options);

        if (!size.srcWidth || !size.srcHeight || !size.destWidth || !size.destHeight) {
            outputError(options, `incorrect sizes for resource "${resource.src}".`);

            return this.prepareResult(defaultColor);
        }

        if (!this._ctx) {
            this._canvas = makeCanvas();
            this._ctx = this._canvas.getContext && this._canvas.getContext('2d');

            if (!this._ctx) {
                outputError(options, 'Canvas Context 2D is not supported in this browser.');

                return this.prepareResult(defaultColor);
            }
        }

        this._canvas.width = size.destWidth;
        this._canvas.height = size.destHeight;

        let value = defaultColor;

        try {
            this._ctx.clearRect(0, 0, size.destWidth, size.destHeight);
            this._ctx.drawImage(
                resource,
                size.srcLeft, size.srcTop,
                size.srcWidth, size.srcHeight,
                0, 0,
                size.destWidth, size.destHeight
            );

            const bitmapData = this._ctx.getImageData(0, 0, size.destWidth, size.destHeight).data;
            value = this.getColorFromArray4(bitmapData, options);
        } catch (e) {
            outputError(options, `security error (CORS) for resource ${resource.src}.\nDetails: https://developer.mozilla.org/en/docs/Web/HTML/CORS_enabled_image`, e);
        }

        return this.prepareResult(value);
    }

    /**
     * Get the average color from a array when 1 pixel is 4 bytes.
     *
     * @param {number[]|Uint8Array|Uint8ClampedArray} arr
     * @param {Object} [options]
     * @param {string} [options.algorithm="sqrt"] "simple", "sqrt" or "dominant"
     * @param {number[]}  [options.defaultColor=[0, 0, 0, 0]] [red, green, blue, alpha]
     * @param {number[]}  [options.ignoredColor] [red, green, blue, alpha]
     * @param {number} [options.step=1]
     *
     * @returns {number[]} [red (0-255), green (0-255), blue (0-255), alpha (0-255)]
     */
    getColorFromArray4(arr, options) {
        options = options || {};

        const bytesPerPixel = 4;
        const arrLength = arr.length;
        const defaultColor = getDefaultColor(options);

        if (arrLength < bytesPerPixel) {
            return defaultColor;
        }

        const len = arrLength - arrLength % bytesPerPixel;
        const step = (options.step || 1) * bytesPerPixel;

        let algorithm;

        switch (options.algorithm || 'sqrt') {
            case 'simple':
                algorithm = simpleAlgorithm;
                break;
            case 'sqrt':
                algorithm = sqrtAlgorithm;
                break;
            case 'dominant':
                algorithm = dominantAlgorithm;
                break;
            default:
                throw getError(`${options.algorithm} is unknown algorithm.`);
        }

        return algorithm(arr, len, {
            defaultColor,
            ignoredColor: prepareIgnoredColor(options.ignoredColor),
            step
        });
    }

    /**
     * Get color data from value ([r, g, b, a]).
     *
     * @param {number[]} value
     *
     * @returns {FastAverageColorResult}
     */
    prepareResult(value) {
        const rgb = value.slice(0, 3);
        const rgba = [].concat(rgb, value[3] / 255);
        const isDarkColor = isDark(value);

        return {
            value,
            rgb: 'rgb(' + rgb.join(',') + ')',
            rgba: 'rgba(' + rgba.join(',') + ')',
            hex: arrayToHex(rgb),
            hexa: arrayToHex(value),
            isDark: isDarkColor,
            isLight: !isDarkColor
        };
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        delete this._canvas;
        delete this._ctx;
    }

    _bindImageEvents(resource, options) {
        return new Promise((resolve, reject) => {
            const onload = () => {
                unbindEvents();

                const result = this.getColor(resource, options);

                if (result.error) {
                    reject(result.error);
                } else {
                    resolve(result);
                }
            };

            const onerror = () => {
                unbindEvents();

                reject(getError(`Error loading image "${resource.src}".`));
            };

            const onabort = () => {
                unbindEvents();

                reject(getError(`Image "${resource.src}" loading aborted.`));
            };

            const unbindEvents = () => {
                resource.removeEventListener('load', onload);
                resource.removeEventListener('error', onerror);
                resource.removeEventListener('abort', onabort);
            };

            resource.addEventListener('load', onload);
            resource.addEventListener('error', onerror);
            resource.addEventListener('abort', onabort);
        });
    }
}

var global$1 =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global$1 !== 'undefined' && global$1);

var support = {
  searchParams: 'URLSearchParams' in global$1,
  iterable: 'Symbol' in global$1 && 'iterator' in Symbol,
  blob:
    'FileReader' in global$1 &&
    'Blob' in global$1 &&
    (function() {
      try {
        new Blob();
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global$1,
  arrayBuffer: 'ArrayBuffer' in global$1
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ];

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift();
      return {done: value === undefined, value: value}
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    };
  }

  return iterator
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function(name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null
};

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
};

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push(name);
  });
  return iteratorFor(items)
};

Headers.prototype.values = function() {
  var items = [];
  this.forEach(function(value) {
    items.push(value);
  });
  return iteratorFor(items)
};

Headers.prototype.entries = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items)
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;
    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    };

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    };
  }

  this.text = function() {
    var rejected = consumed(this);
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  };

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    };
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  };

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body);

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/;
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
};

function decode(body) {
  var form = new FormData();
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
  return headers
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
  this.headers = new Headers(options.headers);
  this.url = options.url || '';
  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
};

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''});
  response.type = 'error';
  return response
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
};

var DOMException = global$1.DOMException;
try {
  new DOMException();
} catch (err) {
  DOMException = function(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      setTimeout(function() {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'));
      }, 0);
    };

    function fixUrl(url) {
      try {
        return url === '' && global$1.location.href ? global$1.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob';
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer';
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  })
}

fetch.polyfill = true;

if (!global$1.fetch) {
  global$1.fetch = fetch;
  global$1.Headers = Headers;
  global$1.Request = Request;
  global$1.Response = Response;
}

class t{constructor(){this.listeners={};}on(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.un(t,i),this.un(t,e);};return this.on(t,i),i}return ()=>this.un(t,e)}un(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e);}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={};}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)));}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t;}onInit(){}_init(t){this.wavesurfer=t,this.onInit();}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()));}}function i(t,e,i,n,s=3,o=0){if(!t)return ()=>{};let r=()=>{};const a=a=>{if(a.button!==o)return;a.preventDefault(),a.stopPropagation();let l=a.clientX,h=a.clientY,d=!1;const c=n=>{n.preventDefault(),n.stopPropagation();const o=n.clientX,r=n.clientY,a=o-l,c=r-h;if(d||Math.abs(a)>s||Math.abs(c)>s){const n=t.getBoundingClientRect(),{left:s,top:u}=n;d||(null==i||i(l-s,h-u),d=!0),e(a,c,o-s,r-u),l=o,h=r;}},u=()=>{d&&(null==n||n()),r();},g=t=>{t.relatedTarget&&t.relatedTarget!==document.documentElement||u();},v=t=>{d&&(t.stopPropagation(),t.preventDefault());},p=t=>{d&&t.preventDefault();};document.addEventListener("pointermove",c),document.addEventListener("pointerup",u),document.addEventListener("pointerout",g),document.addEventListener("pointercancel",g),document.addEventListener("touchmove",p,{passive:!1}),document.addEventListener("click",v,{capture:!0}),r=()=>{document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",u),document.removeEventListener("pointerout",g),document.removeEventListener("pointercancel",g),document.removeEventListener("touchmove",p),setTimeout((()=>{document.removeEventListener("click",v,{capture:!0});}),10);};};return t.addEventListener("pointerdown",a),()=>{r(),t.removeEventListener("pointerdown",a);}}function n(t,e){const i=e.xmlns?document.createElementNS(e.xmlns,t):document.createElement(t);for(const[t,s]of Object.entries(e))if("children"===t)for(const[t,s]of Object.entries(e))"string"==typeof s?i.appendChild(document.createTextNode(s)):i.appendChild(n(t,s));else "style"===t?Object.assign(i.style,s):"textContent"===t?i.textContent=s:i.setAttribute(t,s.toString());return i}function s(t,e,i){const s=n(t,e||{});return null==i||i.appendChild(s),s}class o extends t{constructor(t,e,i=0){var n,s,o,r,a,l,h,d;super(),this.totalDuration=e,this.numberOfChannels=i,this.minLength=0,this.maxLength=1/0,this.contentEditable=!1,this.id=t.id||`region-${Math.random().toString(32).slice(2)}`,this.start=this.clampPosition(t.start),this.end=this.clampPosition(null!==(n=t.end)&&void 0!==n?n:t.start),this.drag=null===(s=t.drag)||void 0===s||s,this.resize=null===(o=t.resize)||void 0===o||o,this.color=null!==(r=t.color)&&void 0!==r?r:"rgba(0, 0, 0, 0.1)",this.minLength=null!==(a=t.minLength)&&void 0!==a?a:this.minLength,this.maxLength=null!==(l=t.maxLength)&&void 0!==l?l:this.maxLength,this.channelIdx=null!==(h=t.channelIdx)&&void 0!==h?h:-1,this.contentEditable=null!==(d=t.contentEditable)&&void 0!==d?d:this.contentEditable,this.element=this.initElement(),this.setContent(t.content),this.setPart(),this.renderPosition(),this.initMouseEvents();}clampPosition(t){return Math.max(0,Math.min(this.totalDuration,t))}setPart(){const t=this.start===this.end;this.element.setAttribute("part",`${t?"marker":"region"} ${this.id}`);}addResizeHandles(t){const e={position:"absolute",zIndex:"2",width:"6px",height:"100%",top:"0",cursor:"ew-resize",wordBreak:"keep-all"},n=s("div",{part:"region-handle region-handle-left",style:Object.assign(Object.assign({},e),{left:"0",borderLeft:"2px solid rgba(0, 0, 0, 0.5)",borderRadius:"2px 0 0 2px"})},t),o=s("div",{part:"region-handle region-handle-right",style:Object.assign(Object.assign({},e),{right:"0",borderRight:"2px solid rgba(0, 0, 0, 0.5)",borderRadius:"0 2px 2px 0"})},t);i(n,(t=>this.onResize(t,"start")),(()=>null),(()=>this.onEndResizing()),1),i(o,(t=>this.onResize(t,"end")),(()=>null),(()=>this.onEndResizing()),1);}removeResizeHandles(t){const e=t.querySelector('[part*="region-handle-left"]'),i=t.querySelector('[part*="region-handle-right"]');e&&t.removeChild(e),i&&t.removeChild(i);}initElement(){const t=this.start===this.end;let e=0,i=100;this.channelIdx>=0&&this.channelIdx<this.numberOfChannels&&(i=100/this.numberOfChannels,e=i*this.channelIdx);const n=s("div",{style:{position:"absolute",top:`${e}%`,height:`${i}%`,backgroundColor:t?"none":this.color,borderLeft:t?"2px solid "+this.color:"none",borderRadius:"2px",boxSizing:"border-box",transition:"background-color 0.2s ease",cursor:this.drag?"grab":"default",pointerEvents:"all"}});return !t&&this.resize&&this.addResizeHandles(n),n}renderPosition(){const t=this.start/this.totalDuration,e=(this.totalDuration-this.end)/this.totalDuration;this.element.style.left=100*t+"%",this.element.style.right=100*e+"%";}toggleCursor(t){this.drag&&(this.element.style.cursor=t?"grabbing":"grab");}initMouseEvents(){const{element:t}=this;t&&(t.addEventListener("click",(t=>this.emit("click",t))),t.addEventListener("mouseenter",(t=>this.emit("over",t))),t.addEventListener("mouseleave",(t=>this.emit("leave",t))),t.addEventListener("dblclick",(t=>this.emit("dblclick",t))),t.addEventListener("pointerdown",(()=>this.toggleCursor(!0))),t.addEventListener("pointerup",(()=>this.toggleCursor(!1))),i(t,(t=>this.onMove(t)),(()=>this.toggleCursor(!0)),(()=>{this.toggleCursor(!1),this.drag&&this.emit("update-end");})),this.contentEditable&&this.content&&(this.content.addEventListener("click",(t=>this.onContentClick(t))),this.content.addEventListener("blur",(()=>this.onContentBlur()))));}_onUpdate(t,e){if(!this.element.parentElement)return;const{width:i}=this.element.parentElement.getBoundingClientRect(),n=t/i*this.totalDuration,s=e&&"start"!==e?this.start:this.start+n,o=e&&"end"!==e?this.end:this.end+n,r=o-s;s>=0&&o<=this.totalDuration&&s<=o&&r>=this.minLength&&r<=this.maxLength&&(this.start=s,this.end=o,this.renderPosition(),this.emit("update"));}onMove(t){this.drag&&this._onUpdate(t);}onResize(t,e){this.resize&&this._onUpdate(t,e);}onEndResizing(){this.resize&&this.emit("update-end");}onContentClick(t){t.stopPropagation();t.target.focus(),this.emit("click",t);}onContentBlur(){this.emit("update-end");}_setTotalDuration(t){this.totalDuration=t,this.renderPosition();}play(){this.emit("play");}setContent(t){var e;if(null===(e=this.content)||void 0===e||e.remove(),t){if("string"==typeof t){const e=this.start===this.end;this.content=s("div",{style:{padding:`0.2em ${e?.2:.4}em`,display:"inline-block"},textContent:t});}else this.content=t;this.contentEditable&&(this.content.contentEditable="true"),this.content.setAttribute("part","region-content"),this.element.appendChild(this.content);}else this.content=void 0;}setOptions(t){var e,i;if(t.color&&(this.color=t.color,this.element.style.backgroundColor=this.color),void 0!==t.drag&&(this.drag=t.drag,this.element.style.cursor=this.drag?"grab":"default"),void 0!==t.start||void 0!==t.end){const n=this.start===this.end;this.start=this.clampPosition(null!==(e=t.start)&&void 0!==e?e:this.start),this.end=this.clampPosition(null!==(i=t.end)&&void 0!==i?i:n?this.start:this.end),this.renderPosition(),this.setPart();}if(t.content&&this.setContent(t.content),t.id&&(this.id=t.id,this.setPart()),void 0!==t.resize&&t.resize!==this.resize){const e=this.start===this.end;this.resize=t.resize,this.resize&&!e?this.addResizeHandles(this.element):this.removeResizeHandles(this.element);}}remove(){this.emit("remove"),this.element.remove(),this.element=null;}}class r extends e{constructor(t){super(t),this.regions=[],this.regionsContainer=this.initRegionsContainer();}static create(t){return new r(t)}onInit(){if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");this.wavesurfer.getWrapper().appendChild(this.regionsContainer);let t=[];this.subscriptions.push(this.wavesurfer.on("timeupdate",(e=>{const i=this.regions.filter((t=>t.start<=e&&(t.end===t.start?t.start+.05:t.end)>=e));i.forEach((e=>{t.includes(e)||this.emit("region-in",e);})),t.forEach((t=>{i.includes(t)||this.emit("region-out",t);})),t=i;})));}initRegionsContainer(){return s("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",zIndex:"3",pointerEvents:"none"}})}getRegions(){return this.regions}avoidOverlapping(t){if(!t.content)return;const e=t.content,i=e.getBoundingClientRect(),n=this.regions.map((e=>{if(e===t||!e.content)return 0;const n=e.content.getBoundingClientRect();return i.left<n.left+n.width&&n.left<i.left+i.width?n.height:0})).reduce(((t,e)=>t+e),0);e.style.marginTop=`${n}px`;}adjustScroll(t){var e,i;const n=null===(i=null===(e=this.wavesurfer)||void 0===e?void 0:e.getWrapper())||void 0===i?void 0:i.parentElement;if(!n)return;const{clientWidth:s,scrollWidth:o}=n;if(o<=s)return;const r=n.getBoundingClientRect(),a=t.element.getBoundingClientRect(),l=a.left-r.left,h=a.right-r.left;l<0?n.scrollLeft+=l:h>s&&(n.scrollLeft+=h-s);}saveRegion(t){this.regionsContainer.appendChild(t.element),this.avoidOverlapping(t),this.regions.push(t);const e=[t.on("update",(()=>{this.adjustScroll(t);})),t.on("update-end",(()=>{this.avoidOverlapping(t),this.emit("region-updated",t);})),t.on("play",(()=>{var e,i;null===(e=this.wavesurfer)||void 0===e||e.play(),null===(i=this.wavesurfer)||void 0===i||i.setTime(t.start);})),t.on("click",(e=>{this.emit("region-clicked",t,e);})),t.on("dblclick",(e=>{this.emit("region-double-clicked",t,e);})),t.once("remove",(()=>{e.forEach((t=>t())),this.regions=this.regions.filter((e=>e!==t)),this.emit("region-removed",t);}))];this.subscriptions.push(...e),this.emit("region-created",t);}addRegion(t){var e,i;if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");const n=this.wavesurfer.getDuration(),s=null===(i=null===(e=this.wavesurfer)||void 0===e?void 0:e.getDecodedData())||void 0===i?void 0:i.numberOfChannels,r=new o(t,n,s);return n?this.saveRegion(r):this.subscriptions.push(this.wavesurfer.once("ready",(t=>{r._setTotalDuration(t),this.saveRegion(r);}))),r}enableDragSelection(t,e=3){var n;const s=null===(n=this.wavesurfer)||void 0===n?void 0:n.getWrapper();if(!(s&&s instanceof HTMLElement))return ()=>{};let r=null,a=0;return i(s,((t,e,i)=>{r&&r._onUpdate(t,i>a?"end":"start");}),(e=>{var i,n;if(a=e,!this.wavesurfer)return;const s=this.wavesurfer.getDuration(),l=null===(n=null===(i=this.wavesurfer)||void 0===i?void 0:i.getDecodedData())||void 0===n?void 0:n.numberOfChannels,{width:h}=this.wavesurfer.getWrapper().getBoundingClientRect(),d=e/h*s,c=(e+5)/h*s;r=new o(Object.assign(Object.assign({},t),{start:d,end:c}),s,l),this.regionsContainer.appendChild(r.element);}),(()=>{r&&(this.saveRegion(r),r=null);}),e)}clearRegions(){this.regions.forEach((t=>t.remove()));}destroy(){this.clearRegions(),super.destroy(),this.regionsContainer.remove();}}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Waveform = /*#__PURE__*/function (_React$Component) {
  _inherits(Waveform, _React$Component);

  var _super = _createSuper(Waveform);

  function Waveform(props) {
    var _this;

    _classCallCheck(this, Waveform);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onReady", function (wavesurfer) {
      var _this$props = _this.props,
          onReady = _this$props.onReady,
          range = _this$props.range;
      var wavesurferRegions = wavesurfer.registerPlugin(r.create());
      wavesurferRegions.addRegion({
        id: 'cut',
        start: range ? range[0] : 0,
        end: range ? range[1] : 0,
        color: 'rgba(146, 210, 117, 0.3)',
        resize: false,
        drag: false
      });
      onReady(wavesurfer);

      _this.setState({
        wavesurfer: wavesurfer,
        wavesurferRegions: wavesurferRegions
      });
    });

    _this.state = {
      wavesurfer: null,
      wavesurferRegions: null
    };
    return _this;
  }

  _createClass(Waveform, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.redraw);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$state = this.state,
          wavesurfer = _this$state.wavesurfer,
          wavesurferRegions = _this$state.wavesurferRegions;
      var range = this.props.range;

      if (wavesurfer) {
        if (prevProps.range !== range) wavesurfer.seekTo(Math.min(1, Math.max(0, range[0])));
      }

      if (wavesurferRegions && prevProps.range !== range) {
        wavesurferRegions.clearRegions();
        wavesurferRegions.addRegion({
          id: 'cut',
          start: range ? range[0] : 0,
          end: range ? range[1] : 0,
          color: 'rgba(146, 210, 117, 0.3)',
          resize: false,
          drag: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$state2 = this.state,
          wavesurfer = _this$state2.wavesurfer,
          wavesurferRegions = _this$state2.wavesurferRegions;
      window.removeEventListener('resize', this.redraw);

      if (wavesurfer) {
        wavesurfer.destroy();
      }

      if (wavesurferRegions) {
        wavesurferRegions.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          src = _this$props2.src,
          className = _this$props2.className,
          height = _this$props2.height;
      return /*#__PURE__*/React.createElement("div", {
        className: className
      }, /*#__PURE__*/React.createElement(WavesurferPlayer, {
        key: src,
        url: src,
        cursorWidth: 0,
        height: height,
        waveColor: '#D1D6DA',
        zoom: 0,
        hideScrollbar: true,
        interact: false,
        progressColor: '#aeb3b7',
        onReady: this.onReady
      }));
    }
  }]);

  return Waveform;
}(React.Component);
Waveform.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  onReady: PropTypes.func,
  range: PropTypes.array,
  src: PropTypes.string
};
Waveform.defaultProps = {
  className: '',
  height: 100,
  onReady: function onReady() {
    return null;
  },
  range: null,
  src: null
};

var _templateObject$1, _Uploader$propTypes;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var validator = {
  isURL: isURL
};

var _ = {
  camelCase: camelCase,
  concat: concat,
  debounce: debounce,
  difference: difference,
  get: get,
  isString: isString,
  last: last,
  map: map,
  round: round,
  split: split,
  uniq: uniq,
  upperFirst: upperFirst
};

var Uploader = /*#__PURE__*/function (_React$Component) {
  _inherits(Uploader, _React$Component);

  var _super = _createSuper$1(Uploader);

  function Uploader(props) {
    var _this;

    _classCallCheck(this, Uploader);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updatePlayerVolume", function () {
      var gain = _this.props.gain;
      var dbToLinear = Math.pow(10, gain / 20);
      if (_this.audio && gain) _this.audio.volume = dbToLinear;
    });

    _this.state = {
      beingDropTarget: false,
      height: null,
      file: null,
      loaded: false,
      mounted: false,
      url: '',
      width: null,
      imageBackgroundColor: 'rgba(0, 0, 0, 0)',
      imageIsDark: false,
      _forceUpdateCounter: 0
    };
    _this.change = _this.change.bind(_assertThisInitialized(_this));
    _this.getFileTypes = _this.getFileTypes.bind(_assertThisInitialized(_this));
    _this.getSrcType = _this.getSrcType.bind(_assertThisInitialized(_this));
    _this.getAcceptedExtensions = _this.getAcceptedExtensions.bind(_assertThisInitialized(_this));
    _this.updateMediaLoop = _this.updateMediaLoop.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleCropClick = _this.handleCropClick.bind(_assertThisInitialized(_this));
    _this.handleCutClick = _this.handleCutClick.bind(_assertThisInitialized(_this));
    _this.handleEditClick = _this.handleEditClick.bind(_assertThisInitialized(_this));
    _this.handleDragLeave = _this.handleDragLeave.bind(_assertThisInitialized(_this));
    _this.handleDragEnter = _this.handleDragEnter.bind(_assertThisInitialized(_this));
    _this.handleMouseOver = _this.handleMouseOver.bind(_assertThisInitialized(_this));
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_assertThisInitialized(_this));
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_assertThisInitialized(_this));
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_this));
    _this.handleInjectUrlClick = _this.handleInjectUrlClick.bind(_assertThisInitialized(_this));
    _this.handleLoad = _this.handleLoad.bind(_assertThisInitialized(_this));
    _this.handleImageLoad = _this.handleImageLoad.bind(_assertThisInitialized(_this));
    _this.handleAudioLoad = _this.handleAudioLoad.bind(_assertThisInitialized(_this));
    _this.handleVideoLoad = _this.handleVideoLoad.bind(_assertThisInitialized(_this));
    _this.handleVideoLoadMetadata = _this.handleVideoLoadMetadata.bind(_assertThisInitialized(_this));
    _this.handleVideoPlayerError = _this.handleVideoPlayerError.bind(_assertThisInitialized(_this));
    _this.handleRemoveClick = _this.handleRemoveClick.bind(_assertThisInitialized(_this));
    _this.handleUrlChange = _this.handleUrlChange.bind(_assertThisInitialized(_this));
    _this.get = _this.get.bind(_assertThisInitialized(_this));
    _this.injectUrl = _this.injectUrl.bind(_assertThisInitialized(_this));
    _this.change = _this.change.bind(_assertThisInitialized(_this));
    _this.updateImageBackground = _this.updateImageBackground.bind(_assertThisInitialized(_this));
    _this.updateImageBackgroundInState = _this.updateImageBackgroundInState.bind(_assertThisInitialized(_this));
    _this._forceUpdate = _this._forceUpdate.bind(_assertThisInitialized(_this));
    _this._handleWindowScroll = _this._handleWindowScroll.bind(_assertThisInitialized(_this));
    _this.forceUpdateOnResize = _.debounce(_this._forceUpdate, 250);
    _this.handleWindowScroll = _.debounce(_this._handleWindowScroll, 250);
    return _this;
  }

  _createClass(Uploader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
      this.initializeDrag();
      this.updateImageBackground();
      window.addEventListener('resize', this.forceUpdateOnResize);
      window.addEventListener('scroll', this.handleWindowScroll);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.src !== prevProps.src) {
        if (this.props.src) this.lastChangeStart = new Date().getTime();
        this.updateImageBackground();
      } // If the user decided to redisplay the loader, but the source has not changed since, immediately trigger onLoad event


      if (this.props.fetching && !prevProps.fetching && this.props.src && prevProps.src === this.props.src && this.state.loaded) this.props.onLoad();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.forceUpdateOnResize);
      window.removeEventListener('scroll', this.handleWindowScroll);
    } // Hack: Force re-render by incrementing a counter to re-calculate the preview resizing infos after a window resize

  }, {
    key: "_forceUpdate",
    value: function _forceUpdate() {
      var srcType = this.getSrcType();
      if (srcType !== "video") this.setState({
        _forceUpdateCounter: this.state._forceUpdateCounter++
      });
    }
  }, {
    key: "getFileTypes",
    value: function getFileTypes() {
      var fileType = this.props.fileType;
      return typeof fileType === "string" ? [fileType] : fileType;
    }
  }, {
    key: "getSrcType",
    value: function getSrcType() {
      var fileTypes = this.getFileTypes();
      return this.guessType(this.props.srcType) || this.guessType(this.props.src) || (fileTypes.indexOf('video') !== -1 ? fileTypes.indexOf('image') !== -1 ? 'iv' : 'video' : fileTypes[0]);
    }
  }, {
    key: "getAcceptedExtensions",
    value: function getAcceptedExtensions() {
      var _this2 = this;

      var fileTypes = this.getFileTypes();
      var extensions = [];
      fileTypes.forEach(function (fileType) {
        _this2.extensions()[fileType].forEach(function (extension) {
          return extensions.push(extension);
        });
      });
      return extensions;
    }
  }, {
    key: "change",
    value: function () {
      var _change = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(file) {
        var manual,
            callback,
            changeStartTime,
            fileTypes,
            type,
            maxSize,
            compressionError,
            compressedFile,
            _args = arguments;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                manual = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                callback = _args.length > 2 && _args[2] !== undefined ? _args[2] : function (data) {
                  return null;
                };
                changeStartTime = new Date().getTime();
                this.lastChangeStart = changeStartTime;
                fileTypes = this.getFileTypes(), type = this.guessType(file);
                maxSize = this.props.maxSizes[type] || this.props.maxSize;

                if (!(fileTypes.indexOf(type) === -1)) {
                  _context.next = 10;
                  break;
                }

                this.props.onInvalidFileExtensionError(this.extension(file), this.getAcceptedExtensions());
                _context.next = 29;
                break;

              case 10:
                compressionError = null;

                if (!(maxSize && file.size >= maxSize)) {
                  _context.next = 28;
                  break;
                }

                if (!(type === 'image')) {
                  _context.next = 28;
                  break;
                }

                compressedFile = null;
                this.props.onCompressStart(file);
                _context.prev = 15;
                _context.next = 18;
                return imageCompression(file, {
                  maxSizeMB: maxSize / 1024 / 1024,
                  useWebWorker: true
                });

              case 18:
                compressedFile = _context.sent;
                if (compressedFile) file = compressedFile;
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](15);
                compressionError = _context.t0;

              case 25:
                if (!(this.lastChangeStart > changeStartTime)) {
                  _context.next = 27;
                  break;
                }

                return _context.abrupt("return");

              case 27:
                this.props.onCompressEnd(compressedFile);

              case 28:
                if (maxSize && file.size >= maxSize) {
                  this.props.onFileTooLargeError(file.size, maxSize, compressionError);
                } else this.props.onChange(file, manual, type);

              case 29:
                callback(file);
                this.input.value = null; // clear input (same image set in twice would otherwise be ignored, for example)
                // reinit xhr

                if (this.xhr) this.xhr.abort(); // important, ex: heavy file (HF) injection, and the user importing another light file manually (LF) during the HF loading. If the xhr were not aborted, the user would find the HF replacing its LF at any unexpected later moment

                this.xhr = null;

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 22]]);
      }));

      function change(_x) {
        return _change.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: "handleChange",
    value: function handleChange(ev) {
      var file = _.get(ev, 'target.files.0');

      if (file) this.change(file);
    }
  }, {
    key: "handleClick",
    value: function handleClick(ev) {
      var _this3 = this;

      var _this$props = this.props,
          onUploaderClick = _this$props.onUploaderClick,
          disabledUploader = _this$props.disabledUploader;

      if (onUploaderClick) {
        onUploaderClick().then(function (file) {
          if (file) _this3.change(file);
        })["catch"](function (e) {});
      } else {
        if (disabledUploader) return;
        this.input.click();
      }
    }
  }, {
    key: "handleCropClick",
    value: function handleCropClick(ev) {
      ev.stopPropagation();
      this.props.onCropClick();
    }
  }, {
    key: "handleCutClick",
    value: function handleCutClick(ev) {
      ev.stopPropagation();
      this.props.onCutClick();
    }
  }, {
    key: "handleEditClick",
    value: function handleEditClick(ev) {
      ev.stopPropagation();
      this.props.onEditClick();
    }
  }, {
    key: "handleDragLeave",
    value: function handleDragLeave() {
      if (--this.dndCounter === 0) this.setState({
        beingDropTarget: false
      });
    }
  }, {
    key: "handleDragEnter",
    value: function handleDragEnter(ev) {
      ev.preventDefault(); // needed for IE

      if (this.dndCounter === undefined) this.dndCounter = 0;
      this.dndCounter++;
      this.setState({
        beingDropTarget: true
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      var srcType = this.getSrcType();

      if (!this.playing && this.props.hoverPlay && srcType === 'audio') {
        this.playing = true;
        if (this.audio) this.audio.play();
      }
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver() {
      var srcType = this.getSrcType();

      if (!this.playing && this.props.hoverPlay && srcType === 'audio') {
        this.playing = true;
        if (this.audio) this.audio.play();
      }
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      var srcType = this.getSrcType();

      if (this.playing && this.props.hoverPlay && srcType === 'audio') {
        this.playing = false;
        if (this.audio) this.audio.pause();
      }
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(ev) {
      ev.preventDefault();
      this.dndCounter = 0;
      this.setState({
        beingDropTarget: false
      });

      var file = _.get(ev, 'dataTransfer.files.0');

      if (file) this.change(file);
    }
  }, {
    key: "handleInjectUrlClick",
    value: function handleInjectUrlClick() {
      this.injectUrl(this.state.url, true);
    }
  }, {
    key: "_handleWindowScroll",
    value: function _handleWindowScroll() {
      var srcType = this.getSrcType();

      if (this.video && (srcType === 'video' || srcType === 'iv')) {
        var rect = this.video.getBoundingClientRect(); // https://stackoverflow.com/a/60018490

        if (rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth)) {
          this.video.play();
        } else {
          this.video.pause();
        }
      }
    }
  }, {
    key: "handleLoad",
    value: function handleLoad() {
      var _this$props2 = this.props,
          onFirstLoad = _this$props2.onFirstLoad,
          onLoad = _this$props2.onLoad;

      if (typeof this.firstLoadDone === 'undefined') {
        this.firstLoadDone = true;
        onFirstLoad();
      }

      this.setState({
        loaded: true
      }, onLoad);
    }
  }, {
    key: "updateImageBackground",
    value: function updateImageBackground() {
      if (this.props.src && this.getSrcType() === 'image') {
        var img = new Image();
        var updateImageBackgroundInState = this.updateImageBackgroundInState;
        img.crossOrigin = 'anonymous';

        img.onload = function () {
          var fac = new FastAverageColor();
          var color = fac.getColor(img);

          if (color) {
            var isDark = color.isDark,
                value = color.value;
            var rgba = isDark ? [235, 235, 235, 1] : [20, 20, 20, 1];
            if (value[3] >= 0.95 * 255) rgba = [value[0], value[1], value[2], 0.5];
            updateImageBackgroundInState(rgba, isDark);
          }
        };

        img.src = this.props.src;
        return true;
      }

      return false;
    }
  }, {
    key: "updateImageBackgroundInState",
    value: function updateImageBackgroundInState(rgba, imageIsDark) {
      this.setState({
        imageBackgroundColor: "rgba(".concat(rgba[0], ", ").concat(rgba[1], ", ").concat(rgba[2], ", ").concat(rgba[3], ")"),
        imageIsDark: imageIsDark
      });
    }
  }, {
    key: "handleAudioLoad",
    value: function handleAudioLoad() {
      var _this4 = this;

      if (this.audio) {
        var onAudioLoad = this.props.onAudioLoad;
        this.audio.addEventListener('timeupdate', function () {
          return _this4.updateMediaLoop(_this4.audio);
        }, false);
        this.updatePlayerVolume();
        onAudioLoad(this.audio);
      }

      this.handleLoad();
    }
  }, {
    key: "handleImageLoad",
    value: function handleImageLoad() {
      this.handleLoad();
    }
  }, {
    key: "handleVideoLoad",
    value: function handleVideoLoad() {
      var _this5 = this;

      if (this.video) {
        var onVideoLoad = this.props.onVideoLoad;
        this.video.addEventListener('timeupdate', function () {
          return _this5.updateMediaLoop(_this5.video);
        }, false);
        onVideoLoad(this.video);
      }

      this.handleLoad();
    }
  }, {
    key: "handleVideoLoadMetadata",
    value: function handleVideoLoadMetadata(event) {
      var videoHeight = event.target.videoHeight;

      if (videoHeight === 0) {
        var onNotSupportedVideoLoad = this.props.onNotSupportedVideoLoad;
        if (onNotSupportedVideoLoad) onNotSupportedVideoLoad('Video format is not supported');
      }
    }
  }, {
    key: "handleVideoPlayerError",
    value: function handleVideoPlayerError(event) {
      var error = event.target.error;

      if (error && error.code === 4) {
        var onNotSupportedVideoLoad = this.props.onNotSupportedVideoLoad;
        onNotSupportedVideoLoad(error.message);
      }

      this.handleLoad();
    }
  }, {
    key: "handleRemoveClick",
    value: function handleRemoveClick(ev) {
      ev.stopPropagation();
      this.props.onRemoveClick();
    }
  }, {
    key: "handleUrlChange",
    value: function handleUrlChange(ev) {
      var value = ev.target.value;
      this.setState({
        url: value
      });
    }
  }, {
    key: "updateMediaLoop",
    value: function updateMediaLoop(media) {
      var range = this.props.range;

      if (media && range) {
        if (media.currentTime < range[0] || media.currentTime > range[1]) media.currentTime = range[0];
      }
    }
  }, {
    key: "get",
    value: function get(url) {
      var _this6 = this;

      // return fetch(url, {mode: 'cors'}).then(response => response.blob());
      return new Promise(function (resolve, reject) {
        _this6.xhr = new XMLHttpRequest();
        _this6.xhr.responseType = 'blob';

        _this6.xhr.open('GET', url, true);

        _this6.xhr.onload = function () {
          if (_this6.xhr.status === 200) resolve(_this6.xhr.response);else reject(Error(_this6.xhr.statusText));
        };

        _this6.xhr.onerror = function () {
          return reject(Error('Network Error'));
        };

        _this6.xhr.send();
      });
    }
  }, {
    key: "injectUrl",
    value: function injectUrl(url) {
      var _this7 = this;

      var validate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (data) {
        return null;
      };

      if (validate && !validator.isURL(url)) {
        this.props.onInvalidUrlError(url);
        return;
      }

      this.get(url).then(function (response) {
        var name = _.last(_.split(url, '/')),
            file = new File([response], name, {
          type: response.type
        });

        _this7.change(file, false, callback);
      })["catch"](function (error) {
        _this7.props.onUrlInjectionError(error, url);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var srcType = this.getSrcType ? this.getSrcType() : null;
      var media = null,
          icon = null,
          withControls = this.props.src && (this.props.removable || this.props.croppable || this.props.cuttable),
          autoPlay = null === this.props.autoPlay ? srcType === 'video' ? true : srcType === 'iv' ? true : false : this.props.autoPlay;

      if (this.props.src) {
        var cropStyle = null;

        if (this.props.mediaCrop && this.cropMedia && (srcType === "image" && this.cropMedia.nodeName === "IMG" || (srcType === "video" || srcType === "iv") && this.cropMedia.nodeName === "VIDEO")) {
          var zoneWidth = this.zone.offsetWidth,
              zoneHeight = this.zone.offsetHeight,
              realWidth = srcType === "video" || srcType === 'iv' ? this.cropMedia.videoWidth : this.cropMedia.naturalWidth,
              realHeight = srcType === "video" || srcType === 'iv' ? this.cropMedia.videoHeight : this.cropMedia.naturalHeight,
              displayWidth = srcType === "video" || srcType === 'iv' ? realWidth : this.cropMedia.offsetWidth,
              displayHeight = srcType === "video" || srcType === 'iv' ? realHeight : this.cropMedia.offsetHeight,
              // Math.min usage is important, because any overflow would otherwise result in an ugly crop preview
          mediaCrop = {
            x: Math.min(this.props.mediaCrop.x, realWidth),
            y: Math.min(this.props.mediaCrop.y, realHeight),
            width: Math.min(this.props.mediaCrop.width, realWidth - this.props.mediaCrop.x),
            height: Math.min(this.props.mediaCrop.height, realHeight - this.props.mediaCrop.y)
          },
              displayCropX = displayWidth * mediaCrop.x / realWidth,
              displayCropY = displayHeight * mediaCrop.y / realHeight,
              displayCropWidth = displayWidth * mediaCrop.width / realWidth,
              displayCropHeight = displayHeight * mediaCrop.height / realHeight,
              displayCropRatio = displayCropWidth / displayCropHeight,
              displayCropTop = displayCropY,
              displayCropRight = displayCropX + displayCropWidth,
              displayCropBottom = displayCropY + displayCropHeight,
              displayCropLeft = displayCropX,
              scale = null;

          if (mediaCrop.width > 0 && mediaCrop.height > 0) {
            // image fit to zone
            if (this.props.backgroundSize === 'contain') {
              if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneWidth / displayCropWidth;else scale = zoneHeight / displayCropHeight;
            } else {
              if (zoneHeight * displayCropRatio > zoneWidth) scale = zoneHeight / displayCropHeight;else scale = zoneWidth / displayCropWidth;
            }

            cropStyle = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              backgroundColor: this.state.imageIsDark ? 'white' : 'black',
              transformOrigin: "".concat((displayCropLeft + displayCropRight) / 2, "px ").concat((displayCropTop + displayCropBottom) / 2, "px"),
              transform: "\n                            translateX(-".concat((displayCropLeft + displayCropRight) / 2, "px)\n                            translateY(-").concat((displayCropTop + displayCropBottom) / 2, "px)\n                            scale(").concat(scale, ")\n                        "),
              clip: "rect(\n                            ".concat(displayCropTop, "px\n                            ").concat(displayCropRight, "px\n                            ").concat(displayCropBottom, "px\n                            ").concat(displayCropLeft, "px)\n                        ")
            };
          }
        }

        switch (srcType) {
          case 'image':
            if (this.state.loaded && this.state.mounted && this.props.mediaCrop && this.zone) {
              media = jsx("img", {
                alt: "",
                ref: function ref(obj) {
                  return _this8.cropMedia = obj;
                },
                crossOrigin: "anonymous",
                src: this.props.src,
                onLoad: this._forceUpdate,
                style: cropStyle
              });
            } else {
              media = jsx("div", {
                style: {
                  backgroundColor: this.props.backgroundColor,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: this.props.backgroundSize,
                  backgroundImage: this.state.loaded ? "url(".concat(this.props.src).concat((typeof this.props.corsProof === 'boolean' ? this.props.corsProof : this.props.corsProof(this.props.src)) ? "".concat(this.props.src.match(/^http/) ? "".concat(this.props.src.includes('?') ? '&' : '?', "xCssCors=1") : '') : '', ")") : null,
                  // this is no-CORS request, we therefore need to be sure the cached response (e.g. Chrome) has been a CORS one (see the <img /> below) before display
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }
              }, jsx("img", {
                alt: "",
                crossOrigin: "anonymous",
                src: this.props.src,
                onLoad: this.handleImageLoad,
                style: {
                  position: 'fixed',
                  top: '-9999px',
                  left: '-9999px'
                }
              }));
            }

            break;

          case 'video':
          case 'iv':
            media = jsx("video", {
              autoPlay: autoPlay,
              loop: true,
              muted: true,
              crossOrigin: "anonymous",
              src: this.props.src,
              onLoadedData: this.handleVideoLoad,
              onLoadedMetadata: this.handleVideoLoadMetadata,
              onError: this.handleVideoPlayerError,
              ref: function ref(obj) {
                _this8.video = obj;
                _this8.cropMedia = obj;
              },
              style: cropStyle ? cropStyle : this.props.backgroundSize === 'cover' ? {
                height: '100%'
              } // considering the majority of videos at landscape format
              : {
                maxHeight: '100%',
                maxWidth: '100%'
              }
            });
            break;

          case 'audio':
            // Why key={...}?
            // Waves would otherwise cumulate and give a final homogeneous color because of an issue in the Waveform module...
            media = jsx(React.Fragment, {
              key: this.props.src
            }, jsx(Waveform, {
              className: "uploader-waveform",
              height: this.zone ? this.zone.clientHeight : 100,
              range: this.props.range,
              src: this.props.src,
              onReady: this.handleAudioLoad
            }), jsx("audio", {
              autoPlay: autoPlay,
              ref: function ref(obj) {
                return _this8.audio = obj;
              },
              src: this.props.src,
              loop: true,
              controls: true,
              style: {
                position: 'fixed',
                top: '-9999px',
                left: '-9999px'
              }
            }));
            break;
        }
      }

      switch (srcType) {
        case 'image':
          icon = jsx(Image$1, {
            className: "uploader-zone-fog-img"
          });
          break;

        case 'video':
          icon = jsx(Video, {
            className: "uploader-zone-fog-img"
          });
          break;

        case 'iv':
          icon = jsx(ImageAndVideo, {
            className: "uploader-zone-fog-img"
          });
          break;

        case 'audio':
          icon = jsx(Audio, {
            className: "uploader-zone-fog-img"
          });
          break;
      }

      return jsx("div", _extends({
        "data-attr": "root"
      }, _.get(this.props.customAttributes, 'root', {}), {
        className: "\n                    uploader\n                    ".concat(_.get(this.props.customAttributes, 'root.className', ''), "\n                "),
        css: css(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n                    ", ";\n                    ", ";\n                    ", ";\n                    ", ";\n                    ", ";\n                    ", ";\n                "])), styles.uploader, this.props.fetching ? styles['uploader/fetching'] : null, this.props.compact ? styles['uploader/compact'] : null, this.props.withUrlInput ? styles['uploader/withUrl'] : null, withControls ? styles['uploader/withControls'] : null, this.props.disabled ? styles['uploader/disabled'] : null)
      }), jsx("input", {
        "data-attr": "input",
        ref: function ref(obj) {
          return _this8.input = obj;
        },
        type: "file",
        disabled: this.props.disabled,
        className: "uploader-input",
        onChange: this.handleChange
      }), jsx("div", {
        ref: function ref(obj) {
          return _this8.zone = obj;
        },
        className: "\n                        uploader-zone\n                        ".concat(this.props.withUrlInput ? 'uploader-zone/withUrl' : '', "\n                    "),
        onDragEnter: this.handleDragEnter,
        onDragLeave: this.handleDragLeave,
        onMouseEnter: this.handleMouseEnter,
        onMouseOver: this.handleMouseOver,
        onMouseLeave: this.handleMouseLeave,
        onDrop: this.handleDrop,
        style: this.props.src && srcType === 'image' ? {
          backgroundColor: this.state.imageBackgroundColor
        } : null
      }, media, jsx("div", {
        className: "uploader-zone-fog",
        onClick: this.props.disabled ? null : this.handleClick
      }, this.props.fetching === true && jsx("div", {
        className: "uploader-zone-fog-loader"
      }, this.props.catalogue.loading), jsx("div", {
        className: "uploader-zone-fog-core"
      }, !withControls ? jsx(React.Fragment, null, this.state.beingDropTarget ? jsx(CloudComputing, {
        className: "uploader-zone-fog-img"
      }) : icon) : null, withControls === true && jsx(React.Fragment, null, jsx("div", {
        className: "uploader-zone-fog-controls"
      }, srcType === "image" && this.props.croppable === true && jsx("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleCropClick
      }, this.props.cropIcon || jsx(Crop, null)), this.props.cuttable === true && jsx("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleCutClick
      }, this.props.cutIcon || jsx(Cut, null)), this.props.editable === true && jsx("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleEditClick
      }, this.props.editIcon || jsx(Edit, null)), this.props.removable === true && jsx("span", {
        className: "uploader-zone-fog-controls-control",
        onClick: this.handleRemoveClick
      }, this.props.removeIcon || jsx(Garbage, null))))), this.props.caption !== null && jsx("span", {
        className: "uploader-zone-fog-caption",
        onClick: function onClick(ev) {
          return ev.stopPropagation();
        }
      }, this.props.caption))), this.props.withUrlInput === true && jsx("div", {
        className: "uploader-url"
      }, jsx("input", {
        className: "uploader-url-input",
        name: "url",
        value: this.state.url,
        placeholder: this.props.catalogue.urlInputPlaceholder,
        type: "text",
        onChange: this.handleUrlChange,
        onKeyPress: function onKeyPress(ev) {
          if (ev.which === 13) {
            // enter would otherwise submit form
            ev.preventDefault();

            _this8.handleInjectUrlClick();
          }
        }
      }), jsx("span", {
        className: "uploader-url-addon",
        onClick: this.handleInjectUrlClick
      }, jsx(InternetGlobe, {
        className: "uploader-url-addon-icon"
      }), this.props.catalogue.urlSubmitText)));
    } // + utils

    /**
     * From Base64 dataURL to MIME Type
     * Returns null when input is invalid
     */

  }, {
    key: "base64MimeType",
    value: function base64MimeType(encoded) {
      var result = null;
      if (typeof encoded !== 'string') return result;
      var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
      if (mime && mime.length) result = mime[1];
      return result;
    }
  }, {
    key: "isBase64",
    value: function isBase64(input) {
      return this.base64MimeType(input) !== null;
    }
    /**
     * From string|File to extension
     * Ex: https://upload.wikimedia.org/wikipedia/commons/d/da/Nelson_Mandela%2C_2000_%285%29_%28cropped%29.jpg => jpg
     */

  }, {
    key: "extension",
    value: function extension(input) {
      input = _.isString(input) ? input : input.name;
      return _.last(_.split(_.split(input, '?')[0], '.'));
    }
  }, {
    key: "extensions",
    value: function extensions() {
      var _this$props3 = this.props,
          additionalExtensions = _this$props3.additionalExtensions,
          extendedFileFormatSupport = _this$props3.extendedFileFormatSupport;
      var extensions = {};
      ['audio', 'image', 'video'].forEach(function (type) {
        extensions[type] = _.uniq([].concat(_toConsumableArray(Constants.browser[type].extensions), _toConsumableArray(extendedFileFormatSupport === true || _.get(extendedFileFormatSupport, type) === true ? Constants.extended[type].extensions : []), _toConsumableArray(_.get(additionalExtensions, type) || [])));
      });
      return extensions;
    }
  }, {
    key: "mimeTypes",
    value: function mimeTypes() {
      var _this$props4 = this.props,
          additionalMimeTypes = _this$props4.additionalMimeTypes,
          extendedFileFormatSupport = _this$props4.extendedFileFormatSupport;
      var mimeTypes = {};
      ['audio', 'image', 'video'].forEach(function (type) {
        mimeTypes[type] = _.uniq([].concat(_toConsumableArray(Constants.browser[type].mimeTypes), _toConsumableArray(extendedFileFormatSupport === true || _.get(extendedFileFormatSupport, type) === true ? Constants.extended[type].mimeTypes : []), _toConsumableArray(_.get(additionalMimeTypes, type) || [])));
      });
      return mimeTypes;
    }
    /**
     * Input may be a MIME Type, an extension, url string, base64, or even a type
     * Ex:
     *      - null => null
     *      - undefined => null
     *      - https://cloud.path/to/file.mp4 => video
     *      - data:image/jpeg;base64...(folded)... => image
     *      - video/mp4 => video
     *      - .jpeg => image
     *      - .mock => null
     *      - application/octet-stream => null
     */

  }, {
    key: "guessType",
    value: function guessType(input) {
      var _input;

      if (!input) return null;
      input = this.base64MimeType(input) || this.extension(input) || ((_input = input) === null || _input === void 0 ? void 0 : _input.type);
      var isExtension = !input.match(/\//);

      if (isExtension) {
        var extensions = this.extensions();

        for (var k in extensions) {
          var v = _.concat(extensions[k], _.map(extensions[k], function (ext) {
            return ext.toUpperCase();
          })); // case insensitive


          if (v.indexOf(input) !== -1) return k;
        }
      } else {
        var mimeTypes = this.mimeTypes();

        for (var _k in mimeTypes) {
          var _v = mimeTypes[_k];
          if (_v.indexOf(input) !== -1) return _k;
        }
      }

      return null;
    }
    /**
     * From ~ 100 000 000 => 100 MB
     */

  }, {
    key: "humanSize",
    value: function humanSize(size) {
      var round = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var units = ['B', 'KB', 'MB', 'GB', 'TB'];

      for (var power = units.length - 1; power >= 0; power--) {
        var tmpRes = size * 1.0 / Math.pow(1024, power);

        if (tmpRes >= 1) {
          if (round) tmpRes = _.round(tmpRes);
          return "".concat(tmpRes, " ").concat(units[power]);
        }
      }
    }
  }, {
    key: "initializeDrag",
    value: function initializeDrag() {
      // avoid browser drop management
      window.addEventListener('dragover', function (ev) {
        ev = ev || event;
        ev.preventDefault();
      }, false);
      window.addEventListener('drop', function (ev) {
        ev = ev || event;
        ev.preventDefault();
      }, false);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return _objectSpread(_objectSpread({}, nextProps.src !== _.get(prevState, '_src') ? {
        _src: nextProps.src
      } : null), nextProps.src !== _.get(prevState, '_src') ? {
        loaded: false,
        _forceUpdateCounter: 0
      } : null);
    }
  }]);

  return Uploader;
}(React.Component);
Uploader.propTypes = (_Uploader$propTypes = {
  // optional
  additionalExtensions: PropTypes.shape({
    audio: PropTypes.array,
    image: PropTypes.array,
    video: PropTypes.array
  }),
  additionalMimeTypes: PropTypes.shape({
    audio: PropTypes.array,
    image: PropTypes.array,
    video: PropTypes.array
  }),
  autoPlay: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backgroundSize: PropTypes.oneOf(['contain', 'cover']),
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  catalogue: PropTypes.object,
  compact: PropTypes.bool,
  corsProof: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  // func is a callback with src as its unique arg (e.g. we want to apply the CORS trick only for some urls, and not for others...)
  croppable: PropTypes.bool,
  editable: PropTypes.bool,
  customAttributes: PropTypes.object,
  cuttable: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledUploader: PropTypes.bool,
  extendedFileFormatSupport: PropTypes.oneOfType([PropTypes.shape({
    audio: PropTypes.bool,
    image: PropTypes.bool,
    video: PropTypes.bool
  }), PropTypes.bool]),
  fileType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  // expected file type
  hoverPlay: PropTypes.bool,
  mediaCrop: PropTypes.object,
  maxSize: PropTypes.number,
  maxSizes: PropTypes.shape({
    audio: PropTypes.number,
    image: PropTypes.number,
    video: PropTypes.number
  }),
  onChange: PropTypes.func,
  onCompressStart: PropTypes.func,
  onCompressEnd: PropTypes.func,
  onCropClick: PropTypes.func,
  onCutClick: PropTypes.func,
  onFileTooLargeError: PropTypes.func,
  onFirstLoad: PropTypes.func,
  onInvalidFileExtensionError: PropTypes.func,
  onInvalidUrlError: PropTypes.func,
  onLoad: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onUploaderClick: PropTypes.func,
  onUrlInjectionError: PropTypes.func
}, _defineProperty(_Uploader$propTypes, "onCutClick", PropTypes.func), _defineProperty(_Uploader$propTypes, "onEditClick", PropTypes.func), _defineProperty(_Uploader$propTypes, "onAudioLoad", PropTypes.func), _defineProperty(_Uploader$propTypes, "onVideoLoad", PropTypes.func), _defineProperty(_Uploader$propTypes, "range", PropTypes.array), _defineProperty(_Uploader$propTypes, "removable", PropTypes.bool), _defineProperty(_Uploader$propTypes, "src", PropTypes.string), _defineProperty(_Uploader$propTypes, "srcType", PropTypes.string), _defineProperty(_Uploader$propTypes, "gain", PropTypes.number), _defineProperty(_Uploader$propTypes, "withUrlInput", PropTypes.bool), _Uploader$propTypes);
Uploader.defaultProps = {
  additionalExtensions: {},
  additionalMimeTypes: {},
  autoPlay: null,
  // true for video, false for audio
  backgroundColor: 'transparent',
  backgroundSize: 'cover',
  caption: null,
  catalogue: {
    click: null,
    drop: null,
    typeUrl: null,
    loading: null,
    or: null,
    urlInputPlaceholder: null,
    urlSubmitText: null
  },
  compact: false,
  corsProof: true,
  editable: false,
  editIcon: null,
  // if let null, it will be default one
  croppable: false,
  cropIcon: null,
  // if let null, it will be default one
  customAttributes: {},
  cuttable: false,
  cutIcon: null,
  // if let null, it will be default one
  disabled: false,
  disabledUploader: false,
  extendedFileFormatSupport: false,
  fileType: 'image',
  // may be one (or several) of: image, video
  hoverPlay: true,
  mediaCrop: null,
  maxSize: 10 * 1024 * 1024,
  maxSizes: {},
  onChange: function onChange(file, manual, type) {
    return null;
  },
  // manual: does it follow a manual action (vs. injections, for instance) ; type: image|video|...|null
  onCompressStart: function onCompressStart() {
    return null;
  },
  onCompressEnd: function onCompressEnd() {
    return null;
  },
  onCropClick: function onCropClick() {
    return null;
  },
  onFileTooLargeError: function onFileTooLargeError(size, maxSize) {
    return null;
  },
  onFirstLoad: function onFirstLoad() {
    return null;
  },
  onInvalidFileExtensionError: function onInvalidFileExtensionError(extension, expectedExtensions) {
    return null;
  },
  onInvalidUrlError: function onInvalidUrlError(url) {
    return null;
  },
  onLoad: function onLoad() {
    return null;
  },
  onNotSupportedVideoLoad: function onNotSupportedVideoLoad() {
    return null;
  },
  onRemoveClick: function onRemoveClick() {
    return null;
  },
  onUploaderClick: null,
  // Useful with electron to use a custom file dialog
  onUrlInjectionError: function onUrlInjectionError(error, url) {
    return null;
  },
  onCutClick: function onCutClick() {
    return null;
  },
  onEditClick: function onEditClick() {
    return null;
  },
  onAudioLoad: function onAudioLoad() {
    return null;
  },
  onVideoLoad: function onVideoLoad() {
    return null;
  },
  range: null,
  gain: 0,
  removable: false,
  removeIcon: null,
  // if let null, it will be default one
  src: null,
  srcType: null,
  // e.g. video, video/mp4 (which is a more detailed MIME), etc.
  withUrlInput: false
};

export default Uploader;
