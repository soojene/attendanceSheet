// const days = document.querySelector(".selectOneDayOfWeek");
// let pickOneDay = document.querySelectorAll(".selectOneDayOfWeek-btn");
// let lists = document.querySelectorAll(".forFilter");
// const filteringMemberBtn = document.querySelector(".filteringMemberBtn");
// const filteringMemberBtns = document.querySelector(".filteringMemberBtns");

// let apple= [];

// if(pickOneDay.length !== 0 && lists.length !== 0){
//     let chooseDay = days.attributes.value.value;
    
//     function selectedDaybgColorFunction (chooseDay) {
//         pickOneDay.forEach(day => {
//             if(day.value === chooseDay){
//                 day.classList.add("selectedDayBgColor");
//             }else{
//                 day.classList.remove("selectedDayBgColor");
//             }
//         });
//     };
    
//     function filteringMember (chooseDay) {
//         apple = [];
//         lists.forEach(member => {
//             if (member.attributes.value.value === chooseDay && member.parentNode.className !== "listBoard-checkedBox"){
//                 member.classList.add("show");
//                 apple.push(member);
//             }else{
//                 member.classList.remove("show");
//             }
//         });
//         if(apple.length === 0){
//             filteringMemberBtn.classList.remove("show");
//             filteringMemberBtns.classList.remove("show");
//         }else{
//             filteringMemberBtn.classList.add("show");
//             filteringMemberBtns.classList.add("show");
//         }
//     };
    
//     days.addEventListener("click", (e) => {
//         e.preventDefault();
//         if(e.target.tagName !== "BUTTON"){
//             return;
//         };
//         if (startCounting) {
//             alert("출첵중입니다. 출석체크를 다 끝내세요")
//             return;
//         };
        
//         chooseDay = e.target.value;
        
//         fetch('/saved', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 chooseDay
//             })
//         });
//         //fetch성공 후 리로드??? // location.reload();
        
//         selectedDaybgColorFunction (chooseDay);
//         filteringMember(chooseDay);
//     });
    
//     selectedDaybgColorFunction (chooseDay);
//     filteringMember (chooseDay);
// };



