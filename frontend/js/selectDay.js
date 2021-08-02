import fetch from 'node-fetch';

const days = document.querySelector(".selectOneDayOfWeek");
const sevendays = days.querySelectorAll("button");
let pickone = days.dataset.day;
// let theDay = "SAT";
// console.log(theDay);

// if (pickone !== theDay){
//     // location.reload();
//     console.log("hahahahah")
// }

    function changeBtnColor () {
        let theDay = "SAT";
        sevendays.forEach((day)=>{
            if(day.value === pickone){
                day.classList.add("selectedDay");
            }else{
                day.classList.remove("selectedDay");
            }
        })
        theDay = pickone;
        // if(){
        //     // location.reload();
        // }
        console.log(theDay);
    }
    
    changeBtnColor();


// if(days){
//     days.addEventListener("click", (e) => {
//         // e.preventDefault();
//         const selectedDay = e.target;
//         if(selectedDay.tagName !== "BUTTON"){
//             return;
//         }
//         theDay = "hoho";
       
//     })
// }

//클릭이벤트시에 리로드되는데 그러면 이벤트안에 있는 처리가 리로드되면서 처리가 다시 원상태로 돌아감. 버블을 막으면 리로드가 안되고 그러면 서버에서 쿼리를 받아서 요일별로 데이터를 보내주는 처리를 못하게됨..

//버튼을 누르는 즉시 색이 변화되는것이 아니라, 버튼을 누르고 value가 서버로 전달되고, 그리고 서버에서 그 value로 데이터를 filter해서 보내고 그리고 서버에서 보낸 데이터를 리로드해서 변경된 화면을 보여줄때 그 value도 바뀌상태로 플론트로 보내진 다음에 리로드될때 자바스크립트가 한번 더 실행되면서 버튼 색이 바뀐다. 그래서 버튼을 누르는 즉시 안되고 리로드 되고 나서 된다. 