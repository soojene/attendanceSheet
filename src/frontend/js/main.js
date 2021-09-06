import "../scss/style.scss";

// import "./attendance";

import "./fetchDatas";

import "./checking";
import "./buttons";
// import "./bandShare";

const foldBtn = document.getElementById("foldBoxBtn");
const foldBoxContainner = document.getElementById("foldBoxContainner");
let switchValue = true;

if(foldBtn){
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

//take off doneBtn.class forFilter when attendance all done.