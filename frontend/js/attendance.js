let timeBegin;
// let btnValuehome;

//if (earnedMoney.length===10)이면, 배열비우고,  entryFee += extraFeeOption; 하고, nthMeeting, numberOfAbsence, extraFeeOption, totalEarnedMoney, nextFeeOption 다 0으로 변경하고, extraFeeText하고 nextFeeText = "" 바꿔준다. 

//체크버튼을 잘못누르면 다시 취소할수있게 처리.

//time Start button
const timeStartBtn = document.querySelector(".homeTimeStartBtn");
function recordTimeHandler () {
    const currentTime = new Date();
    timeBegin = currentTime;
    timeStartBtn.classList.add("hidden");
    console.log(timeBegin);
    //this btn appear again when reload. 
    //클릭한 시간을 서버로 보내서 쿠키에 저장?
};
if (timeStartBtn){
    timeStartBtn.addEventListener("click", recordTimeHandler);
}

//attendance operation
const checkedUlBox = document.querySelector(".listBoard-checkedBox");
const checkedIn = document.querySelector(".listBoard-checkBox");

//functions
function showingListHandler(id, ulBox){
    const lists = ulBox.querySelectorAll("li");
    lists.forEach(list => {
        if (list.childNodes[0].attributes.value.value === id){
            list.classList.add("show");
        }
    });
}


// checkedUlBox invisible dafault setting
if (checkedUlBox){
    const checkedUlBoxLists = checkedUlBox.querySelectorAll("li");
    checkedUlBoxLists.forEach(list => {
        list.classList.remove("show");
    });

    checkedUlBox.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        const id = e.target.value;
        const clickedMember = e.target.parentNode;
        clickedMember.classList.remove("show");
        showingListHandler(id, checkedIn);
        //수정된 데이터를 다시 복구해야함.
        console.log("업데이트된 데이터 다시 복구하기");
    })
}

//checkBox
if (checkedIn){
    checkedIn.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        const id = e.target.value;
        const clickedMember = e.target.parentNode;
        clickedMember.classList.remove("show");
        showingListHandler(id, checkedUlBox);

        if (timeBegin === undefined){
            console.log("you didn't click start button");
            return;
        }

        const checkinTime = new Date();
        const timeDiff = checkinTime.getTime() - timeBegin.getTime();
        const timeDifferentBySecond = timeDiff/1000;
        
        let numberOfAbsence = 0;
        let earnedMoney = 0;
        let entryFee = parseInt(e.target.dataset.entryfee);
        let nthMeeting = 1;
        
        if(e.target.className === "checkBox-Absence"){
            console.log("absence");
            numberOfAbsence = 1;
        }
        if (e.target.className === "checkBox-checkIn"){
            console.log("checkin");
            //1800초, 3600초 시작전을 full로 할것인가, 시작하고 5분까지는 full로 하고 5-30분안을 10%로 할것인가..
            if(timeDifferentBySecond <= 5){
                earnedMoney= entryFee * 0.1;
                console.log("5초 이하:", earnedMoney);
            }else if (timeDifferentBySecond > 5 && timeDifferentBySecond <= 10){
                earnedMoney= entryFee * 0.1 - 1000;
                console.log("5초 초과 10초이하:", earnedMoney);
            } else if (timeDifferentBySecond > 10){
                earnedMoney= entryFee * 0.1 - 2000;
                console.log("10초 초과:", earnedMoney);
            }
        }
        
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
            })
        })


    }
    );
};


//Done button
const timeFinishBtn = document.querySelector(".homeTimeFinishBtn");
function attendanceDoneHandler (e) {
    // .listBoard-checkBox에 li가 있으면 warning.
    e.preventDefault();
    alert("sure?");
    timeStartBtn.classList.remove("hidden");
    timeBegin = undefined;
    // console.log(timeBegin);
}
if (timeFinishBtn){
    timeFinishBtn.addEventListener("click", attendanceDoneHandler);
}


