
//code정리 && async await 체크
function sendData (url){
    // fetch(url).then((response) => {
    // // return response.status;
    // if(response.status === 200){
    //     console.log(response.status);
    // }else{
    //     console.log("cannot reset");
    // }
    // });
};

//reset attendance
const chartBoxUl = document.querySelector(".resetBtnUl");
if(chartBoxUl){
    chartBoxUl.addEventListener("click", (e) => {
        if(e.target.tagName !== "BUTTON"){
            return;
        } 
        e.preventDefault();
        const element = e.target;
        const id = element.dataset.id;
        const url = `/reset${id}`;
        fetch(url).then(response => {
            if(response.status === 200){
                element.classList.add("forFilter");
                // element.innerText="입금 확인";
            }else{
                console.log("cannot delete:", response.error);
            }
        })
        
    })
}

//delete member (if user wanna delet a member but stay same page)
const deleteBtn = document.querySelector(".deletBtnInUl");
if(deleteBtn){
    // deleteBtn.addEventListener("click", (e) => {
    //     if(e.target.tagName !== "I"){
    //         return;
    //     } 
    //     const element = e.target.parentNode.parentElement;
    //     const id = element.dataset.memberid;
    //     const url = `/delete${id}`;
    //     fetch(url).then(response => {
    //         if(response.status === 200){
    //             console.log(response.status);
    //             element.classList.add("forFilter");
    //             element.classList.remove("formLi-edit");
    //         }else{
    //             console.log("cannot delete")
    //         }
    //     });
    // })
};

//Band share
const bandBtn = document.querySelector(".bandShareBtn");
if (bandBtn) {
    const chartList = document.querySelectorAll(".chartSaved");
    let chart =[];
    chartList.forEach(li => {
        let text = li.children[0].innerHTML;
        // let savedText = li.children[0].children[1].innerHTML;
        let pushList = text;
        chart.push(pushList);
    });
    const textChart = chart.toString(); 
    bandBtn.addEventListener("click", () => window.open(`https://band.us/plugin/share?body=${textChart}&route=http://localhost:5000/saved`, "band-share", "width=125, height=240, resizable=no"));
}