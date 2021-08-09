const days = document.querySelector(".selectOneDayOfWeek");
let pickOneDay = document.querySelectorAll(".selectOneDayOfWeek-btn");
let lists = document.querySelectorAll(".forFilter");
const filteringMemberBtn = document.querySelector(".filteringMemberBtn");
const filteringMemberBtns = document.querySelector(".filteringMemberBtns");

let apple= [];
let nth;
let chooseDay;

//요일버튼
if(pickOneDay.length !== 0 && lists.length !== 0){
    chooseDay = days.attributes.value.value;
    function selectedDaybgColorFunction (chooseDay) {
        pickOneDay.forEach(day => {
            if(day.value === chooseDay){
                day.classList.add("selectedDayBgColor");
            }else{
                day.classList.remove("selectedDayBgColor");
            }
        });
    };
    
    function filteringMember (chooseDay) {
        let arrayOfNthmeeting = [];
        apple = [];
        lists.forEach(member => {
            if (member.attributes.value.value === chooseDay && member.parentNode.className !== "listBoard-checkedBox"){
                member.classList.add("show");
                apple.push(member);
                arrayOfNthmeeting.push(member.dataset.nthmeeting);
            }else{
                member.classList.remove("show");
            }
        });
        nth = Math.min(...arrayOfNthmeeting);
        numbOfApple = apple.length;
        if(apple.length === 0){
            filteringMemberBtn.classList.remove("show");
            filteringMemberBtns.classList.remove("show");
        }else{
            filteringMemberBtn.classList.add("show");
            filteringMemberBtns.classList.add("show");
        }
    };
    
    days.addEventListener("click", (e) => {
        e.preventDefault();
        if(e.target.tagName !== "BUTTON"){
            return;
        };
        if (startCounting) {
            alert("출첵중입니다. 출석체크를 다 끝내세요")
            return;
        };
        
        chooseDay = e.target.value;
        
        fetch('/saved', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                chooseDay
            })
        });
        //fetch성공 후 리로드??? // location.reload();
        
        selectedDaybgColorFunction (chooseDay);
        filteringMember(chooseDay);
        if (checkedIn && checkedUlBox){
            firstCheckBox (checkUlLists);
            secondUlBox (checkedUlBoxLists);
        }
    });
    
    selectedDaybgColorFunction (chooseDay);
    filteringMember (chooseDay);
};

//homepage
const checkedUlBox = document.querySelector(".listBoard-checkedBox");
const checkedIn = document.querySelector(".listBoard-checkBox");

let checkUlLists;
let checkedUlBoxLists;

let timeBegin;

let id;
let clickedMember;
let entryFee;
let nthMeeting;

let startCounting = false;
let numbOfApple =apple.length;

//time Start button
const timeStartBtn = document.querySelector(".homeTimeStartBtn");
if (timeStartBtn){
    timeStartBtn.addEventListener("click", (e) => {
        if (timeBegin !== undefined && apple.length !== numbOfApple){
            console.log("체크된 멤버가 이미 있는데 시간취소한다고?");
        };
        const btn = e.target;
        btn.classList.toggle("toggle");
        
        if(timeBegin === undefined){
            const currentTime = new Date();
            timeBegin = currentTime;
            btn.innerText = '취소';
            startCounting = true;
            console.log("타임스타뜨");
            console.log(timeBegin);
        }else{
            timeBegin = undefined;
            console.log("타임취소");
            btn.innerText = '시작';
            startCounting = false;
            console.log(timeBegin);
        }
        // timeStartBtn.classList.add("hidden");
        //this btn appear again when reload. 
        //클릭한 시간을 서버로 보내서 쿠키에 저장? 아님 로컬에 2시간정도만 저장?
    });
}

//functions
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
function firstCheckBox (checkUlLists){
    checkUlLists.forEach(list => {
        if(parseInt(list.dataset.nthmeeting) !== nth && list.attributes.value.value === chooseDay){
            list.classList.remove("show");
            numbOfApple -= 1;
        }else {
            console.log("first Ul Box 회차같음:");
        }
    });
};
function secondUlBox (checkedUlBoxLists){
    checkedUlBoxLists.forEach(list => {
        if(parseInt(list.dataset.nthmeeting) !== nth && list.attributes.value.value === chooseDay){
            list.classList.add("show");
        }
    });
};


//check Box
if (checkedIn){
    checkUlLists = checkedIn.querySelectorAll("li");
    firstCheckBox(checkUlLists);
    checkedIn.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON" || timeBegin === undefined ){
            alert("it's not btn or didn't click startBtn");
            console.log("it's not btn or didn't click startBtn");
            return;
        };
        if (parseInt(e.target.dataset.nthmeeting) >= 10){
            alert("10회 출석체크가 되었습니다. 저장 페이지에서 입금확인을 하셔야 다음 1회 출석체크가 이루어집니다.");
            console.log("10회를 넘었음");
            return;
        };
        varialbesControll(e, 1);
        clickedMember.classList.remove("show");
        numbOfApple -= 1;
        console.log(numbOfApple);
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
            console.log("absence");
            numberOfAbsence = 1;
            let absenceNumb = parseInt(e.target.dataset.numberofabsence) + 1;
            const AbsenInnerTexts = `결석: ${absenceNumb}회.`
            showingListHandler(id, checkedUlBox, AbsenInnerTexts);
        };
        if (e.target.className === "checkBox-checkIn"){
            console.log("checkin");
            //1800초, 3600초 시작전을 full로 할것인가, 시작하고 5분까지는 full로 하고 5-30분안을 10%로 할것인가..
            if(timeDifferentBySecond <= 3){
                earnedMoney= entryFee * 0.1;
                console.log("3초 이하:", earnedMoney);
            }else if (timeDifferentBySecond > 3 && timeDifferentBySecond <= 8){
                earnedMoney= entryFee * 0.1 - 1000;
                console.log("3초 초과 8초이하:", earnedMoney);
            }else if (timeDifferentBySecond > 8 && timeDifferentBySecond <= 13){
                earnedMoney= entryFee * 0.1 - 2000;
                console.log("8초 초과 13초이하:", earnedMoney);
            } else if (timeDifferentBySecond > 13){
                earnedMoney= entryFee * 0.1 - 3000;
                console.log("13초 초과:", earnedMoney);
            }
            const checkInnerTexts = `시작 ${minutes}후 출석: ${earnedMoney}원 적립`;
            showingListHandler(id, checkedUlBox, checkInnerTexts);
        };

        postFetch (id, numberOfAbsence, earnedMoney, nthMeeting,entryFee);
    }
    );
};

// checked Box (invisible dafault setting)
if (checkedUlBox){
    checkedUlBoxLists = checkedUlBox.querySelectorAll("li");
    secondUlBox(checkedUlBoxLists);

    checkedUlBox.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        varialbesControll(e, -1);
        clickedMember.classList.remove("show");
        numbOfApple += 1;
        console.log(numbOfApple);
        showingListHandler(id, checkedIn);
        // console.log("업데이트된 데이터 다시 복구하기");

        postFetch(id, 0, 0, nthMeeting,entryFee);
        
    })
}


//Done button
const timeFinishBtn = document.querySelector(".homeTimeFinishBtn");

if (timeFinishBtn){
    timeFinishBtn.addEventListener("click", (e) => {
        console.log(numbOfApple);
        if(numbOfApple !== 0){
            e.preventDefault();
            alert("all members are not checked"); //취소버튼도 있어야함.
            return;
        }
        // timeStartBtn.classList.remove("hidden");
        // timeBegin = undefined;
        // console.log(timeBegin);
    });
}