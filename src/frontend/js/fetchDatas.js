const fetchBtn = document.querySelector(".goFetch");

let array;

if (fetchBtn){
    function bring () {
        console.log("clicked");
        fetch("http://localhost:5000/goFetch")
        .then((response) => response.json())
        .then((data) => {
            array = data.members;
            console.log(array);
        });
    }
    fetchBtn.addEventListener("click", bring )
}