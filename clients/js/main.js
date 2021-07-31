/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/js/attendance.js":
/*!***********************************!*\
  !*** ./frontend/js/attendance.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\nvar timeStartBtn = document.querySelector(\".homeTimeStartBtn\");\nvar checkedIn = document.querySelector(\".listBoard-checkBox\");\nvar timeFinishBtn = document.querySelector(\".homeTimeFinishBtn\");\nvar timeBegin; //time Start button\n\nfunction recordTimeHandler() {\n  var currentTime = new Date();\n  timeBegin = currentTime;\n  timeStartBtn.classList.add(\"hidden\");\n  console.log(timeBegin); //this btn appear again when reload. \n}\n\n;\n\nif (timeStartBtn) {\n  timeStartBtn.addEventListener(\"click\", recordTimeHandler);\n} //indivisual checkin btn\n\n\nif (checkedIn) {\n  checkedIn.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    var id = e.target.value;\n    var numberOfAbsence = 0;\n    var earnedMoney = 0;\n\n    if (e.target.className === \"checkBox-Absence\") {\n      console.log(\"absence\");\n      numberOfAbsence = 1; //numberOfAbsence plus one\n      //numberOfMeeting pluse one\n      //no earndmoney \n    }\n\n    if (e.target.className === \"checkBox-checkIn\") {\n      console.log(\"checkin\");\n      earnedMoney = 5000; //const fullearndMoney = entryFee의 10%\n      // earnedMoney = fullearndmoney\n      // if(30분안쪽){\n      //     earnedMoney = fullearndmoney-1000;\n      // } else if(30분에서 1시간 안쪽){\n      //     earnedMoney = fullearndmoney-2000;\n      // } else if (1시간 이상){\n      //     earnedMoney = fullearndmoney-3000;\n      // }\n    }\n\n    console.log(numberOfAbsence);\n    console.log(earnedMoney);\n    console.log(e.target.value);\n    node_fetch__WEBPACK_IMPORTED_MODULE_0___default()('/', {\n      method: 'post',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        id: id,\n        numberOfAbsence: numberOfAbsence,\n        earnedMoney: earnedMoney\n      })\n    });\n  });\n}\n\n; //Done button\n\nfunction attendanceDoneHandler(e) {\n  // .listBoard-checkBox에 li가 있으면 warning.\n  e.preventDefault();\n  timeStartBtn.classList.remove(\"hidden\");\n  timeBegin = \"\"; // console.log(timeBegin);\n  //     await fetch('http://localhost:5000', {\n  //     method: 'post',\n  //     body: JSON.stringify({\n  //         name: \"Soooo\",\n  //     })\n  //   })\n  //   .then(res => res.json())\n  //   .then(res => {\n  //     if (res.success) {\n  //         alert(\"저장 완료\");\n  //     }\n  //   })\n}\n\nif (timeFinishBtn) {\n  timeFinishBtn.addEventListener(\"click\", attendanceDoneHandler);\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/attendance.js?");

/***/ }),

/***/ "./frontend/js/bandShare.js":
/*!**********************************!*\
  !*** ./frontend/js/bandShare.js ***!
  \**********************************/
/***/ (() => {

eval("var btn = document.querySelector(\".bandShareBtn\");\nvar chartList = document.querySelectorAll(\".chartSaved\"); // console.log(chartList);\n\nvar chart = [];\nchartList.forEach(function (li) {\n  var name = li.children[0].innerHTML;\n  var savedText = li.children[1].innerHTML; // let entryFee = li.children[1].innerHTML;\n  // let NumberOfAbsence = li.children[2].innerHTML;\n  // let extraFee = li.children[3].innerHTML;\n  // let earn = li.children[4].innerHTML;\n  // let pay = li.children[5].innerHTML;\n  // let pushList = `${name} ${entryFee}:${NumberOfAbsence} ${extraFee} ${earn} ${pay}.`;\n\n  var pushList = name + savedText;\n  chart.push(pushList);\n});\nvar textChart = chart.toString();\n\nfunction handleBandShare() {\n  window.open(\"https://band.us/plugin/share?body=\".concat(textChart, \"&route=http://localhost:5000/saved\"), \"band-share\", \"width=120, height=240, resizable=no\");\n}\n\n;\n\nif (btn) {\n  btn.addEventListener(\"click\", handleBandShare);\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/bandShare.js?");

/***/ }),

/***/ "./frontend/js/chart.js":
/*!******************************!*\
  !*** ./frontend/js/chart.js ***!
  \******************************/
/***/ (() => {

eval("console.log(\"chart sheet work?\"); //numberOfAbsence가 3이상이면 추가\n//numberOfAbsence가 2이하이면 할인 \n//numberOfAbsence가 2이하이지만 entryFee가 50000이면 동결\n//entryFee에서 totalEarnedMoney를 차감한 뒤 extraFeeOption를 합산 한 값이 +이면 입금. -이면 환금.\n\n//# sourceURL=webpack://noodasim/./frontend/js/chart.js?");

/***/ }),

/***/ "./frontend/js/main.js":
/*!*****************************!*\
  !*** ./frontend/js/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./frontend/scss/style.scss\");\n/* harmony import */ var _attendance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance */ \"./frontend/js/attendance.js\");\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chart */ \"./frontend/js/chart.js\");\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chart__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bandShare */ \"./frontend/js/bandShare.js\");\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_bandShare__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n // console.log(\"connecting\");\n\n//# sourceURL=webpack://noodasim/./frontend/js/main.js?");

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

"use strict";
eval(" // ref: https://github.com/tc39/proposal-global\n\nvar getGlobal = function getGlobal() {\n  // the only reliable means to get the global object is\n  // `Function('return this')()`\n  // However, this causes CSP violations in Chrome apps.\n  if (typeof self !== 'undefined') {\n    return self;\n  }\n\n  if (typeof window !== 'undefined') {\n    return window;\n  }\n\n  if (typeof global !== 'undefined') {\n    return global;\n  }\n\n  throw new Error('unable to locate global object');\n};\n\nvar global = getGlobal();\nmodule.exports = exports = global.fetch; // Needed for TypeScript and Webpack.\n\nif (global.fetch) {\n  exports.default = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://noodasim/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./frontend/scss/style.scss":
/*!**********************************!*\
  !*** ./frontend/scss/style.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://noodasim/./frontend/scss/style.scss?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./frontend/js/main.js");
/******/ 	
/******/ })()
;