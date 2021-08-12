
// const selectNth = document.querySelectorAll(".selectNth");
// const nthEarnedMoney = document.querySelectorAll(".nthEarndMoney");


// if (selectNth && nthEarnedMoney){

//     function eachFeeInput (id, fee) {
//         nthEarnedMoney.forEach(input => {
//             if(id === input.parentNode.dataset.label){
//                 input.value = parseInt(fee);
//             }
//         })
//     }

//     selectNth.forEach((select) => {
//         let id = select.parentNode.dataset.label;
//         let value = select[0].childNodes;
//         if (value !== ""){
//             console.log(value);
//             eachFeeInput(id, value);
//         };

//         select.addEventListener("change", (e) =>{
//             e.preventDefault();
//             const id = e.target.parentNode.dataset.label; 
//             const value = e.target.value;
//             eachFeeInput(id, value);
//         })
//     })
// }