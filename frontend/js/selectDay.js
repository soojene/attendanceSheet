const days = document.querySelector(".selectOneDayOfWeek");
const pickOneDay = days.querySelectorAll("button");
const lists = document.querySelectorAll(".forFilter");
const filteringMemberBtn = document.querySelector(".filteringMemberBtn");
const filteringMemberBtns = document.querySelector(".filteringMemberBtns");
//요일이 서버로 보내져서 미들웨어에 저장되었다가 리도드되었을때 마지막으로 선택한 요일이 그래도 선택되어 보여지면 좋을듯.
let chooseDay = "SAT";
let apple= [];

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
    apple = [];
    lists.forEach(member => {
        if (member.attributes.value.value === chooseDay){
            member.classList.add("show");
            apple.push(member);
        }else{
            member.classList.remove("show");
        }
    });

    if(apple.length === 0){
        filteringMemberBtn.classList.remove("show");
        filteringMemberBtns.classList.remove("show");
    }else{
        filteringMemberBtn.classList.add("show");
        filteringMemberBtns.classList.add("show");
    };
}

if (days){
    days.addEventListener("click", (e) => {
        e.preventDefault();
        if(e.target.tagName !== "BUTTON"){
            return;
        }
        chooseDay = e.target.value;

        
        selectedDaybgColorFunction (chooseDay)
        filteringMember(chooseDay);
    })
}

selectedDaybgColorFunction (chooseDay)
filteringMember (chooseDay);


