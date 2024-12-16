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

/***/ "./wwwroot/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js":
/*!*****************************************************************************!*\
  !*** ./wwwroot/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js ***!
  \*****************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === \"object\" && \"object\" !== \"undefined\" ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  \"use strict\";\n\n  function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  }\n  function _defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n  function _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    Object.defineProperty(Constructor, \"prototype\", {\n      writable: false\n    });\n    return Constructor;\n  }\n  function _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n      constructor: {\n        value: subClass,\n        writable: true,\n        configurable: true\n      }\n    });\n    Object.defineProperty(subClass, \"prototype\", {\n      writable: false\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n  }\n  function _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {\n      return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n  }\n  function _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {\n      o.__proto__ = p;\n      return o;\n    };\n    return _setPrototypeOf(o, p);\n  }\n  function _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n      return true;\n    } catch (e) {\n      return false;\n    }\n  }\n  function _assertThisInitialized(self) {\n    if (self === void 0) {\n      throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n  }\n  function _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n      return call;\n    } else if (call !== void 0) {\n      throw new TypeError(\"Derived constructors may only return object or undefined\");\n    }\n    return _assertThisInitialized(self);\n  }\n  function _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n      var Super = _getPrototypeOf(Derived),\n        result;\n      if (hasNativeReflectConstruct) {\n        var NewTarget = _getPrototypeOf(this).constructor;\n        result = Reflect.construct(Super, arguments, NewTarget);\n      } else {\n        result = Super.apply(this, arguments);\n      }\n      return _possibleConstructorReturn(this, result);\n    };\n  }\n  var t$1 = FormValidation.Plugin;\n  var t = function (_e) {\n    _inherits(t, _e);\n    var _super = _createSuper(t);\n    function t(e) {\n      var _this;\n      _classCallCheck(this, t);\n      _this = _super.call(this, e);\n      _this.statuses = new Map();\n      _this.opts = Object.assign({}, {\n        onStatusChanged: function onStatusChanged() {}\n      }, e);\n      _this.elementValidatingHandler = _this.onElementValidating.bind(_assertThisInitialized(_this));\n      _this.elementValidatedHandler = _this.onElementValidated.bind(_assertThisInitialized(_this));\n      _this.elementNotValidatedHandler = _this.onElementNotValidated.bind(_assertThisInitialized(_this));\n      _this.elementIgnoredHandler = _this.onElementIgnored.bind(_assertThisInitialized(_this));\n      _this.fieldAddedHandler = _this.onFieldAdded.bind(_assertThisInitialized(_this));\n      _this.fieldRemovedHandler = _this.onFieldRemoved.bind(_assertThisInitialized(_this));\n      return _this;\n    }\n    _createClass(t, [{\n      key: \"install\",\n      value: function install() {\n        this.core.on(\"core.element.validating\", this.elementValidatingHandler).on(\"core.element.validated\", this.elementValidatedHandler).on(\"core.element.notvalidated\", this.elementNotValidatedHandler).on(\"core.element.ignored\", this.elementIgnoredHandler).on(\"core.field.added\", this.fieldAddedHandler).on(\"core.field.removed\", this.fieldRemovedHandler);\n      }\n    }, {\n      key: \"uninstall\",\n      value: function uninstall() {\n        this.statuses.clear();\n        this.core.off(\"core.element.validating\", this.elementValidatingHandler).off(\"core.element.validated\", this.elementValidatedHandler).off(\"core.element.notvalidated\", this.elementNotValidatedHandler).off(\"core.element.ignored\", this.elementIgnoredHandler).off(\"core.field.added\", this.fieldAddedHandler).off(\"core.field.removed\", this.fieldRemovedHandler);\n      }\n    }, {\n      key: \"areFieldsValid\",\n      value: function areFieldsValid() {\n        return Array.from(this.statuses.values()).every(function (e) {\n          return e === \"Valid\" || e === \"NotValidated\" || e === \"Ignored\";\n        });\n      }\n    }, {\n      key: \"getStatuses\",\n      value: function getStatuses() {\n        return this.statuses;\n      }\n    }, {\n      key: \"onFieldAdded\",\n      value: function onFieldAdded(e) {\n        this.statuses.set(e.field, \"NotValidated\");\n      }\n    }, {\n      key: \"onFieldRemoved\",\n      value: function onFieldRemoved(e) {\n        if (this.statuses.has(e.field)) {\n          this.statuses[\"delete\"](e.field);\n        }\n        this.opts.onStatusChanged(this.areFieldsValid());\n      }\n    }, {\n      key: \"onElementValidating\",\n      value: function onElementValidating(e) {\n        this.statuses.set(e.field, \"Validating\");\n        this.opts.onStatusChanged(false);\n      }\n    }, {\n      key: \"onElementValidated\",\n      value: function onElementValidated(e) {\n        this.statuses.set(e.field, e.valid ? \"Valid\" : \"Invalid\");\n        if (e.valid) {\n          this.opts.onStatusChanged(this.areFieldsValid());\n        } else {\n          this.opts.onStatusChanged(false);\n        }\n      }\n    }, {\n      key: \"onElementNotValidated\",\n      value: function onElementNotValidated(e) {\n        this.statuses.set(e.field, \"NotValidated\");\n        this.opts.onStatusChanged(false);\n      }\n    }, {\n      key: \"onElementIgnored\",\n      value: function onElementIgnored(e) {\n        this.statuses.set(e.field, \"Ignored\");\n        this.opts.onStatusChanged(this.areFieldsValid());\n      }\n    }]);\n    return t;\n  }(t$1);\n  var s = function (_t) {\n    _inherits(s, _t);\n    var _super = _createSuper(s);\n    function s(t) {\n      var _this;\n      _classCallCheck(this, s);\n      _this = _super.call(this, t);\n      _this.fieldStatusPluginName = \"___autoFocusFieldStatus\";\n      _this.opts = Object.assign({}, {\n        onPrefocus: function onPrefocus() {}\n      }, t);\n      _this.invalidFormHandler = _this.onFormInvalid.bind(_assertThisInitialized(_this));\n      return _this;\n    }\n    _createClass(s, [{\n      key: \"install\",\n      value: function install() {\n        this.core.on(\"core.form.invalid\", this.invalidFormHandler).registerPlugin(this.fieldStatusPluginName, new t());\n      }\n    }, {\n      key: \"uninstall\",\n      value: function uninstall() {\n        this.core.off(\"core.form.invalid\", this.invalidFormHandler).deregisterPlugin(this.fieldStatusPluginName);\n      }\n    }, {\n      key: \"onFormInvalid\",\n      value: function onFormInvalid() {\n        var t = this.core.getPlugin(this.fieldStatusPluginName);\n        var i = t.getStatuses();\n        var _s = Object.keys(this.core.getFields()).filter(function (t) {\n          return i.get(t) === \"Invalid\";\n        });\n        if (_s.length > 0) {\n          var _t2 = _s[0];\n          var _i = this.core.getElements(_t2);\n          if (_i.length > 0) {\n            var _s3 = _i[0];\n            var e = {\n              firstElement: _s3,\n              field: _t2\n            };\n            this.core.emit(\"plugins.autofocus.prefocus\", e);\n            this.opts.onPrefocus(e);\n            _s3.focus();\n          }\n        }\n      }\n    }]);\n    return s;\n  }(t$1);\n  return s;\n});\n\n//# sourceURL=webpack://Vuexy/./wwwroot/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});