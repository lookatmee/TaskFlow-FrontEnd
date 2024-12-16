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

/***/ "./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js":
/*!******************************************************************************!*\
  !*** ./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js ***!
  \******************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === \"object\" && \"object\" !== \"undefined\" ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  \"use strict\";\n\n  function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  }\n  function _defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n  function _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    Object.defineProperty(Constructor, \"prototype\", {\n      writable: false\n    });\n    return Constructor;\n  }\n  function _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n      constructor: {\n        value: subClass,\n        writable: true,\n        configurable: true\n      }\n    });\n    Object.defineProperty(subClass, \"prototype\", {\n      writable: false\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n  }\n  function _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {\n      return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n  }\n  function _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {\n      o.__proto__ = p;\n      return o;\n    };\n    return _setPrototypeOf(o, p);\n  }\n  function _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n      return true;\n    } catch (e) {\n      return false;\n    }\n  }\n  function _assertThisInitialized(self) {\n    if (self === void 0) {\n      throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n  }\n  function _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n      return call;\n    } else if (call !== void 0) {\n      throw new TypeError(\"Derived constructors may only return object or undefined\");\n    }\n    return _assertThisInitialized(self);\n  }\n  function _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n      var Super = _getPrototypeOf(Derived),\n        result;\n      if (hasNativeReflectConstruct) {\n        var NewTarget = _getPrototypeOf(this).constructor;\n        result = Reflect.construct(Super, arguments, NewTarget);\n      } else {\n        result = Super.apply(this, arguments);\n      }\n      return _possibleConstructorReturn(this, result);\n    };\n  }\n  function _superPropBase(object, property) {\n    while (!Object.prototype.hasOwnProperty.call(object, property)) {\n      object = _getPrototypeOf(object);\n      if (object === null) break;\n    }\n    return object;\n  }\n  function _get() {\n    if (typeof Reflect !== \"undefined\" && Reflect.get) {\n      _get = Reflect.get.bind();\n    } else {\n      _get = function _get(target, property, receiver) {\n        var base = _superPropBase(target, property);\n        if (!base) return;\n        var desc = Object.getOwnPropertyDescriptor(base, property);\n        if (desc.get) {\n          return desc.get.call(arguments.length < 3 ? target : receiver);\n        }\n        return desc.value;\n      };\n    }\n    return _get.apply(this, arguments);\n  }\n  var e = FormValidation.utils.classSet;\n  var t = FormValidation.utils.hasClass;\n  var n = FormValidation.plugins.Framework;\n  var l = function (_n) {\n    _inherits(l, _n);\n    var _super = _createSuper(l);\n    function l(e) {\n      var _this;\n      _classCallCheck(this, l);\n      _this = _super.call(this, Object.assign({}, {\n        eleInvalidClass: \"is-invalid\",\n        eleValidClass: \"is-valid\",\n        formClass: \"fv-plugins-bootstrap5\",\n        rowInvalidClass: \"fv-plugins-bootstrap5-row-invalid\",\n        rowPattern: /^(.*)(col|offset)(-(sm|md|lg|xl))*-[0-9]+(.*)$/,\n        rowSelector: \".row\",\n        rowValidClass: \"fv-plugins-bootstrap5-row-valid\"\n      }, e));\n      _this.eleValidatedHandler = _this.handleElementValidated.bind(_assertThisInitialized(_this));\n      return _this;\n    }\n    _createClass(l, [{\n      key: \"install\",\n      value: function install() {\n        _get(_getPrototypeOf(l.prototype), \"install\", this).call(this);\n        this.core.on(\"core.element.validated\", this.eleValidatedHandler);\n      }\n    }, {\n      key: \"uninstall\",\n      value: function uninstall() {\n        _get(_getPrototypeOf(l.prototype), \"install\", this).call(this);\n        this.core.off(\"core.element.validated\", this.eleValidatedHandler);\n      }\n    }, {\n      key: \"handleElementValidated\",\n      value: function handleElementValidated(n) {\n        var _l = n.element.getAttribute(\"type\");\n        if ((\"checkbox\" === _l || \"radio\" === _l) && n.elements.length > 1 && t(n.element, \"form-check-input\")) {\n          var _l5 = n.element.parentElement;\n          if (t(_l5, \"form-check\") && t(_l5, \"form-check-inline\")) {\n            e(_l5, {\n              \"is-invalid\": !n.valid,\n              \"is-valid\": n.valid\n            });\n          }\n        }\n      }\n    }, {\n      key: \"onIconPlaced\",\n      value: function onIconPlaced(n) {\n        e(n.element, {\n          \"fv-plugins-icon-input\": true\n        });\n        var _l3 = n.element.parentElement;\n        if (t(_l3, \"input-group\")) {\n          _l3.parentElement.insertBefore(n.iconElement, _l3.nextSibling);\n          if (n.element.nextElementSibling && t(n.element.nextElementSibling, \"input-group-text\")) {\n            e(n.iconElement, {\n              \"fv-plugins-icon-input-group\": true\n            });\n          }\n        }\n        var i = n.element.getAttribute(\"type\");\n        if (\"checkbox\" === i || \"radio\" === i) {\n          var _i = _l3.parentElement;\n          if (t(_l3, \"form-check\")) {\n            e(n.iconElement, {\n              \"fv-plugins-icon-check\": true\n            });\n            _l3.parentElement.insertBefore(n.iconElement, _l3.nextSibling);\n          } else if (t(_l3.parentElement, \"form-check\")) {\n            e(n.iconElement, {\n              \"fv-plugins-icon-check\": true\n            });\n            _i.parentElement.insertBefore(n.iconElement, _i.nextSibling);\n          }\n        }\n      }\n    }, {\n      key: \"onMessagePlaced\",\n      value: function onMessagePlaced(n) {\n        n.messageElement.classList.add(\"invalid-feedback\");\n        var _l4 = n.element.parentElement;\n        if (t(_l4, \"input-group\")) {\n          _l4.appendChild(n.messageElement);\n          e(_l4, {\n            \"has-validation\": true\n          });\n          return;\n        }\n        var i = n.element.getAttribute(\"type\");\n        if ((\"checkbox\" === i || \"radio\" === i) && t(n.element, \"form-check-input\") && t(_l4, \"form-check\") && !t(_l4, \"form-check-inline\")) {\n          n.elements[n.elements.length - 1].parentElement.appendChild(n.messageElement);\n        }\n      }\n    }]);\n    return l;\n  }(n);\n  return l;\n});\n\n//# sourceURL=webpack://Vuexy/./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});