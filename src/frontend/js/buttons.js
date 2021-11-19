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
        element.classList.add("forFilter");
        const url = `/reset${id}`;
        fetch(url).then(response => {
            if(response.status === 200){
                // element.classList.add("forFilter");
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
        chart.push(text);
    });
    const textChart = chart.join('    ');
    // console.log(textChart);
    bandBtn.addEventListener("click", () => window.open(`https://band.us/plugin/share?body=${textChart}&route=http://localhost:5000/saved`, "band-share", "width=100, height=240, resizable=no"));
}

//chart folded box
const foldBtn = document.getElementById("foldBoxBtn");
if(foldBtn){
    const foldBoxContainner = document.getElementById("foldBoxContainner");
    let switchValue = true;
    foldBtn.addEventListener("click", (e)=> {
        foldBoxContainner.classList.toggle("close");
        if(switchValue){
            foldBtn.classList.remove("fa-chevron-down");
            foldBtn.classList.add("fa-chevron-up");
            switchValue = false;
        } else{
            foldBtn.classList.remove("fa-chevron-up");
            foldBtn.classList.add("fa-chevron-down");
            switchValue = true;
        }
    });
}

const searchBtn = document.querySelector(".searchIcon");
if(searchBtn){
    searchBtn.addEventListener("click", () => {
        const inputValue = document.querySelector(".searchName").value;
        console.log(inputValue);
        if(inputValue === ""){
            // console.log("noting")
            return;
        }
        window.location.href=`/search?name=${inputValue}`;
    })
}