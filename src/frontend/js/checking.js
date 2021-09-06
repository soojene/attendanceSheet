const startBtn = document.querySelector(".homeTimeStartBtn");
const startSheet = document.querySelector(".homeAttendanceSheet-start");
const startUlBox = document.querySelector(".listBoard-checkBox");
const finishSheet = document.querySelector(".homeAttendanceSheet-finish");
const finishUlBox = document.querySelector(".listBoard-checkedBox");
const finishBtn = document.querySelector(".homeTimeFinishBtn");

let nth;
let numberOfChecklist= 0;

let timeBegin;
let startCounting = false;

let id;
let clickedMember;
let entryFee;
let nthMeeting;

//functions
function startBtnSetting (nth){
    if(nth >= 11){
        startBtn.innerText = `⛔️ 10회까지 모두 체크. 입금 확인 후 다시 1회부터 시작하세요.`;
    }else if(nth < 11){
        startBtn.innerText = `${nth}회차 스따뜨`;
    }
};
function listSetting(ulBox, whichOne){
    const li = ulBox.querySelectorAll("li");
    if(whichOne){
        li.forEach(list => {
            if(list.dataset.nthmeeting <= nth ){
                list.classList.add("show");
                numberOfChecklist +=1;
            }
        })
    }else{
        li.forEach(list => {
            if(list.dataset.nthmeeting > nth){
                let div =list.querySelector(".fromCheckBoxInnerText");
                list.childNodes[0].innerText = `${list.dataset.name}(${list.dataset.nthmeeting - 1}회차 취소)`
                div.innerText = `${list.dataset.nthofabsence}회 결석.`
                list.classList.add("show");
            }
        });
    }
}
function varialbesControll(e, numb){
    id = e.target.value;
    clickedMember = e.target.parentNode;
    entryFee = parseInt(e.target.dataset.entryfee);
    nthMeeting = numb;
};
function showingListHandler(id, ulBox, fromcheckBox){
    const lists = ulBox.querySelectorAll("li");
    lists.forEach(list => {
        if (list.childNodes[0].attributes.value.value === id){
            if(fromcheckBox){
                let div =list.querySelector(".fromCheckBoxInnerText");
                div.innerText = fromcheckBox;
            }
            list.classList.add("show");
        }
    });
};
function postFetch (id, numberOfAbsence, earnedMoney, nthMeeting,entryFee){
    fetch('/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id,
            numberOfAbsence,
            earnedMoney,
            nthMeeting,
            entryFee
        })
    })
};

//boxs
if(startBtn){
    nth = parseInt(startBtn.dataset.nth);
    startBtnSetting(startBtn.dataset.nth);
    startBtn.addEventListener("click", (e) => {
        if(nth >= 11){
            alert("10회차 출첵한 멤머가 있어요. 입금확인 후 출첵할 수 있어요.")
            return;
        }
        // if (timeBegin !== undefined && apple.length !== numbOfApple){
        //     alert("체크된 멤버가 이미 있는데 시간취소한다고? 체크된 멤버를 취소하던, 출첵을 마저 끝내고 시간취소를 하세여");
        //     return;
        // };
        startBtn.classList.remove("startBtnSet");
        const btn = e.target;
        if(timeBegin === undefined){
            const currentTime = new Date();
            timeBegin = currentTime;
            btn.innerText = `${nth}회차 취소`;
            startCounting = true;
            btn.classList.add("timeBegin");
            btn.classList.remove("timeEnd");
        }else{
            timeBegin = undefined;
            btn.innerText = `${nth}회차 재시작`;
            startCounting = false;
            btn.classList.add("timeEnd");
            btn.classList.remove("timeBegin");
        }
    });
    
}

if (startUlBox){
    nth = parseInt(startBtn.dataset.nth);
    listSetting(startUlBox, true);

    startUlBox.addEventListener("click", (e) => {
        if(timeBegin === undefined){
            alert("didn't click startBtn");
            return;
        };
        if (e.target.tagName !== "BUTTON"){
            return;
        };

        varialbesControll(e, 1);
        clickedMember.classList.remove("show");
        numberOfChecklist -=1;
        if(numberOfChecklist === 0){
            startBtn.classList.add("forFilter");
            finishBtn.classList.remove("forFilter");
        }
        const checkinTime = new Date();
        const timeDiff = checkinTime.getTime() - timeBegin.getTime();
        const timeDifferentBySecond = timeDiff/1000;
        let minutes = Math.floor(timeDifferentBySecond);
        if(timeDifferentBySecond < 60){
            minutes = `${Math.floor(timeDifferentBySecond)}초`;
        } else{
            minutes = `${Math.floor(timeDifferentBySecond/60)}분`;
        }
        
        let numberOfAbsence = 0;
        let earnedMoney = 0;
        

        if(e.target.className === "checkBox-Absence"){
            numberOfAbsence = 1;
            let absenceNumb = parseInt(e.target.dataset.numberofabsence) + 1;
            const AbsenInnerTexts = `결석: ${absenceNumb}회.`
            showingListHandler(id, finishUlBox, AbsenInnerTexts);
        } else if (e.target.className === "checkBox-checkIn"){
            if(timeDifferentBySecond <= 3){
                earnedMoney= entryFee * 0.1;
                // console.log("3초 이하:", earnedMoney);
            }else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8){
                earnedMoney= entryFee * 0.1 - 1000;
                // console.log("3초 초과 8초이하:", earnedMoney);
            }else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13){
                earnedMoney= entryFee * 0.1 - 2000;
                // console.log("8초 초과 13초이하:", earnedMoney);
            } else if (timeDifferentBySecond > 13){
                earnedMoney= entryFee * 0.1 - 3000;
                // console.log("13초 초과:", earnedMoney);
            }
            const checkInnerTexts = `시작 ${minutes}후 출석: ${earnedMoney}원 적립`;
            showingListHandler(id, finishUlBox, checkInnerTexts);
        };

        postFetch (id, numberOfAbsence, earnedMoney, nthMeeting,entryFee);
    })
};

if(finishUlBox){
    listSetting(finishUlBox, false);

    finishUlBox.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        varialbesControll(e, -1);
        clickedMember.classList.remove("show");
        numberOfChecklist += 1;
        if(numberOfChecklist !== 0){
            finishBtn.classList.add("forFilter");
            startBtn.classList.remove("forFilter");
        }
        showingListHandler(id, startUlBox);

        postFetch(id, 0, 0, nthMeeting,entryFee);
        
    })
    
};

if(finishBtn){
    finishBtn.addEventListener("click", (e) => {
        if(numberOfChecklist !== 0){
            e.preventDefault();
            alert("all members are not checked");
            return;
        }
        // timeBegin = undefined;
        // console.log(timeBegin);
    });
}