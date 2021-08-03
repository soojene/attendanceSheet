import fetch from 'node-fetch';

export const timeStartBtn = document.querySelector(".homeTimeStartBtn");
const checkedIn = document.querySelector(".listBoard-checkBox");
export const timeFinishBtn = document.querySelector(".homeTimeFinishBtn");

let timeBegin;

//time Start button
function recordTimeHandler () {
    const currentTime = new Date();
    timeBegin = currentTime;
    timeStartBtn.classList.add("hidden");
    console.log(timeBegin);
    //this btn appear again when reload. 
};

if (timeStartBtn){
    timeStartBtn.addEventListener("click", recordTimeHandler);
}

//indivisual checkin btn
if (checkedIn){
    checkedIn.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON"){
            return;
        }
        const id = e.target.value;
        let numberOfAbsence = 0;
        let earnedMoney = 0;
        let entryFee = parseInt(e.target.dataset.entryfee);
        let nthMeeting = parseInt(e.target.dataset.nthmeeting);
        nthMeeting += 1;
        console.log(nthMeeting);
        if(e.target.className === "checkBox-Absence"){
            console.log("absence");
            numberOfAbsence = 1;
            //numberOfAbsence plus one
            //numberOfMeeting pluse one
            //no earndmoney 
        }
        if (e.target.className === "checkBox-checkIn"){
            console.log("checkin");
            earnedMoney= entryFee * 0.1;
            //const fullearndMoney = entryFee의 10%
            // earnedMoney = fullearndmoney
            // if(30분안쪽){
            //     earnedMoney = fullearndmoney-1000;
            // } else if(30분에서 1시간 안쪽){
            //     earnedMoney = fullearndmoney-2000;
            // } else if (1시간 이상){
            //     earnedMoney = fullearndmoney-3000;
            // }
        }
        // 회차는 왜 +1이 증가가 리로드되고 나서만 처리되고 버튼을 눌렀을때마다 안되는가.
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
function attendanceDoneHandler (e) {
    // .listBoard-checkBox에 li가 있으면 warning.
    alert("sure?");
    e.preventDefault();
    timeStartBtn.classList.remove("hidden");
    timeBegin = "";
    // console.log(timeBegin);

    //     await fetch('http://localhost:5000', {
    //     method: 'post',
    //     body: JSON.stringify({
    //         name: "Soooo",
    //     })
    //   })
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.success) {
    //         alert("저장 완료");
    //     }
    //   })
}

if (timeFinishBtn){
    timeFinishBtn.addEventListener("click", attendanceDoneHandler);
}


