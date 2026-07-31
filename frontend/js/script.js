if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        explorar.scrollIntoView({
            behavior: "smooth"
        });
    });
}

function abrirPagina(pagina){
    window.location.href = pagina;
}

const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("mostrar");
        }
    });
},{    threshold:0.2});
cards.forEach(card=>{
    observer.observe(card);
});

window.addEventListener("load",()=>{
    document.querySelector(".hero-content").classList.add("hero-show");
});