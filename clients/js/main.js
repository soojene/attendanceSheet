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

/***/ "./src/frontend/js/buttons.js":
/*!************************************!*\
  !*** ./src/frontend/js/buttons.js ***!
  \************************************/
/***/ (() => {

eval("//reset attendance\nvar chartBoxUl = document.querySelector(\".resetBtnUl\");\n\nif (chartBoxUl) {\n  chartBoxUl.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    e.preventDefault();\n    var element = e.target;\n    var id = element.dataset.id;\n    element.classList.add(\"forFilter\");\n    var url = \"/reset\".concat(id);\n    fetch(url).then(function (response) {\n      if (response.status === 200) {// element.classList.add(\"forFilter\");\n        // element.innerText=\"입금 확인\";\n      } else {\n        console.log(\"cannot delete:\", response.error);\n      }\n    });\n  });\n} //delete member (if user wanna delet a member but stay same page)\n\n\nvar deleteBtn = document.querySelector(\".deletBtnInUl\");\n\nif (deleteBtn) {// deleteBtn.addEventListener(\"click\", (e) => {\n  //     if(e.target.tagName !== \"I\"){\n  //         return;\n  //     } \n  //     const element = e.target.parentNode.parentElement;\n  //     const id = element.dataset.memberid;\n  //     const url = `/delete${id}`;\n  //     fetch(url).then(response => {\n  //         if(response.status === 200){\n  //             console.log(response.status);\n  //             element.classList.add(\"forFilter\");\n  //             element.classList.remove(\"formLi-edit\");\n  //         }else{\n  //             console.log(\"cannot delete\")\n  //         }\n  //     });\n  // })\n}\n\n; //Band share\n\nvar bandBtn = document.querySelector(\".bandShareBtn\");\n\nif (bandBtn) {\n  var chartList = document.querySelectorAll(\".chartSaved\");\n  var chart = [];\n  chartList.forEach(function (li) {\n    var text = li.children[0].innerHTML;\n    chart.push(text);\n  }); // console.log(chart.join(''));\n  // const textChart = chart.toString();\n\n  var textChart = chart.join('');\n  bandBtn.addEventListener(\"click\", function () {\n    return window.open(\"https://band.us/plugin/share?body=\".concat(textChart, \"&route=http://localhost:5000/saved\"), \"band-share\", \"width=100, height=240, resizable=no\");\n  });\n} //chart folded box\n\n\nvar foldBtn = document.getElementById(\"foldBoxBtn\");\n\nif (foldBtn) {\n  var foldBoxContainner = document.getElementById(\"foldBoxContainner\");\n  var switchValue = true;\n  foldBtn.addEventListener(\"click\", function (e) {\n    foldBoxContainner.classList.toggle(\"close\");\n\n    if (switchValue) {\n      foldBtn.classList.remove(\"fa-chevron-down\");\n      foldBtn.classList.add(\"fa-chevron-up\");\n      switchValue = false;\n    } else {\n      foldBtn.classList.remove(\"fa-chevron-up\");\n      foldBtn.classList.add(\"fa-chevron-down\");\n      switchValue = true;\n    }\n  });\n}\n\nvar searchBtn = document.querySelector(\".searchIcon\");\n\nif (searchBtn) {\n  searchBtn.addEventListener(\"click\", function () {\n    var inputValue = document.querySelector(\".searchName\").value;\n    console.log(inputValue);\n\n    if (inputValue === \"\") {\n      console.log(\"noting\");\n      return;\n    }\n\n    window.location.href = \"/search?name=\".concat(inputValue);\n  });\n}\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/buttons.js?");

/***/ }),

/***/ "./src/frontend/js/checking.js":
/*!*************************************!*\
  !*** ./src/frontend/js/checking.js ***!
  \*************************************/
/***/ (() => {

eval("var startBtn = document.querySelector(\".homeTimeStartBtn\");\nvar startSheet = document.querySelector(\".homeBox-start\");\nvar startUlBox = document.querySelector(\".listBoard-checkBox\");\nvar finishSheet = document.querySelector(\".homeBox-finish\");\nvar finishUlBox = document.querySelector(\".listBoard-checkedBox\");\nvar finishBtn = document.querySelector(\".homeTimeFinishBtn\");\nvar nth;\nvar numberOfChecklist = 0;\nvar timeBegin; // let startCounting = false;\n\nvar id;\nvar clickedMember;\nvar entryFee;\nvar nthMeeting; //functions\n\nfunction startBtnSetting(nth) {\n  if (nth >= 11) {\n    startBtn.innerText = \"\\u26D4\\uFE0F 10\\uD68C \\uB05D\";\n  } else if (nth < 11) {\n    startBtn.innerText = \"\".concat(nth, \"\\uD68C \\uC2A4\\uB530\\uB728\");\n  }\n}\n\n;\n\nfunction listSetting(ulBox, whichOne) {\n  var li = ulBox.querySelectorAll(\"li\");\n\n  if (whichOne) {\n    li.forEach(function (list) {\n      if (list.dataset.nthmeeting <= nth) {\n        list.classList.add(\"show\");\n        numberOfChecklist += 1;\n      }\n    });\n  } else {\n    li.forEach(function (list) {\n      if (list.dataset.nthmeeting > nth) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        console.log(list.childNodes[0]);\n        list.childNodes[0].innerText = \"\".concat(list.dataset.name, \"(\").concat(list.dataset.nthmeeting - 1, \"\\uD68C\\uCC28 \\uCDE8\\uC18C)\");\n        div.innerText = \"\\uACB0\\uC11D: \".concat(list.dataset.nthofabsence, \"\\uD68C, \").concat(list.childNodes[0].dataset.lastearnd, \"\\uC6D0 \\uC801\\uB9BD\");\n        list.classList.add(\"show\");\n      }\n    });\n  }\n}\n\nfunction varialbesControll(e, numb) {\n  id = e.value;\n  clickedMember = e.parentNode;\n  entryFee = parseInt(e.dataset.entryfee);\n  nthMeeting = numb;\n}\n\n;\n\nfunction showingListHandler(id, ulBox, fromcheckBox) {\n  var lists = ulBox.querySelectorAll(\"li\");\n  lists.forEach(function (list) {\n    if (list.childNodes[0].attributes.value.value === id) {\n      if (fromcheckBox) {\n        var div = list.querySelector(\".fromCheckBoxInnerText\");\n        div.innerText = fromcheckBox;\n      }\n\n      list.classList.add(\"show\");\n    }\n  });\n}\n\n;\n\nfunction postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee) {\n  fetch('/', {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      id: id,\n      numberOfAbsence: numberOfAbsence,\n      earnedMoney: earnedMoney,\n      nthMeeting: nthMeeting,\n      entryFee: entryFee\n    })\n  });\n}\n\n; //boxs\n\nif (startBtn) {\n  nth = parseInt(startBtn.dataset.nth);\n  var timeSet = startBtn.dataset.savedstarttime;\n\n  if (timeSet !== undefined) {\n    timeBegin = parseInt(timeSet);\n    var timeOut = Math.floor((new Date().getTime() - timeBegin) / 1000); //less 60s\n\n    if (timeOut < 60) {\n      console.log(\"\".concat(timeOut, \"\\uCD08 \\uC9C0\\uB0A8\"));\n    } //7200s = 2hours\n\n\n    if (timeOut > 60 || nth >= 11) {\n      console.log(\"60초 패스\");\n      timeBegin = undefined;\n      startBtnSetting(nth);\n    } else {\n      startBtn.innerText = \"\".concat(nth, \"\\uD68C \\uCDE8\\uC18C\");\n      startBtn.classList.add(\"timeBegin\");\n      startBtn.classList.remove(\"timeEnd\");\n    }\n  } else {\n    timeBegin = undefined;\n    startBtnSetting(nth);\n  }\n\n  startBtn.addEventListener(\"click\", function (e) {\n    if (nth >= 11) {\n      alert(\"모두 10회차 출첵이 끝났습니다. 입금확인을 해주세요.\");\n      return;\n    }\n\n    startBtn.classList.remove(\"startBtnSet\");\n    var btn = e.target;\n\n    if (timeBegin === undefined) {\n      var currentTime = new Date().getTime();\n      timeBegin = currentTime;\n      btn.innerText = \"\".concat(nth, \"\\uD68C \\uCDE8\\uC18C\");\n      btn.classList.add(\"timeBegin\"); // btn.classList.remove(\"timeEnd\");\n    } else {\n      timeBegin = undefined;\n      btn.innerText = \"\".concat(nth, \"\\uD68C \\uC7AC\\uC2DC\\uC791\");\n      btn.classList.add(\"timeEnd\");\n      btn.classList.remove(\"timeBegin\");\n    }\n\n    fetch('/recordtime', {\n      method: 'post',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        timeBegin: timeBegin\n      })\n    });\n  });\n}\n\nif (startUlBox) {\n  nth = parseInt(startBtn.dataset.nth);\n  listSetting(startUlBox, true);\n  startUlBox.addEventListener(\"click\", function (e) {\n    var selectNode = e.target;\n\n    if (selectNode.tagName === \"I\") {\n      selectNode = e.target.parentNode;\n    }\n\n    if (selectNode.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    ;\n\n    if (timeBegin === undefined) {\n      alert(\"didn't click startBtn\");\n      return;\n    }\n\n    ;\n    varialbesControll(selectNode, 1);\n    clickedMember.classList.remove(\"show\");\n    numberOfChecklist -= 1;\n\n    if (numberOfChecklist === 0) {\n      startBtn.classList.add(\"forFilter\");\n      finishBtn.classList.remove(\"forFilter\");\n    }\n\n    var checkinTime = new Date();\n    var timeDiff = checkinTime.getTime() - timeBegin; // checkinTime.getTime() - timeBegin.getTime();\n\n    var timeDifferentBySecond = timeDiff / 1000;\n    var minutes = Math.floor(timeDifferentBySecond);\n\n    if (timeDifferentBySecond < 60) {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond), \"\\uCD08\");\n    } else {\n      minutes = \"\".concat(Math.floor(timeDifferentBySecond / 60), \"\\uBD84\");\n    }\n\n    var numberOfAbsence = 0;\n    var earnedMoney = 0;\n\n    if (selectNode.className === \"checkBox-Absence\") {\n      numberOfAbsence = 1;\n      var absenceNumb = parseInt(selectNode.dataset.numberofabsence) + 1;\n      var AbsenInnerTexts = \"\\uACB0\\uC11D: \".concat(absenceNumb, \"\\uD68C.\");\n      showingListHandler(id, finishUlBox, AbsenInnerTexts);\n    } else if (selectNode.className === \"checkBox-checkIn\") {\n      if (timeDifferentBySecond <= 3) {\n        earnedMoney = entryFee * 0.1; // console.log(\"3초 이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8) {\n        earnedMoney = entryFee * 0.1 - 1000; // console.log(\"3초 초과 8초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13) {\n        earnedMoney = entryFee * 0.1 - 2000; // console.log(\"8초 초과 13초이하:\", earnedMoney);\n      } else if (timeDifferentBySecond > 13) {\n        earnedMoney = entryFee * 0.1 - 3000; // console.log(\"13초 초과:\", earnedMoney);\n      }\n\n      var checkInnerTexts = \"\".concat(minutes, \"\\uD6C4 \\uCD9C\\uC11D: \").concat(earnedMoney / 1000, \"\\uCC9C\\uC6D0 \\uC801\\uB9BD\");\n      showingListHandler(id, finishUlBox, checkInnerTexts);\n    }\n\n    ;\n    e.target;\n    postFetch(id, numberOfAbsence, earnedMoney, nthMeeting, entryFee);\n  });\n}\n\n;\n\nif (finishUlBox) {\n  listSetting(finishUlBox, false);\n  finishUlBox.addEventListener(\"click\", function (e) {\n    if (e.target.tagName !== \"BUTTON\") {\n      return;\n    }\n\n    varialbesControll(e.target, -1);\n    clickedMember.classList.remove(\"show\");\n    numberOfChecklist += 1;\n\n    if (numberOfChecklist !== 0) {\n      finishBtn.classList.add(\"forFilter\");\n      startBtn.classList.remove(\"forFilter\");\n    }\n\n    showingListHandler(id, startUlBox);\n    postFetch(id, 0, 0, nthMeeting, entryFee);\n  });\n}\n\n;\n\nif (finishBtn) {\n  finishBtn.addEventListener(\"click\", function (e) {\n    if (numberOfChecklist !== 0) {\n      e.preventDefault();\n      alert(\"all members are not checked\");\n      return;\n    }\n\n    timeBegin = undefined;\n    fetch('/recordtime', {\n      method: 'post',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        timeBegin: timeBegin\n      })\n    }); // timeBegin = undefined;\n    // console.log(timeBegin);\n  });\n}\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/checking.js?");

/***/ }),

/***/ "./src/frontend/js/main.js":
/*!*********************************!*\
  !*** ./src/frontend/js/main.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/frontend/scss/style.scss\");\n/* harmony import */ var _checking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checking */ \"./src/frontend/js/checking.js\");\n/* harmony import */ var _checking__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_checking__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttons */ \"./src/frontend/js/buttons.js\");\n/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_buttons__WEBPACK_IMPORTED_MODULE_2__);\n\n\n // import \"./attendance\";\n// import \"./fetchDatas\";\n\n//# sourceURL=webpack://noodasim/./src/frontend/js/main.js?");

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