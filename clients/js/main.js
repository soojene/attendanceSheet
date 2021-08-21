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

/***/ "./frontend/js/addMember.js":
/*!**********************************!*\
  !*** ./frontend/js/addMember.js ***!
  \**********************************/
/***/ (() => {

eval("// const selectNth = document.querySelectorAll(\".selectNth\");\n// const nthEarnedMoney = document.querySelectorAll(\".nthEarndMoney\");\n// if (selectNth && nthEarnedMoney){\n//     function eachFeeInput (id, fee) {\n//         nthEarnedMoney.forEach(input => {\n//             if(id === input.parentNode.dataset.label){\n//                 input.value = parseInt(fee);\n//             }\n//         })\n//     }\n//     selectNth.forEach((select) => {\n//         let id = select.parentNode.dataset.label;\n//         let value = select[0].childNodes;\n//         if (value !== \"\"){\n//             console.log(value);\n//             eachFeeInput(id, value);\n//         };\n//         select.addEventListener(\"change\", (e) =>{\n//             e.preventDefault();\n//             const id = e.target.parentNode.dataset.label; \n//             const value = e.target.value;\n//             eachFeeInput(id, value);\n//         })\n//     })\n// }\n\n//# sourceURL=webpack://noodasim/./frontend/js/addMember.js?");

/***/ }),

/***/ "./frontend/js/attendance.js":
/*!***********************************!*\
  !*** ./frontend/js/attendance.js ***!
  \***********************************/
/***/ (() => {

eval("var days = document.querySelector(\".selectOneDayOfWeek\");\nvar timeStartBtn = document.querySelector(\".homeTimeStartBtn\");\nvar checkedUlBox = document.querySelector(\".listBoard-checkedBox\");\nvar checkedIn = document.querySelector(\".listBoard-checkBox\");\nvar timeFinishBtn = document.querySelector(\".homeTimeFinishBtn\");\nvar apple = [];\nvar nth;\nvar maxNth;\nvar chooseDay; //요일버튼\n\nif (days) {\n  var pickOneDay = document.querySelectorAll(\".selectOneDayOfWeek-btn\");\n  var lists = document.querySelectorAll(\".forFilter\");\n  var filteringMemberBtn = document.querySelector(\".filteringMemberBtn\");\n  var filteringMemberBtns = document.querySelector(\".filteringMemberBtns\");\n  var tenthMeetingMessage = document.querySelector(\".ifTenthMeetingExist\");\n  chooseDay = days.attributes.value.value;\n\n  function selectedDaybgColorFunction(chooseDay) {\n    pickOneDay.forEach(function (day) {\n      if (day.value === chooseDay) {\n        day.classList.add(\"selectedDayBgColor\");\n      } else {\n        day.classList.remove(\"selectedDayBgColor\");\n      }\n    });\n  }\n\n  ;\n\n  function filteringMember(chooseDay) {\n    var arrayOfNthmeeting = [];\n    apple = [];\n    lists.forEach(function (member) {\n      if (member.attributes.value.value === chooseDay && member.parentNode.className !== \"listBoard-checkedBox\") {\n        member.classList.add(\"show\");\n        apple.push(member);\n        arrayOfNthmeeting.push(member.dataset.nthmeeting);\n      } else {\n        member.classList.remove(\"show\");\n      }\n    });\n    nth = Math.min.apply(Math, arrayOfNthmeeting); //회차\n\n    maxNth = Math.max.apply(Math, arrayOfNthmeeting);\n    numbOfApple = apple.length;\n\n    if (timeStartBtn) {\n      startBtnSetting(nth);\n    }\n\n    if (tenthMeetingMessage && maxNth >= 11) {\n      tenthMeetingMessage.classList.add(\"show\");\n    } else if (tenthMeetingMessage && maxNth < 11) {\n      tenthMeetingMessage.classList.remove(\"show\");\n    }\n\n    ;\n\n    if (numbOfApple === 0) {\n      filteringMemberBtn.classList.remove(\"show\");\n      filteringMemberBtns.classList.remove(\"show\");\n    } else if (numbOfApple !== 0) {\n      filteringMemberBtn.classList.add(\"show\");\n      filteringMemberBtns.classList.add(\"show\");\n    }\n  }\n\n  ;\n  days.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    ;\n\n    if (startCounting) {\n      alert(\"출첵중입니다. 출석체크를 다 끝내세요\");\n      return;\n    }\n\n    ;\n    chooseDay = e.target.value;\n    fetch('/saved', {\n      method: 'post',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        chooseDay: chooseDay\n      })\n    }); //fetch성공 후 리로드??? // location.reload();\n\n    selectedDaybgColorFunction(chooseDay);\n    filteringMember(chooseDay);\n\n    if (checkedIn && checkedUlBox) {\n      firstCheckBox(checkUlLists);\n      secondUlBox(checkedUlBoxLists);\n    }\n  });\n  selectedDaybgColorFunction(chooseDay);\n  filteringMember(chooseDay);\n}\n\n; //homepage\n\nvar checkUlLists;\nvar checkedUlBoxLists;\nvar timeBegin;\nvar id;\nvar clickedMember;\nvar entryFee;\nvar nthMeeting;\nvar startCounting = false;\nvar numbOfApple = apple.length; //functions\n\nfunction varialbesControll(e, numb) {\n  id = e.target.value;\n  clickedMember = e.target.parentNode;\n  entryFee = parseInt(e.target.dataset.entryfee);\n  nthMeeting = numb;\n}\n\n;\n\nfunction showingListHandler(id, ulBox, fromcheckBox) {\n  var lists = ulBox.querySelectorAll(\"li\");\n  lists.forEach(function (list) {\n    if (list.childNodes[0].attributes.value.value === id) {\n      if (fromcheckBox) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        div.innerText = fromcheckBox;\n      }\n\n      list.classList.add(\"show\");\n    }\n  });\n}\n\n;\n\nfunction postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee) {\n  fetch('/', {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      id: id,\n      numberOfAbsence: numberOfAbsence,\n      earnedMoney: earnedMoney,\n      nthMeeting: nthMeeting,\n      entryFee: entryFee\n    })\n  });\n}\n\n;\n\nfunction firstCheckBox(checkUlLists) {\n  checkUlLists.forEach(function (list) {\n    if (parseInt(list.dataset.nthmeeting) !== nth && list.attributes.value.value === chooseDay) {\n      list.classList.remove(\"show\");\n      numbOfApple -= 1;\n    } else {// console.log(\"first Ul Box 회차같음:\");\n    }\n  });\n}\n\n;\n\nfunction secondUlBox(checkedUlBoxLists) {\n  checkedUlBoxLists.forEach(function (list) {\n    if (parseInt(list.dataset.nthmeeting) !== nth && list.attributes.value.value === chooseDay) {\n      var div = list.querySelector(\".fromCheckBoxInnerText\");\n      list.childNodes[0].innerText = \"\".concat(list.dataset.name, \"(\").concat(list.dataset.nthmeeting - 1, \"\\uD68C\\uCC28 \\uCDE8\\uC18C)\");\n      div.innerText = \"\".concat(list.dataset.nthofabsence, \"\\uD68C \\uACB0\\uC11D.\");\n      list.classList.add(\"show\");\n    }\n  });\n}\n\n;\n\nfunction startBtnSetting(nth) {\n  if (nth >= 11) {\n    timeStartBtn.innerText = \"\\u26D4\\uFE0F 10\\uD68C \\uB2E4 \\uD588\\uC5B4\\uC720. \\uC785\\uAE08 \\uD655\\uC778 \\uD6C4 \\uB2E4\\uC2DC \\uCD9C\\uCCB5\\uD560 \\uC218 \\uC788\\uC5B4\\uC720\";\n  } else if (nth < 11) {\n    timeStartBtn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uC2A4\\uB530\\uB728\");\n  }\n}\n\n; //time Start button\n\nif (timeStartBtn) {\n  startBtnSetting(nth);\n  timeStartBtn.addEventListener(\"click\", function (e) {\n    if (nth >= 11) {\n      alert(\"10회차 출첵한 멤머가 있어요. 입금확인 후 출첵할 수 있어요.\");\n      return;\n    }\n\n    if (timeBegin !== undefined && apple.length !== numbOfApple) {\n      alert(\"체크된 멤버가 이미 있는데 시간취소한다고? 체크된 멤버를 취소하던, 출첵을 마저 끝내고 시간취소를 하세여\");\n      return;\n    }\n\n    ;\n    var btn = e.target;\n    btn.classList.toggle(\"toggle\");\n\n    if (timeBegin === undefined) {\n      var currentTime = new Date();\n      timeBegin = currentTime;\n      btn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uCDE8\\uC18C\");\n      startCounting = true;\n    } else {\n      timeBegin = undefined;\n      btn.innerText = \"\".concat(nth, \"\\uD68C\\uCC28 \\uC7AC\\uC2DC\\uC791\");\n      startCounting = false;\n    } //시간시작버튼을 누른 상태에서 다른페이지로 이동하거나 브라우저를 닫고 다시 돌아오면 시작된 시간은 저장되어 있지않아 시간시작버튼이 리셋되어있다.\n\n  });\n} //check Box\n\n\nif (checkedIn) {\n  checkUlLists = checkedIn.querySelectorAll(\"li\");\n  firstCheckBox(checkUlLists);\n  checkedIn.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      console.log(\"it's not btn\");\n      return;\n    }\n\n    ;\n\n    if (timeBegin === undefined) {\n      alert(\"didn't click startBtn\");\n      return;\n    }\n\n    ;\n\n    if (parseInt(e.target.dataset.nthmeeting) >= 12) {\n      alert(\"10회 출석체크가 되었습니다. 저장 페이지에서 입금확인을 하셔야 다음 1회 출석체크가 이루어집니다.\");\n      console.log(\"10회를 넘었음\");\n      return;\n    }\n\n    ;\n    varialbesControll(e, 1);\n    clickedMember.classList.remove(\"show\");\n    numbOfApple -= 1; // console.log(numbOfApple);\n\n    var checkinTime = new Date();\n    var timeDiff = checkinTime.getTime() - timeBegin.getTime();\n    var timeDifferentBySecond = timeDiff / 1000;\n    var minutes = Math.floor(timeDifferentBySecond);\n\n    if (timeDifferentBySecond < 60) {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond), \"\\uCD08\");\n    } else {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond / 60), \"\\uBD84\");\n    }\n\n    var numberOfAbsence = 0;\n    var earnedMoney = 0;\n\n    if (e.target.className === \"checkBox-Absence\") {\n      // console.log(\"absence\");\n      numberOfAbsence = 1;\n      var absenceNumb = parseInt(e.target.dataset.numberofabsence) + 1;\n      var AbsenInnerTexts = \"\\uACB0\\uC11D: \".concat(absenceNumb, \"\\uD68C.\");\n      showingListHandler(id, checkedUlBox, AbsenInnerTexts);\n    }\n\n    ;\n\n    if (e.target.className === \"checkBox-checkIn\") {\n      // console.log(\"checkin\");\n      //1800초, 3600초 시작전을 full로 할것인가, 시작하고 5분까지는 full로 하고 5-30분안을 10%로 할것인가..\n      if (timeDifferentBySecond <= 3) {\n        earnedMoney = entryFee * 0.1;\n        console.log(\"3초 이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8) {\n        earnedMoney = entryFee * 0.1 - 1000;\n        console.log(\"3초 초과 8초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13) {\n        earnedMoney = entryFee * 0.1 - 2000;\n        console.log(\"8초 초과 13초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 13) {\n        earnedMoney = entryFee * 0.1 - 3000;\n        console.log(\"13초 초과:\", earnedMoney);\n      }\n\n      var checkInnerTexts = \"\\uC2DC\\uC791 \".concat(minutes, \"\\uD6C4 \\uCD9C\\uC11D: \").concat(earnedMoney, \"\\uC6D0 \\uC801\\uB9BD\");\n      showingListHandler(id, checkedUlBox, checkInnerTexts);\n    }\n\n    ;\n    postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee);\n  });\n}\n\n; // checked Box \n\nif (checkedUlBox) {\n  checkedUlBoxLists = checkedUlBox.querySelectorAll(\"li\");\n  secondUlBox(checkedUlBoxLists);\n  checkedUlBox.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    varialbesControll(e, -1);\n    clickedMember.classList.remove(\"show\");\n    numbOfApple += 1; // console.log(numbOfApple);\n\n    showingListHandler(id, checkedIn); // console.log(\"업데이트된 데이터 다시 복구하기\");\n\n    postFetch(id, 0, 0, nthMeeting, entryFee);\n  });\n} //Done button\n\n\nif (timeFinishBtn) {\n  timeFinishBtn.addEventListener(\"click\", function (e) {\n    // console.log(numbOfApple);\n    if (numbOfApple !== 0) {\n      e.preventDefault();\n      alert(\"all members are not checked\"); //취소버튼도 있어야함.\n\n      return;\n    } // timeStartBtn.classList.remove(\"hidden\");\n    // timeBegin = undefined;\n    // console.log(timeBegin);\n\n  });\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/attendance.js?");

/***/ }),

/***/ "./frontend/js/bandShare.js":
/*!**********************************!*\
  !*** ./frontend/js/bandShare.js ***!
  \**********************************/
/***/ (() => {

eval("var btn = document.querySelector(\".bandShareBtn\");\nvar chartList = document.querySelectorAll(\".chartSaved\"); // console.log(chartList);\n\nvar chart = [];\nchartList.forEach(function (li) {\n  var name = li.children[0].innerHTML;\n  var savedText = li.children[1].innerHTML; // let entryFee = li.children[1].innerHTML;\n  // let NumberOfAbsence = li.children[2].innerHTML;\n  // let extraFee = li.children[3].innerHTML;\n  // let earn = li.children[4].innerHTML;\n  // let pay = li.children[5].innerHTML;\n  // let pushList = `${name} ${entryFee}:${NumberOfAbsence} ${extraFee} ${earn} ${pay}.`;\n\n  var pushList = name + savedText;\n  chart.push(pushList);\n});\nvar textChart = chart.toString();\n\nfunction handleBandShare() {\n  window.open(\"https://band.us/plugin/share?body=\".concat(textChart, \"&route=http://localhost:5000/saved\"), \"band-share\", \"width=120, height=240, resizable=no\");\n}\n\n;\n\nif (btn) {\n  btn.addEventListener(\"click\", handleBandShare);\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/bandShare.js?");

/***/ }),

/***/ "./frontend/js/main.js":
/*!*****************************!*\
  !*** ./frontend/js/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./frontend/scss/style.scss\");\n/* harmony import */ var _attendance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance */ \"./frontend/js/attendance.js\");\n/* harmony import */ var _attendance__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_attendance__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _resetRollCall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetRollCall */ \"./frontend/js/resetRollCall.js\");\n/* harmony import */ var _resetRollCall__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_resetRollCall__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _addMember__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addMember */ \"./frontend/js/addMember.js\");\n/* harmony import */ var _addMember__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_addMember__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bandShare */ \"./frontend/js/bandShare.js\");\n/* harmony import */ var _bandShare__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_bandShare__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n//# sourceURL=webpack://noodasim/./frontend/js/main.js?");

/***/ }),

/***/ "./frontend/js/resetRollCall.js":
/*!**************************************!*\
  !*** ./frontend/js/resetRollCall.js ***!
  \**************************************/
/***/ (() => {

eval("var savedPage = document.querySelector(\".chartBox-total\");\n\nif (savedPage) {\n  var resetBtn = document.querySelectorAll(\".resetCallBtn\");\n  resetBtn.forEach(function (btn) {\n    btn.addEventListener(\"click\", function () {\n      var id = btn.dataset.id;\n      btn.classList.add(\"hideResetBtn\");\n      btn.previousSibling.innerText = \"입금 확인\";\n      fetch('/reset', {\n        method: 'post',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          id: id\n        })\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack://noodasim/./frontend/js/resetRollCall.js?");

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