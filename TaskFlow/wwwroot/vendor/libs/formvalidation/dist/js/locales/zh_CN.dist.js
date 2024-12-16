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

/***/ "./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_CN.js":
/*!*********************************************************************!*\
  !*** ./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_CN.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === 'object' && \"object\" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  'use strict';\n\n  /**\n   * Simplified Chinese language package\n   * Translated by @shamiao\n   */\n  var zh_CN = {\n    base64: {\n      default: '请输入有效的Base64编码'\n    },\n    between: {\n      default: '请输入在 %s 和 %s 之间的数值',\n      notInclusive: '请输入在 %s 和 %s 之间(不含两端)的数值'\n    },\n    bic: {\n      default: '请输入有效的BIC商品编码'\n    },\n    callback: {\n      default: '请输入有效的值'\n    },\n    choice: {\n      between: '请选择 %s 至 %s 个选项',\n      default: '请输入有效的值',\n      less: '请至少选中 %s 个选项',\n      more: '最多只能选中 %s 个选项'\n    },\n    color: {\n      default: '请输入有效的颜色值'\n    },\n    creditCard: {\n      default: '请输入有效的信用卡号码'\n    },\n    cusip: {\n      default: '请输入有效的美国CUSIP代码'\n    },\n    date: {\n      default: '请输入有效的日期',\n      max: '请输入 %s 或以前的日期',\n      min: '请输入 %s 或之后的日期',\n      range: '请输入 %s 和 %s 之间的日期'\n    },\n    different: {\n      default: '请输入不同的值'\n    },\n    digits: {\n      default: '请输入有效的数字'\n    },\n    ean: {\n      default: '请输入有效的EAN商品编码'\n    },\n    ein: {\n      default: '请输入有效的EIN商品编码'\n    },\n    emailAddress: {\n      default: '请输入有效的邮件地址'\n    },\n    file: {\n      default: '请选择有效的文件'\n    },\n    greaterThan: {\n      default: '请输入大于等于 %s 的数值',\n      notInclusive: '请输入大于 %s 的数值'\n    },\n    grid: {\n      default: '请输入有效的GRId编码'\n    },\n    hex: {\n      default: '请输入有效的16进制数'\n    },\n    iban: {\n      countries: {\n        AD: '安道​​尔',\n        AE: '阿联酋',\n        AL: '阿尔巴尼亚',\n        AO: '安哥拉',\n        AT: '奥地利',\n        AZ: '阿塞拜疆',\n        BA: '波斯尼亚和黑塞哥维那',\n        BE: '比利时',\n        BF: '布基纳法索',\n        BG: '保加利亚',\n        BH: '巴林',\n        BI: '布隆迪',\n        BJ: '贝宁',\n        BR: '巴西',\n        CH: '瑞士',\n        CI: '科特迪瓦',\n        CM: '喀麦隆',\n        CR: '哥斯达黎加',\n        CV: '佛得角',\n        CY: '塞浦路斯',\n        CZ: '捷克共和国',\n        DE: '德国',\n        DK: '丹麦',\n        DO: '多米尼加共和国',\n        DZ: '阿尔及利亚',\n        EE: '爱沙尼亚',\n        ES: '西班牙',\n        FI: '芬兰',\n        FO: '法罗群岛',\n        FR: '法国',\n        GB: '英国',\n        GE: '格鲁吉亚',\n        GI: '直布罗陀',\n        GL: '格陵兰岛',\n        GR: '希腊',\n        GT: '危地马拉',\n        HR: '克罗地亚',\n        HU: '匈牙利',\n        IE: '爱尔兰',\n        IL: '以色列',\n        IR: '伊朗',\n        IS: '冰岛',\n        IT: '意大利',\n        JO: '约旦',\n        KW: '科威特',\n        KZ: '哈萨克斯坦',\n        LB: '黎巴嫩',\n        LI: '列支敦士登',\n        LT: '立陶宛',\n        LU: '卢森堡',\n        LV: '拉脱维亚',\n        MC: '摩纳哥',\n        MD: '摩尔多瓦',\n        ME: '黑山',\n        MG: '马达加斯加',\n        MK: '马其顿',\n        ML: '马里',\n        MR: '毛里塔尼亚',\n        MT: '马耳他',\n        MU: '毛里求斯',\n        MZ: '莫桑比克',\n        NL: '荷兰',\n        NO: '挪威',\n        PK: '巴基斯坦',\n        PL: '波兰',\n        PS: '巴勒斯坦',\n        PT: '葡萄牙',\n        QA: '卡塔尔',\n        RO: '罗马尼亚',\n        RS: '塞尔维亚',\n        SA: '沙特阿拉伯',\n        SE: '瑞典',\n        SI: '斯洛文尼亚',\n        SK: '斯洛伐克',\n        SM: '圣马力诺',\n        SN: '塞内加尔',\n        TL: '东帝汶',\n        TN: '突尼斯',\n        TR: '土耳其',\n        VG: '英属维尔京群岛',\n        XK: '科索沃共和国'\n      },\n      country: '请输入有效的 %s 国家或地区的IBAN(国际银行账户)号码',\n      default: '请输入有效的IBAN(国际银行账户)号码'\n    },\n    id: {\n      countries: {\n        BA: '波黑',\n        BG: '保加利亚',\n        BR: '巴西',\n        CH: '瑞士',\n        CL: '智利',\n        CN: '中国',\n        CZ: '捷克共和国',\n        DK: '丹麦',\n        EE: '爱沙尼亚',\n        ES: '西班牙',\n        FI: '芬兰',\n        HR: '克罗地亚',\n        IE: '爱尔兰',\n        IS: '冰岛',\n        LT: '立陶宛',\n        LV: '拉脱维亚',\n        ME: '黑山',\n        MK: '马其顿',\n        NL: '荷兰',\n        PL: '波兰',\n        RO: '罗马尼亚',\n        RS: '塞尔维亚',\n        SE: '瑞典',\n        SI: '斯洛文尼亚',\n        SK: '斯洛伐克',\n        SM: '圣马力诺',\n        TH: '泰国',\n        TR: '土耳其',\n        ZA: '南非'\n      },\n      country: '请输入有效的 %s 国家或地区的身份证件号码',\n      default: '请输入有效的身份证件号码'\n    },\n    identical: {\n      default: '请输入相同的值'\n    },\n    imei: {\n      default: '请输入有效的IMEI(手机串号)'\n    },\n    imo: {\n      default: '请输入有效的国际海事组织(IMO)号码'\n    },\n    integer: {\n      default: '请输入有效的整数值'\n    },\n    ip: {\n      default: '请输入有效的IP地址',\n      ipv4: '请输入有效的IPv4地址',\n      ipv6: '请输入有效的IPv6地址'\n    },\n    isbn: {\n      default: '请输入有效的ISBN(国际标准书号)'\n    },\n    isin: {\n      default: '请输入有效的ISIN(国际证券编码)'\n    },\n    ismn: {\n      default: '请输入有效的ISMN(印刷音乐作品编码)'\n    },\n    issn: {\n      default: '请输入有效的ISSN(国际标准杂志书号)'\n    },\n    lessThan: {\n      default: '请输入小于等于 %s 的数值',\n      notInclusive: '请输入小于 %s 的数值'\n    },\n    mac: {\n      default: '请输入有效的MAC物理地址'\n    },\n    meid: {\n      default: '请输入有效的MEID(移动设备识别码)'\n    },\n    notEmpty: {\n      default: '请填写必填项目'\n    },\n    numeric: {\n      default: '请输入有效的数值，允许小数'\n    },\n    phone: {\n      countries: {\n        AE: '阿联酋',\n        BG: '保加利亚',\n        BR: '巴西',\n        CN: '中国',\n        CZ: '捷克共和国',\n        DE: '德国',\n        DK: '丹麦',\n        ES: '西班牙',\n        FR: '法国',\n        GB: '英国',\n        IN: '印度',\n        MA: '摩洛哥',\n        NL: '荷兰',\n        PK: '巴基斯坦',\n        RO: '罗马尼亚',\n        RU: '俄罗斯',\n        SK: '斯洛伐克',\n        TH: '泰国',\n        US: '美国',\n        VE: '委内瑞拉'\n      },\n      country: '请输入有效的 %s 国家或地区的电话号码',\n      default: '请输入有效的电话号码'\n    },\n    promise: {\n      default: '请输入有效的值'\n    },\n    regexp: {\n      default: '请输入符合正则表达式限制的值'\n    },\n    remote: {\n      default: '请输入有效的值'\n    },\n    rtn: {\n      default: '请输入有效的RTN号码'\n    },\n    sedol: {\n      default: '请输入有效的SEDOL代码'\n    },\n    siren: {\n      default: '请输入有效的SIREN号码'\n    },\n    siret: {\n      default: '请输入有效的SIRET号码'\n    },\n    step: {\n      default: '请输入在基础值上，增加 %s 的整数倍的数值'\n    },\n    stringCase: {\n      default: '只能输入小写字母',\n      upper: '只能输入大写字母'\n    },\n    stringLength: {\n      between: '请输入 %s 至 %s 个字符',\n      default: '请输入符合长度限制的值',\n      less: '最多只能输入 %s 个字符',\n      more: '需要输入至少 %s 个字符'\n    },\n    uri: {\n      default: '请输入一个有效的URL地址'\n    },\n    uuid: {\n      default: '请输入有效的UUID',\n      version: '请输入版本 %s 的UUID'\n    },\n    vat: {\n      countries: {\n        AT: '奥地利',\n        BE: '比利时',\n        BG: '保加利亚',\n        BR: '巴西',\n        CH: '瑞士',\n        CY: '塞浦路斯',\n        CZ: '捷克共和国',\n        DE: '德国',\n        DK: '丹麦',\n        EE: '爱沙尼亚',\n        EL: '希腊',\n        ES: '西班牙',\n        FI: '芬兰',\n        FR: '法语',\n        GB: '英国',\n        GR: '希腊',\n        HR: '克罗地亚',\n        HU: '匈牙利',\n        IE: '爱尔兰',\n        IS: '冰岛',\n        IT: '意大利',\n        LT: '立陶宛',\n        LU: '卢森堡',\n        LV: '拉脱维亚',\n        MT: '马耳他',\n        NL: '荷兰',\n        NO: '挪威',\n        PL: '波兰',\n        PT: '葡萄牙',\n        RO: '罗马尼亚',\n        RS: '塞尔维亚',\n        RU: '俄罗斯',\n        SE: '瑞典',\n        SI: '斯洛文尼亚',\n        SK: '斯洛伐克',\n        VE: '委内瑞拉',\n        ZA: '南非'\n      },\n      country: '请输入有效的 %s 国家或地区的VAT(税号)',\n      default: '请输入有效的VAT(税号)'\n    },\n    vin: {\n      default: '请输入有效的VIN(美国车辆识别号码)'\n    },\n    zipCode: {\n      countries: {\n        AT: '奥地利',\n        BG: '保加利亚',\n        BR: '巴西',\n        CA: '加拿大',\n        CH: '瑞士',\n        CZ: '捷克共和国',\n        DE: '德国',\n        DK: '丹麦',\n        ES: '西班牙',\n        FR: '法国',\n        GB: '英国',\n        IE: '爱尔兰',\n        IN: '印度',\n        IT: '意大利',\n        MA: '摩洛哥',\n        NL: '荷兰',\n        PL: '波兰',\n        PT: '葡萄牙',\n        RO: '罗马尼亚',\n        RU: '俄罗斯',\n        SE: '瑞典',\n        SG: '新加坡',\n        SK: '斯洛伐克',\n        US: '美国'\n      },\n      country: '请输入有效的 %s 国家或地区的邮政编码',\n      default: '请输入有效的邮政编码'\n    }\n  };\n  return zh_CN;\n});\n\n//# sourceURL=webpack://Vuexy/./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_CN.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_CN.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});