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

/***/ "./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_TW.js":
/*!*********************************************************************!*\
  !*** ./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_TW.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === 'object' && \"object\" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  'use strict';\n\n  /**\n   * Traditional Chinese language package\n   * Translated by @tureki\n   */\n  var zh_TW = {\n    base64: {\n      default: '請輸入有效的Base64編碼'\n    },\n    between: {\n      default: '請輸入不小於 %s 且不大於 %s 的值',\n      notInclusive: '請輸入不小於等於 %s 且不大於等於 %s 的值'\n    },\n    bic: {\n      default: '請輸入有效的BIC商品編碼'\n    },\n    callback: {\n      default: '請輸入有效的值'\n    },\n    choice: {\n      between: '請選擇 %s 至 %s 個選項',\n      default: '請輸入有效的值',\n      less: '最少選擇 %s 個選項',\n      more: '最多選擇 %s 個選項'\n    },\n    color: {\n      default: '請輸入有效的元色碼'\n    },\n    creditCard: {\n      default: '請輸入有效的信用卡號碼'\n    },\n    cusip: {\n      default: '請輸入有效的CUSIP(美國證券庫斯普)號碼'\n    },\n    date: {\n      default: '請輸入有效的日期',\n      max: '請輸入 %s 或以前的日期',\n      min: '請輸入 %s 或之後的日期',\n      range: '請輸入 %s 至 %s 之間的日期'\n    },\n    different: {\n      default: '請輸入不同的值'\n    },\n    digits: {\n      default: '只能輸入數字'\n    },\n    ean: {\n      default: '請輸入有效的EAN商品編碼'\n    },\n    ein: {\n      default: '請輸入有效的EIN商品編碼'\n    },\n    emailAddress: {\n      default: '請輸入有效的EMAIL'\n    },\n    file: {\n      default: '請選擇有效的檔案'\n    },\n    greaterThan: {\n      default: '請輸入大於等於 %s 的值',\n      notInclusive: '請輸入大於 %s 的值'\n    },\n    grid: {\n      default: '請輸入有效的GRId編碼'\n    },\n    hex: {\n      default: '請輸入有效的16位元碼'\n    },\n    iban: {\n      countries: {\n        AD: '安道​​爾',\n        AE: '阿聯酋',\n        AL: '阿爾巴尼亞',\n        AO: '安哥拉',\n        AT: '奧地利',\n        AZ: '阿塞拜疆',\n        BA: '波斯尼亞和黑塞哥維那',\n        BE: '比利時',\n        BF: '布基納法索',\n        BG: '保加利亞',\n        BH: '巴林',\n        BI: '布隆迪',\n        BJ: '貝寧',\n        BR: '巴西',\n        CH: '瑞士',\n        CI: '象牙海岸',\n        CM: '喀麥隆',\n        CR: '哥斯達黎加',\n        CV: '佛得角',\n        CY: '塞浦路斯',\n        CZ: '捷克共和國',\n        DE: '德國',\n        DK: '丹麥',\n        DO: '多明尼加共和國',\n        DZ: '阿爾及利亞',\n        EE: '愛沙尼亞',\n        ES: '西班牙',\n        FI: '芬蘭',\n        FO: '法羅群島',\n        FR: '法國',\n        GB: '英國',\n        GE: '格魯吉亞',\n        GI: '直布羅陀',\n        GL: '格陵蘭島',\n        GR: '希臘',\n        GT: '危地馬拉',\n        HR: '克羅地亞',\n        HU: '匈牙利',\n        IE: '愛爾蘭',\n        IL: '以色列',\n        IR: '伊朗',\n        IS: '冰島',\n        IT: '意大利',\n        JO: '約旦',\n        KW: '科威特',\n        KZ: '哈薩克斯坦',\n        LB: '黎巴嫩',\n        LI: '列支敦士登',\n        LT: '立陶宛',\n        LU: '盧森堡',\n        LV: '拉脫維亞',\n        MC: '摩納哥',\n        MD: '摩爾多瓦',\n        ME: '蒙特內哥羅',\n        MG: '馬達加斯加',\n        MK: '馬其頓',\n        ML: '馬里',\n        MR: '毛里塔尼亞',\n        MT: '馬耳他',\n        MU: '毛里求斯',\n        MZ: '莫桑比克',\n        NL: '荷蘭',\n        NO: '挪威',\n        PK: '巴基斯坦',\n        PL: '波蘭',\n        PS: '巴勒斯坦',\n        PT: '葡萄牙',\n        QA: '卡塔爾',\n        RO: '羅馬尼亞',\n        RS: '塞爾維亞',\n        SA: '沙特阿拉伯',\n        SE: '瑞典',\n        SI: '斯洛文尼亞',\n        SK: '斯洛伐克',\n        SM: '聖馬力諾',\n        SN: '塞內加爾',\n        TL: '東帝汶',\n        TN: '突尼斯',\n        TR: '土耳其',\n        VG: '英屬維爾京群島',\n        XK: '科索沃共和國'\n      },\n      country: '請輸入有效的 %s 國家的IBAN(國際銀行賬戶)號碼',\n      default: '請輸入有效的IBAN(國際銀行賬戶)號碼'\n    },\n    id: {\n      countries: {\n        BA: '波赫',\n        BG: '保加利亞',\n        BR: '巴西',\n        CH: '瑞士',\n        CL: '智利',\n        CN: '中國',\n        CZ: '捷克共和國',\n        DK: '丹麥',\n        EE: '愛沙尼亞',\n        ES: '西班牙',\n        FI: '芬蘭',\n        HR: '克羅地亞',\n        IE: '愛爾蘭',\n        IS: '冰島',\n        LT: '立陶宛',\n        LV: '拉脫維亞',\n        ME: '蒙特內哥羅',\n        MK: '馬其頓',\n        NL: '荷蘭',\n        PL: '波蘭',\n        RO: '羅馬尼亞',\n        RS: '塞爾維亞',\n        SE: '瑞典',\n        SI: '斯洛文尼亞',\n        SK: '斯洛伐克',\n        SM: '聖馬力諾',\n        TH: '泰國',\n        TR: '土耳其',\n        ZA: '南非'\n      },\n      country: '請輸入有效的 %s 身份證字號',\n      default: '請輸入有效的身份證字號'\n    },\n    identical: {\n      default: '請輸入相同的值'\n    },\n    imei: {\n      default: '請輸入有效的IMEI(手機序列號)'\n    },\n    imo: {\n      default: '請輸入有效的國際海事組織(IMO)號碼'\n    },\n    integer: {\n      default: '請輸入有效的整數'\n    },\n    ip: {\n      default: '請輸入有效的IP位址',\n      ipv4: '請輸入有效的IPv4位址',\n      ipv6: '請輸入有效的IPv6位址'\n    },\n    isbn: {\n      default: '請輸入有效的ISBN(國際標準書號)'\n    },\n    isin: {\n      default: '請輸入有效的ISIN(國際證券號碼)'\n    },\n    ismn: {\n      default: '請輸入有效的ISMN(國際標準音樂編號)'\n    },\n    issn: {\n      default: '請輸入有效的ISSN(國際標準期刊號)'\n    },\n    lessThan: {\n      default: '請輸入小於等於 %s 的值',\n      notInclusive: '請輸入小於 %s 的值'\n    },\n    mac: {\n      default: '請輸入有效的MAC位址'\n    },\n    meid: {\n      default: '請輸入有效的MEID(行動設備識別碼)'\n    },\n    notEmpty: {\n      default: '請填寫必填欄位'\n    },\n    numeric: {\n      default: '請輸入有效的數字(含浮點數)'\n    },\n    phone: {\n      countries: {\n        AE: '阿聯酋',\n        BG: '保加利亞',\n        BR: '巴西',\n        CN: '中国',\n        CZ: '捷克共和國',\n        DE: '德國',\n        DK: '丹麥',\n        ES: '西班牙',\n        FR: '法國',\n        GB: '英國',\n        IN: '印度',\n        MA: '摩洛哥',\n        NL: '荷蘭',\n        PK: '巴基斯坦',\n        RO: '罗马尼亚',\n        RU: '俄羅斯',\n        SK: '斯洛伐克',\n        TH: '泰國',\n        US: '美國',\n        VE: '委内瑞拉'\n      },\n      country: '請輸入有效的 %s 國家的電話號碼',\n      default: '請輸入有效的電話號碼'\n    },\n    promise: {\n      default: '請輸入有效的值'\n    },\n    regexp: {\n      default: '請輸入符合正規表示式所限制的值'\n    },\n    remote: {\n      default: '請輸入有效的值'\n    },\n    rtn: {\n      default: '請輸入有效的RTN號碼'\n    },\n    sedol: {\n      default: '請輸入有效的SEDOL代碼'\n    },\n    siren: {\n      default: '請輸入有效的SIREN號碼'\n    },\n    siret: {\n      default: '請輸入有效的SIRET號碼'\n    },\n    step: {\n      default: '請輸入 %s 的倍數'\n    },\n    stringCase: {\n      default: '只能輸入小寫字母',\n      upper: '只能輸入大寫字母'\n    },\n    stringLength: {\n      between: '請輸入 %s 至 %s 個字',\n      default: '請輸入符合長度限制的值',\n      less: '請輸入小於 %s 個字',\n      more: '請輸入大於 %s 個字'\n    },\n    uri: {\n      default: '請輸入一個有效的鏈接'\n    },\n    uuid: {\n      default: '請輸入有效的UUID',\n      version: '請輸入版本 %s 的UUID'\n    },\n    vat: {\n      countries: {\n        AT: '奧地利',\n        BE: '比利時',\n        BG: '保加利亞',\n        BR: '巴西',\n        CH: '瑞士',\n        CY: '塞浦路斯',\n        CZ: '捷克共和國',\n        DE: '德國',\n        DK: '丹麥',\n        EE: '愛沙尼亞',\n        EL: '希臘',\n        ES: '西班牙',\n        FI: '芬蘭',\n        FR: '法語',\n        GB: '英國',\n        GR: '希臘',\n        HR: '克羅地亞',\n        HU: '匈牙利',\n        IE: '愛爾蘭',\n        IS: '冰島',\n        IT: '意大利',\n        LT: '立陶宛',\n        LU: '盧森堡',\n        LV: '拉脫維亞',\n        MT: '馬耳他',\n        NL: '荷蘭',\n        NO: '挪威',\n        PL: '波蘭',\n        PT: '葡萄牙',\n        RO: '羅馬尼亞',\n        RS: '塞爾維亞',\n        RU: '俄羅斯',\n        SE: '瑞典',\n        SI: '斯洛文尼亞',\n        SK: '斯洛伐克',\n        VE: '委内瑞拉',\n        ZA: '南非'\n      },\n      country: '請輸入有效的 %s 國家的VAT(增值税)',\n      default: '請輸入有效的VAT(增值税)'\n    },\n    vin: {\n      default: '請輸入有效的VIN(車輛識別號碼)'\n    },\n    zipCode: {\n      countries: {\n        AT: '奧地利',\n        BG: '保加利亞',\n        BR: '巴西',\n        CA: '加拿大',\n        CH: '瑞士',\n        CZ: '捷克共和國',\n        DE: '德國',\n        DK: '丹麥',\n        ES: '西班牙',\n        FR: '法國',\n        GB: '英國',\n        IE: '愛爾蘭',\n        IN: '印度',\n        IT: '意大利',\n        MA: '摩洛哥',\n        NL: '荷蘭',\n        PL: '波蘭',\n        PT: '葡萄牙',\n        RO: '羅馬尼亞',\n        RU: '俄羅斯',\n        SE: '瑞典',\n        SG: '新加坡',\n        SK: '斯洛伐克',\n        US: '美國'\n      },\n      country: '請輸入有效的 %s 國家的郵政編碼',\n      default: '請輸入有效的郵政編碼'\n    }\n  };\n  return zh_TW;\n});\n\n//# sourceURL=webpack://Vuexy/./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_TW.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/vendor/libs/formvalidation/dist/js/locales/zh_TW.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});