const savedPage = document.querySelector(".chartBox-total");

if(savedPage){
    const resetBtn = document.querySelectorAll(".resetCallBtn");

    resetBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            btn.classList.add("hideResetBtn");

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