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
/***/ (() => {

eval("var checkedUlBox = document.querySelector(\".listBoard-checkedBox\");\nvar checkedIn = document.querySelector(\".listBoard-checkBox\");\nvar timeBegin;\nvar id;\nvar clickedMember;\nvar entryFee;\nvar nthMeeting; //if (earnedMoney.length===10)이면, 배열비우고,  entryFee += extraFeeOption; 하고, nthMeeting, numberOfAbsence, extraFeeOption, totalEarnedMoney, nextFeeOption 다 0으로 변경하고, extraFeeText하고 nextFeeText = \"\" 바꿔준다. \n//time Start button\n\nvar timeStartBtn = document.querySelector(\".homeTimeStartBtn\");\n\nfunction recordTimeHandler() {\n  var currentTime = new Date();\n  timeBegin = currentTime;\n  timeStartBtn.classList.add(\"hidden\");\n  console.log(timeBegin); //this btn appear again when reload. \n  //클릭한 시간을 서버로 보내서 쿠키에 저장? 아님 로컬에 2시간정도만 저장?\n}\n\n;\n\nif (timeStartBtn) {\n  timeStartBtn.addEventListener(\"click\", recordTimeHandler);\n} //functions\n\n\nfunction varialbesControll(e, numb) {\n  id = e.target.value;\n  clickedMember = e.target.parentNode;\n  entryFee = parseInt(e.target.dataset.entryfee);\n  nthMeeting = numb;\n}\n\n;\n\nfunction showingListHandler(id, ulBox, fromcheckBox) {\n  var lists = ulBox.querySelectorAll(\"li\");\n  lists.forEach(function (list) {\n    if (list.childNodes[0].attributes.value.value === id) {\n      if (fromcheckBox) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        div.innerText = fromcheckBox;\n      }\n\n      list.classList.add(\"show\");\n    }\n  });\n}\n\n;\n\nfunction postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee) {\n  fetch('/', {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      id: id,\n      numberOfAbsence: numberOfAbsence,\n      earnedMoney: earnedMoney,\n      nthMeeting: nthMeeting,\n      entryFee: entryFee\n    })\n  });\n}\n\n; //check Box\n\nif (checkedIn) {\n  checkedIn.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\" || timeBegin === undefined) {\n      console.log(\"it's not btn or didn't click startBtn\");\n      return;\n    }\n\n    ;\n\n    if (parseInt(e.target.dataset.nthmeeting) >= 10) {\n      console.log(\"10회를 넘었음\");\n      return;\n    }\n\n    ;\n    varialbesControll(e, 1);\n    clickedMember.classList.remove(\"show\");\n    var checkinTime = new Date();\n    var timeDiff = checkinTime.getTime() - timeBegin.getTime();\n    var timeDifferentBySecond = timeDiff / 1000;\n    var minutes = Math.floor(timeDifferentBySecond);\n\n    if (timeDifferentBySecond < 60) {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond), \"\\uCD08\");\n    } else {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond / 60), \"\\uBD84\");\n    }\n\n    var numberOfAbsence = 0;\n    var earnedMoney = 0;\n\n    if (e.target.className === \"checkBox-Absence\") {\n      console.log(\"absence\");\n      numberOfAbsence = 1;\n      var absenceNumb = parseInt(e.target.dataset.numberofabsence) + 1;\n      var AbsenInnerTexts = \"\\uACB0\\uC11D: \".concat(absenceNumb, \"\\uD68C.\");\n      showingListHandler(id, checkedUlBox, AbsenInnerTexts);\n    }\n\n    ;\n\n    if (e.target.className === \"checkBox-checkIn\") {\n      console.log(\"checkin\"); //1800초, 3600초 시작전을 full로 할것인가, 시작하고 5분까지는 full로 하고 5-30분안을 10%로 할것인가..\n\n      if (timeDifferentBySecond <= 3) {\n        earnedMoney = entryFee * 0.1;\n        console.log(\"3초 이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8) {\n        earnedMoney = entryFee * 0.1 - 1000;\n        console.log(\"3초 초과 8초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13) {\n        earnedMoney = entryFee * 0.1 - 2000;\n        console.log(\"8초 초과 13초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 13) {\n        earnedMoney = entryFee * 0.1 - 3000;\n        console.log(\"13초 초과:\", earnedMoney);\n      }\n\n      var checkInnerTexts = \"\\uC2DC\\uC791 \".concat(minutes, \"\\uD6C4 \\uCD9C\\uC11D: \").concat(earnedMoney, \"\\uC6D0 \\uC801\\uB9BD\");\n      showingListHandler(id, checkedUlBox, checkInnerTexts);\n    }\n\n    ;\n    postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee);\n  });\n}\n\n; // checked Box (invisible dafault setting)\n\nif (checkedUlBox) {\n  var checkedUlBoxLists = checkedUlBox.querySelectorAll(\"li\");\n  checkedUlBoxLists.forEach(function (list) {\n    list.classList.remove(\"show\");\n  });\n  checkedUlBox.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    varialbesControll(e, -1);\n    clickedMember.classList.remove(\"show\");\n    showingListHandler(id, checkedIn); // console.log(\"업데이트된 데이터 다시 복구하기\");\n\n    postFetch(id, 0, 0, nthMeeting, entryFee);\n  });\n} //Done button\n\n\nvar timeFinishBtn = document.querySelector(\".homeTimeFinishBtn\");\n\nfunction attendanceDoneHandler(e) {\n  // .listBoard-checkBox에 li가 있으면 warning.\n  // e.preventDefault();\n  alert(\"sure?\");\n  timeStartBtn.classList.remove(\"hidden\");\n  timeBegin = undefined; // console.log(timeBegin);\n}\n\nif (timeFinishBtn) {\n  timeFinishBtn.addEventListener(\"click\", attendanceDoneHandler);\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/attendance.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./frontend/scss/style.scss\");\n/* harmony import */ var _selectDay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectDay */ \"./frontend/js/selectDay.js\");\n/* harmony import */ var _selectDay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_selectDay__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _attendance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attendance */ \"./frontend/js/attendance.js\");\n/* harmony import */ var _attendance__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_attendance__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chart */ \"./frontend/js/chart.js\");\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chart__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bandShare */ \"./frontend/js/bandShare.js\");\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_bandShare__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n // console.log(\"connecting\");\n\n//# sourceURL=webpack://noodasim/./frontend/js/main.js?");

/***/ }),

/***/ "./frontend/js/selectDay.js":
/*!**********************************!*\
  !*** ./frontend/js/selectDay.js ***!
  \**********************************/
/***/ (() => {

eval("var days = document.querySelector(\".selectOneDayOfWeek\");\nvar pickOneDay = document.querySelectorAll(\".selectOneDayOfWeek-btn\");\nvar lists = document.querySelectorAll(\".forFilter\");\nvar filteringMemberBtn = document.querySelector(\".filteringMemberBtn\");\nvar filteringMemberBtns = document.querySelector(\".filteringMemberBtns\");\nvar chooseDay = \"SAT\";\nvar apple = [];\n\nif (pickOneDay.length !== 0 && lists.length !== 0) {\n  chooseDay = days.attributes.value.value; // console.log(chooseDay);\n\n  function selectedDaybgColorFunction(chooseDay) {\n    pickOneDay.forEach(function (day) {\n      if (day.value === chooseDay) {\n        day.classList.add(\"selectedDayBgColor\");\n      } else {\n        day.classList.remove(\"selectedDayBgColor\");\n      }\n    });\n  }\n\n  ;\n\n  function filteringMember(chooseDay) {\n    apple = [];\n    lists.forEach(function (member) {\n      if (member.attributes.value.value === chooseDay && member.parentNode.className !== \"listBoard-checkedBox\") {\n        member.classList.add(\"show\");\n        apple.push(member);\n      } else {\n        member.classList.remove(\"show\");\n      }\n    });\n\n    if (apple.length === 0) {\n      filteringMemberBtn.classList.remove(\"show\");\n      filteringMemberBtns.classList.remove(\"show\");\n    } else {\n      filteringMemberBtn.classList.add(\"show\");\n      filteringMemberBtns.classList.add(\"show\");\n    }\n  }\n\n  ; // if (days){\n\n  days.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    chooseDay = e.target.value;\n    selectedDaybgColorFunction(chooseDay);\n    filteringMember(chooseDay);\n    fetch('/saved', {\n      method: 'post',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        chooseDay: chooseDay\n      })\n    });\n  }); // };\n\n  selectedDaybgColorFunction(chooseDay);\n  filteringMember(chooseDay);\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/selectDay.js?");

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