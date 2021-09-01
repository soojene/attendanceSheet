const savedPage = document.querySelector(".chartBox-total");

if(savedPage){
    const resetBtn = document.querySelectorAll(".resetCallBtn");

    resetBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            btn.classList.add("hideResetBtn");
            btn.previousSibling.innerText="입금 확인";
            fetch('/reset', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id
                })
            })
        })
    })
}