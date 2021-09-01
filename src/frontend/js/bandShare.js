const btn = document.querySelector(".bandShareBtn");
const chartList = document.querySelectorAll(".chartSaved");
let chart =[];

chartList.forEach(li => {
    let name = li.children[0].innerHTML;
    let savedText = li.children[1].innerHTML;
    let pushList = name + savedText;
    chart.push(pushList);
});

const textChart = chart.toString();        

function handleBandShare () {
    window.open(`https://band.us/plugin/share?body=${textChart}&route=http://localhost:5000/saved`, "band-share", "width=125, height=240, resizable=no");
};

if (btn) {
    btn.addEventListener("click", handleBandShare);
}

//,가 나오면 다음 라인으로 넘겨서 text박스에 나오도록