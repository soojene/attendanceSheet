(()=>{var e={476:()=>{var e=document.querySelector(".resetBtnUl");e&&e.addEventListener("click",(function(e){if("BUTTON"===e.target.tagName){e.preventDefault();var t=e.target,n=t.dataset.id;t.classList.add("forFilter");var a="/reset".concat(n);fetch(a).then((function(e){200===e.status||console.log("cannot delete:",e.error)}))}})),document.querySelector(".deletBtnInUl");var t=document.querySelector(".bandShareBtn");if(t){var n=document.querySelectorAll(".chartSaved"),a=[];n.forEach((function(e){var t=e.children[0].innerHTML;a.push(t)}));var o=a.join("");t.addEventListener("click",(function(){return window.open("https://band.us/plugin/share?body=".concat(o,"&route=http://localhost:5000/saved"),"band-share","width=100, height=240, resizable=no")}))}var r=document.getElementById("foldBoxBtn");if(r){var c=document.getElementById("foldBoxContainner"),s=!0;r.addEventListener("click",(function(e){c.classList.toggle("close"),s?(r.classList.remove("fa-chevron-down"),r.classList.add("fa-chevron-up"),s=!1):(r.classList.remove("fa-chevron-up"),r.classList.add("fa-chevron-down"),s=!0)}))}var i=document.querySelector(".searchIcon");i&&i.addEventListener("click",(function(){var e=document.querySelector(".searchName").value;console.log(e),""!==e?window.location.href="/search?name=".concat(e):console.log("noting")}))},955:()=>{var e,t,n,a,o,r,c=document.querySelector(".homeTimeStartBtn"),s=(document.querySelector(".homeBox-start"),document.querySelector(".listBoard-checkBox")),i=(document.querySelector(".homeBox-finish"),document.querySelector(".listBoard-checkedBox")),d=document.querySelector(".homeTimeFinishBtn"),l=0;function u(e){e>=11?c.innerText="⛔️ 10회 끝":e<11&&(c.innerText="".concat(e,"회 스따뜨"))}function f(t,n){var a=t.querySelectorAll("li");n?a.forEach((function(t){t.dataset.nthmeeting<=e&&(t.classList.add("show"),l+=1)})):a.forEach((function(t){if(t.dataset.nthmeeting>e){var n=t.querySelector(".fromCheckBoxInnerText");console.log(t.childNodes[0]),t.childNodes[0].innerText="".concat(t.dataset.name,"(").concat(t.dataset.nthmeeting-1,"회차 취소)"),n.innerText="결석: ".concat(t.dataset.nthofabsence,"회, ").concat(t.childNodes[0].dataset.lastearnd,"원 적립"),t.classList.add("show")}}))}function h(e,t){n=e.value,a=e.parentNode,o=parseInt(e.dataset.entryfee),r=t}function v(e,t,n){t.querySelectorAll("li").forEach((function(t){t.childNodes[0].attributes.value.value===e&&(n&&(t.querySelector(".fromCheckBoxInnerText").innerText=n),t.classList.add("show"))}))}function m(e,t,n,a,o){fetch("/",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,numberOfAbsence:t,earnedMoney:n,nthMeeting:a,entryFee:o})})}if(c){e=parseInt(c.dataset.nth);var g=c.dataset.savedstarttime;if(void 0!==g){t=parseInt(g);var p=Math.floor(((new Date).getTime()-t)/1e3);p<60&&console.log("".concat(p,"초 지남")),p>60||e>=11?(console.log("60초 패스"),t=void 0,u(e)):(c.innerText="".concat(e,"회 취소"),c.classList.add("timeBegin"),c.classList.remove("timeEnd"))}else t=void 0,u(e);c.addEventListener("click",(function(n){if(e>=11)alert("모두 10회차 출첵이 끝났습니다. 입금확인을 해주세요.");else{c.classList.remove("startBtnSet");var a=n.target;if(void 0===t){var o=(new Date).getTime();t=o,a.innerText="".concat(e,"회 취소"),a.classList.add("timeBegin")}else t=void 0,a.innerText="".concat(e,"회 재시작"),a.classList.add("timeEnd"),a.classList.remove("timeBegin");fetch("/recordtime",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeBegin:t})})}}))}s&&(e=parseInt(c.dataset.nth),f(s,!0),s.addEventListener("click",(function(e){var s=e.target;if("I"===s.tagName&&(s=e.target.parentNode),"BUTTON"===s.tagName)if(void 0!==t){h(s,1),a.classList.remove("show"),0==(l-=1)&&(c.classList.add("forFilter"),d.classList.remove("forFilter"));var u=((new Date).getTime()-t)/1e3,f=Math.floor(u);f=u<60?"".concat(Math.floor(u),"초"):"".concat(Math.floor(u/60),"분");var g=0,p=0;if("checkBox-Absence"===s.className){g=1;var y=parseInt(s.dataset.numberofabsence)+1,B="결석: ".concat(y,"회.");v(n,i,B)}else if("checkBox-checkIn"===s.className){u<=3?p=.1*o:u>3&&u<=8?p=.1*o-1e3:u>8&&u<=13?p=.1*o-2e3:u>13&&(p=.1*o-3e3);var L="".concat(f,"후 출석: ").concat(p/1e3,"천원 적립");v(n,i,L)}e.target,m(n,g,p,r,o)}else alert("didn't click startBtn")}))),i&&(f(i,!1),i.addEventListener("click",(function(e){"BUTTON"===e.target.tagName&&(h(e.target,-1),a.classList.remove("show"),0!==(l+=1)&&(d.classList.add("forFilter"),c.classList.remove("forFilter")),v(n,s),m(n,0,0,r,o))}))),d&&d.addEventListener("click",(function(e){if(0!==l)return e.preventDefault(),void alert("all members are not checked");t=void 0,fetch("/recordtime",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeBegin:t})})}))}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(955),n(476)})()})();