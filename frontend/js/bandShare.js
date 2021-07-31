const btn = document.querySelector(".bandShareBtn");
const chartList = document.querySelectorAll(".chartSaved");
// console.log(chartList);
let chart =[];

chartList.forEach(li => {
    let name = li.children[0].innerHTML;
    let savedText = li.children[1].innerHTML;
    // let entryFee = li.children[1].innerHTML;
    // let NumberOfAbsence = li.children[2].innerHTML;
    // let extraFee = li.children[3].innerHTML;
    // let earn = li.children[4].innerHTML;
    // let pay = li.children[5].innerHTML;
    // let pushList = `${name} ${entryFee}:${NumberOfAbsence} ${extraFee} ${earn} ${pay}.`;
    let pushList = name + savedText;
    chart.push(pushList);
});

const textChart = chart.toString();        

function handleBandShare () {
    window.open(`https://band.us/plugin/share?body=${textChart}&route=http://localhost:5000/saved`, "band-share", "width=120, height=240, resizable=no");
};

if (btn) {
    btn.addEventListener("click", handleBandShare);
}