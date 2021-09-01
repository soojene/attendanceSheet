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

/***/ "./src/frontend/js/bandShare.js":
/*!**************************************!*\
  !*** ./src/frontend/js/bandShare.js ***!
  \**************************************/
/***/ (() => {

eval("var btn = document.querySelector(\".bandShareBtn\");\nvar chartList = document.querySelectorAll(\".chartSaved\");\nvar chart = [];\nchartList.forEach(function (li) {\n  var name = li.children[0].innerHTML;\n  var savedText = li.children[1].innerHTML;\n  var pushList = name + savedText;\n  chart.push(pushList);\n});\nvar textChart = chart.toString();\n\nfunction handleBandShare() {\n  window.open(\"https://band.us/plugin/share?body=\".concat(textChart, \"&route=http://localhost:5000/saved\"), \"band-share\", \"width=125, height=240, resizable=no\");\n}\n\n;\n\nif (btn) {\n  btn.addEventListener(\"click\", handleBandShare);\n} //,가 나오면 다음 라인으로 넘겨서 text박스에 나오도록\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/bandShare.js?");

/***/ }),

/***/ "./src/frontend/js/checking.js":
/*!*************************************!*\
  !*** ./src/frontend/js/checking.js ***!
  \*************************************/
/***/ (() => {

eval("var startBtn = document.querySelector(\".homeTimeStartBtn\");\nvar startSheet = document.querySelector(\".homeAttendanceSheet-start\");\nvar startUlBox = document.querySelector(\".listBoard-checkBox\");\nvar finishSheet = document.querySelector(\".homeAttendanceSheet-finish\");\nvar finishUlBox = document.querySelector(\".listBoard-checkedBox\");\nvar finishBtn = document.querySelector(\".homeTimeFinishBtn\");\nvar nth;\nvar numberOfChecklist = 0;\nvar timeBegin;\nvar startCounting = false;\nvar id;\nvar clickedMember;\nvar entryFee;\nvar nthMeeting; //functions\n\nfunction startBtnSetting(nth) {\n  if (nth >= 11) {\n    startBtn.innerText = \"\\u26D4\\uFE0F 10\\uD68C \\uB2E4 \\uD588\\uC5B4\\uC720. \\uC785\\uAE08 \\uD655\\uC778 \\uD6C4 \\uB2E4\\uC2DC \\uCD9C\\uCCB5\\uD560 \\uC218 \\uC788\\uC5B4\\uC720\";\n  } else if (nth < 11) {\n    startBtn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uC2A4\\uB530\\uB728\");\n  }\n}\n\n;\n\nfunction listSetting(ulBox, whichOne) {\n  var li = ulBox.querySelectorAll(\"li\");\n\n  if (whichOne) {\n    li.forEach(function (list) {\n      if (list.dataset.nthmeeting <= nth) {\n        list.classList.add(\"show\");\n        numberOfChecklist += 1;\n      }\n    });\n  } else {\n    li.forEach(function (list) {\n      if (list.dataset.nthmeeting > nth) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        list.childNodes[0].innerText = \"\".concat(list.dataset.name, \"(\").concat(list.dataset.nthmeeting - 1, \"\\uD68C\\uCC28 \\uCDE8\\uC18C)\");\n        div.innerText = \"\".concat(list.dataset.nthofabsence, \"\\uD68C \\uACB0\\uC11D.\");\n        list.classList.add(\"show\");\n      }\n    });\n  }\n}\n\nfunction varialbesControll(e, numb) {\n  id = e.target.value;\n  clickedMember = e.target.parentNode;\n  entryFee = parseInt(e.target.dataset.entryfee);\n  nthMeeting = numb;\n}\n\n;\n\nfunction showingListHandler(id, ulBox, fromcheckBox) {\n  var lists = ulBox.querySelectorAll(\"li\");\n  lists.forEach(function (list) {\n    if (list.childNodes[0].attributes.value.value === id) {\n      if (fromcheckBox) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        div.innerText = fromcheckBox;\n      }\n\n      list.classList.add(\"show\");\n    }\n  });\n}\n\n;\n\nfunction postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee) {\n  fetch('/', {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      id: id,\n      numberOfAbsence: numberOfAbsence,\n      earnedMoney: earnedMoney,\n      nthMeeting: nthMeeting,\n      entryFee: entryFee\n    })\n  });\n}\n\n; //boxs\n\nif (startBtn) {\n  nth = startBtn.dataset.nth;\n  startBtnSetting(startBtn.dataset.nth);\n  startBtn.addEventListener(\"click\", function (e) {\n    if (nth >= 11) {\n      alert(\"10회차 출첵한 멤머가 있어요. 입금확인 후 출첵할 수 있어요.\");\n      return;\n    } // if (timeBegin !== undefined && apple.length !== numbOfApple){\n    //     alert(\"체크된 멤버가 이미 있는데 시간취소한다고? 체크된 멤버를 취소하던, 출첵을 마저 끝내고 시간취소를 하세여\");\n    //     return;\n    // };\n\n\n    var btn = e.target;\n    btn.classList.toggle(\"toggle\");\n\n    if (timeBegin === undefined) {\n      var currentTime = new Date();\n      timeBegin = currentTime;\n      btn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uCDE8\\uC18C\");\n      startCounting = true;\n    } else {\n      timeBegin = undefined;\n      btn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uC7AC\\uC2DC\\uC791\");\n      startCounting = false;\n    }\n  });\n}\n\nif (startUlBox) {\n  nth = startBtn.dataset.nth;\n  listSetting(startUlBox, true);\n  startUlBox.addEventListener(\"click\", function (e) {\n    if (timeBegin === undefined) {\n      alert(\"didn't click startBtn\");\n      return;\n    }\n\n    ;\n\n    if (e.target.tagName !== \"BUTTON\") {\n      console.log(\"it's not btn\");\n      return;\n    }\n\n    ;\n    varialbesControll(e, 1);\n    clickedMember.classList.remove(\"show\");\n    numberOfChecklist -= 1;\n    var checkinTime = new Date();\n    var timeDiff = checkinTime.getTime() - timeBegin.getTime();\n    var timeDifferentBySecond = timeDiff / 1000;\n    var minutes = Math.floor(timeDifferentBySecond);\n\n    if (timeDifferentBySecond < 60) {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond), \"\\uCD08\");\n    } else {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond / 60), \"\\uBD84\");\n    }\n\n    var numberOfAbsence = 0;\n    var earnedMoney = 0;\n\n    if (e.target.className === \"checkBox-Absence\") {\n      console.log(\"absence\");\n      numberOfAbsence = 1;\n      var absenceNumb = parseInt(e.target.dataset.numberofabsence) + 1;\n      var AbsenInnerTexts = \"\\uACB0\\uC11D: \".concat(absenceNumb, \"\\uD68C.\");\n      showingListHandler(id, finishUlBox, AbsenInnerTexts);\n    } else if (e.target.className === \"checkBox-checkIn\") {\n      console.log(\"checkin\");\n\n      if (timeDifferentBySecond <= 3) {\n        earnedMoney = entryFee * 0.1;\n        console.log(\"3초 이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8) {\n        earnedMoney = entryFee * 0.1 - 1000;\n        console.log(\"3초 초과 8초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13) {\n        earnedMoney = entryFee * 0.1 - 2000;\n        console.log(\"8초 초과 13초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 13) {\n        earnedMoney = entryFee * 0.1 - 3000;\n        console.log(\"13초 초과:\", earnedMoney);\n      }\n\n      var checkInnerTexts = \"\\uC2DC\\uC791 \".concat(minutes, \"\\uD6C4 \\uCD9C\\uC11D: \").concat(earnedMoney, \"\\uC6D0 \\uC801\\uB9BD\");\n      showingListHandler(id, finishUlBox, checkInnerTexts);\n    }\n\n    ;\n    postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee);\n  });\n}\n\n;\n\nif (finishUlBox) {\n  listSetting(finishUlBox, false);\n  finishUlBox.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    varialbesControll(e, -1);\n    clickedMember.classList.remove(\"show\");\n    numberOfChecklist += 1;\n    showingListHandler(id, startUlBox);\n    postFetch(id, 0, 0, nthMeeting, entryFee);\n  });\n}\n\n;\n\nif (finishBtn) {\n  finishBtn.addEventListener(\"click\", function (e) {\n    if (numberOfChecklist !== 0) {\n      e.preventDefault();\n      alert(\"all members are not checked\");\n      return;\n    } // timeBegin = undefined;\n    // console.log(timeBegin);\n\n  });\n}\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/checking.js?");

/***/ }),

/***/ "./src/frontend/js/fetchDatas.js":
/*!***************************************!*\
  !*** ./src/frontend/js/fetchDatas.js ***!
  \***************************************/
/***/ (() => {

eval("var fetchBtn = document.querySelector(\".goFetch\");\nvar array;\n\nif (fetchBtn) {\n  function bring() {\n    console.log(\"clicked\");\n    fetch(\"http://localhost:5000/goFetch\").then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      array = data.members;\n      console.log(array);\n    });\n  }\n\n  fetchBtn.addEventListener(\"click\", bring);\n}\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/fetchDatas.js?");

/***/ }),

/***/ "./src/frontend/js/main.js":
/*!*********************************!*\
  !*** ./src/frontend/js/main.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/frontend/scss/style.scss\");\n/* harmony import */ var _fetchDatas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchDatas */ \"./src/frontend/js/fetchDatas.js\");\n/* harmony import */ var _fetchDatas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fetchDatas__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _checking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checking */ \"./src/frontend/js/checking.js\");\n/* harmony import */ var _checking__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_checking__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _resetRollCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resetRollCall */ \"./src/frontend/js/resetRollCall.js\");\n/* harmony import */ var _resetRollCall__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_resetRollCall__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bandShare */ \"./src/frontend/js/bandShare.js\");\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_bandShare__WEBPACK_IMPORTED_MODULE_4__);\n // import \"./attendance\";\n\n\n\n\n\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/main.js?");

/***/ }),

/***/ "./src/frontend/js/resetRollCall.js":
/*!******************************************!*\
  !*** ./src/frontend/js/resetRollCall.js ***!
  \******************************************/
/***/ (() => {

eval("var savedPage = document.querySelector(\".chartBox-total\");\n\nif (savedPage) {\n  var resetBtn = document.querySelectorAll(\".resetCallBtn\");\n  resetBtn.forEach(function (btn) {\n    btn.addEventListener(\"click\", function () {\n      var id = btn.dataset.id;\n      btn.classList.add(\"hideResetBtn\");\n      btn.previousSibling.innerText = \"입금 확인\";\n      fetch('/reset', {\n        method: 'post',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          id: id\n        })\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/resetRollCall.js?");

/***/ }),

/***/ "./src/frontend/scss/style.scss":
/*!**************************************!*\
  !*** ./src/frontend/scss/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://noodasim/./src/frontend/scss/style.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/frontend/js/main.js");
/******/ 	
/******/ })()
;