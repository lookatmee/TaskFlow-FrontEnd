/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Recaptcha3.min.js":
/*!******************************************************************************!*\
  !*** ./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Recaptcha3.min.js ***!
  \******************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === \"object\" && \"object\" !== \"undefined\" ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  \"use strict\";\n\n  function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  }\n  function _defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n  function _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    Object.defineProperty(Constructor, \"prototype\", {\n      writable: false\n    });\n    return Constructor;\n  }\n  function _defineProperty(obj, key, value) {\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n    return obj;\n  }\n  function _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n      constructor: {\n        value: subClass,\n        writable: true,\n        configurable: true\n      }\n    });\n    Object.defineProperty(subClass, \"prototype\", {\n      writable: false\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n  }\n  function _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {\n      return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n  }\n  function _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {\n      o.__proto__ = p;\n      return o;\n    };\n    return _setPrototypeOf(o, p);\n  }\n  function _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n      return true;\n    } catch (e) {\n      return false;\n    }\n  }\n  function _assertThisInitialized(self) {\n    if (self === void 0) {\n      throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n  }\n  function _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n      return call;\n    } else if (call !== void 0) {\n      throw new TypeError(\"Derived constructors may only return object or undefined\");\n    }\n    return _assertThisInitialized(self);\n  }\n  function _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n      var Super = _getPrototypeOf(Derived),\n        result;\n      if (hasNativeReflectConstruct) {\n        var NewTarget = _getPrototypeOf(this).constructor;\n        result = Reflect.construct(Super, arguments, NewTarget);\n      } else {\n        result = Super.apply(this, arguments);\n      }\n      return _possibleConstructorReturn(this, result);\n    };\n  }\n  var e = FormValidation.Plugin;\n  var t = FormValidation.utils.fetch;\n  var s = function (_e) {\n    _inherits(s, _e);\n    var _super = _createSuper(s);\n    function s(e) {\n      var _this;\n      _classCallCheck(this, s);\n      _this = _super.call(this, e);\n      _this.opts = Object.assign({}, {\n        minimumScore: 0\n      }, e);\n      _this.iconPlacedHandler = _this.onIconPlaced.bind(_assertThisInitialized(_this));\n      return _this;\n    }\n    _createClass(s, [{\n      key: \"install\",\n      value: function install() {\n        var _this2 = this;\n        this.core.on(\"plugins.icon.placed\", this.iconPlacedHandler);\n        var e = typeof window[s.LOADED_CALLBACK] === \"undefined\" ? function () {} : window[s.LOADED_CALLBACK];\n        window[s.LOADED_CALLBACK] = function () {\n          e();\n          var i = document.createElement(\"input\");\n          i.setAttribute(\"type\", \"hidden\");\n          i.setAttribute(\"name\", s.CAPTCHA_FIELD);\n          document.getElementById(_this2.opts.element).appendChild(i);\n          _this2.core.addField(s.CAPTCHA_FIELD, {\n            validators: {\n              promise: {\n                message: _this2.opts.message,\n                promise: function promise(e) {\n                  return new Promise(function (e, i) {\n                    window[\"grecaptcha\"].execute(_this2.opts.siteKey, {\n                      action: _this2.opts.action\n                    }).then(function (o) {\n                      t(_this2.opts.backendVerificationUrl, {\n                        method: \"POST\",\n                        params: _defineProperty({}, s.CAPTCHA_FIELD, o)\n                      }).then(function (t) {\n                        var _s = \"\".concat(t.success) === \"true\" && t.score >= _this2.opts.minimumScore;\n                        e({\n                          message: t.message || _this2.opts.message,\n                          meta: t,\n                          valid: _s\n                        });\n                      })[\"catch\"](function (e) {\n                        i({\n                          valid: false\n                        });\n                      });\n                    });\n                  });\n                }\n              }\n            }\n          });\n        };\n        var i = this.getScript();\n        if (!document.body.querySelector('script[src=\"'.concat(i, '\"]'))) {\n          var _e2 = document.createElement(\"script\");\n          _e2.type = \"text/javascript\";\n          _e2.async = true;\n          _e2.defer = true;\n          _e2.src = i;\n          document.body.appendChild(_e2);\n        }\n      }\n    }, {\n      key: \"uninstall\",\n      value: function uninstall() {\n        this.core.off(\"plugins.icon.placed\", this.iconPlacedHandler);\n        var e = this.getScript();\n        var t = [].slice.call(document.body.querySelectorAll('script[src=\"'.concat(e, '\"]')));\n        t.forEach(function (e) {\n          return e.parentNode.removeChild(e);\n        });\n        this.core.removeField(s.CAPTCHA_FIELD);\n      }\n    }, {\n      key: \"getScript\",\n      value: function getScript() {\n        var e = this.opts.language ? \"&hl=\".concat(this.opts.language) : \"\";\n        return \"https://www.google.com/recaptcha/api.js?\" + \"onload=\".concat(s.LOADED_CALLBACK, \"&render=\").concat(this.opts.siteKey).concat(e);\n      }\n    }, {\n      key: \"onIconPlaced\",\n      value: function onIconPlaced(e) {\n        if (e.field === s.CAPTCHA_FIELD) {\n          e.iconElement.style.display = \"none\";\n        }\n      }\n    }]);\n    return s;\n  }(e);\n  s.CAPTCHA_FIELD = \"___g-recaptcha-token___\";\n  s.LOADED_CALLBACK = \"___reCaptcha3Loaded___\";\n  return s;\n});\n\n//# sourceURL=webpack://Vuexy/./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Recaptcha3.min.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Recaptcha3.min.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});