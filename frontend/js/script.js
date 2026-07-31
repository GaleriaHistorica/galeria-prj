// ===============================// GALERIA DE ARTES// script.js// ===============================
// Botõesconst btnEntrar = document.getElementById("btnEntrar");const scrollDown = document.getElementById("scrollDown");
// Seção Explorarconst explorar = document.getElementById("explorar");
// ===============================// Scroll suave ao clicar em Entrar// ===============================
if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        explorar.scrollIntoView({
            behavior: "smooth"
        });
    });
}
// ===============================// Scroll pela seta// ===============================
if (scrollDown) {
    scrollDown.addEventListener("click", () => {
        explorar.scrollIntoView({
            behavior: "smooth"
        });
    });
}
// ===============================// Navegação dos cards// ===============================
function abrirPagina(pagina){
    window.location.href = pagina;
}
// ===============================// Animação de entrada// ===============================
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
// ===============================// Animação do Hero// ===============================
window.addEventListener("load",()=>{
    document.querySelector(".hero-content").classList.add("hero-show");
});