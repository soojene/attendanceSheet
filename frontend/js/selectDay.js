const days = document.querySelector(".selectOneDayOfWeek");
let pickOneDay = document.querySelectorAll(".selectOneDayOfWeek-btn");
let lists = document.querySelectorAll(".forFilter");
const filteringMemberBtn = document.querySelector(".filteringMemberBtn");
const filteringMemberBtns = document.querySelector(".filteringMemberBtns");

let chooseDay = "SAT";
let apple= [];

if(pickOneDay.length !== 0 && lists.length !== 0){
    chooseDay = days.attributes.value.value;
    // console.log(chooseDay);
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
            if (member.attributes.value.value === chooseDay && member.parentNode.className !== "listBoard-checkedBox"){
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
        }
    };
    
    // if (days){
        days.addEventListener("click", (e) => {
            e.preventDefault();
            if(e.target.tagName !== "BUTTON"){
                return;
            }
            chooseDay = e.target.value;
            selectedDaybgColorFunction (chooseDay);
            filteringMember(chooseDay);

            fetch('/saved', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    chooseDay
                })
            })
            //리로드? 요일을 누르고 업데이트된 데이터를 보려면?//서버에서 rendering하거나.?
        })
    // };
    
    selectedDaybgColorFunction (chooseDay);
    filteringMember (chooseDay);
}



