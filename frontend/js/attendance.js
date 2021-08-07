const checkedUlBox = document.querySelector(".listBoard-checkedBox");
const checkedIn = document.querySelector(".listBoard-checkBox");
let timeBegin;
let id;
let clickedMember;
let entryFee;
let nthMeeting;

//if (earnedMoney.length===10)이면, 배열비우고,  entryFee += extraFeeOption; 하고, nthMeeting, numberOfAbsence, extraFeeOption, totalEarnedMoney, nextFeeOption 다 0으로 변경하고, extraFeeText하고 nextFeeText = "" 바꿔준다. 


//time Start button
const timeStartBtn = document.querySelector(".homeTimeStartBtn");
function recordTimeHandler () {
    const currentTime = new Date();
    timeBegin = currentTime;
    timeStartBtn.classList.add("hidden");
    console.log(timeBegin);
    //this btn appear again when reload. 
    //클릭한 시간을 서버로 보내서 쿠키에 저장? 아님 로컬에 2시간정도만 저장?
};
if (timeStartBtn){
    timeStartBtn.addEventListener("click", recordTimeHandler);
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

//check Box
if (checkedIn){
    checkedIn.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON" || timeBegin === undefined ){
            console.log("it's not btn or didn't click startBtn");
            return;
        };
        if (parseInt(e.target.dataset.nthmeeting) >= 10){
            console.log("10회를 넘었음");
            return;
        };
        varialbesControll(e, 1);
        clickedMember.classList.remove("show");
        
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
    const checkedUlBoxLists = checkedUlBox.querySelectorAll("li");
    checkedUlBoxLists.forEach(list => {
        list.classList.remove("show");
    });

    checkedUlBox.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        varialbesControll(e, -1);
        clickedMember.classList.remove("show");
        showingListHandler(id, checkedIn);
        // console.log("업데이트된 데이터 다시 복구하기");

        postFetch(id, 0, 0, nthMeeting,entryFee);
        
    })
}


//Done button
const timeFinishBtn = document.querySelector(".homeTimeFinishBtn");
function attendanceDoneHandler (e) {
    // .listBoard-checkBox에 li가 있으면 warning.
    // e.preventDefault();
    alert("sure?");
    timeStartBtn.classList.remove("hidden");
    timeBegin = undefined;
    // console.log(timeBegin);
}
if (timeFinishBtn){
    timeFinishBtn.addEventListener("click", attendanceDoneHandler);
}


