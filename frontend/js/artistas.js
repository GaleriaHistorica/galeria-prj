

const API_URL = "https://sua-api.com/artistas";

let artistas = [];
let artistasFiltrados = [];


const listaArtistas = document.getElementById("listaArtistas");
const campoPesquisa = document.getElementById("buscar");



async function carregarArtistas(){

    try{

        const resposta = await fetch(API_URL);

        if(!resposta.ok){

            throw new Error("Erro ao carregar artistas.");

        }

        artistas = await resposta.json();

        artistasFiltrados = [...artistas];

        renderizarArtistas(artistasFiltrados);

    }

    catch(erro){

        console.error(erro);

        listaArtistas.innerHTML = `

            <div class="erro-api">

                <h2>Não foi possível carregar os artistas.</h2>

                <p>Tente novamente mais tarde.</p>

            </div>

        `;

    }

}

/*==================================================
    RENDERIZAR
==================================================*/

function renderizarArtistas(lista){

    listaArtistas.innerHTML = "";

    lista.forEach((artista)=>{

        const card = document.createElement("article");

        card.className = "card-artista";

        card.dataset.id = artista.id;

        card.innerHTML = `

            <img
                src="${artista.imagem}"
                alt="${artista.nome}"
            >

            <div class="info-artista">

                <h2>${artista.nome}</h2>

                <div class="datas">

                    ${artista.nascimento}
                    -
                    ${artista.morte}

                </div>

                <p>

                    ${artista.descricao}

                </p>

            </div>

            <button
                class="btn-excluir"
                data-id="${artista.id}"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        listaArtistas.appendChild(card);

    });

}

/*==================================================
    PESQUISA
==================================================*/

campoPesquisa.addEventListener("input", ()=>{

    const texto = campoPesquisa.value.toLowerCase();

    artistasFiltrados = artistas.filter((artista)=>{

        return artista.nome.toLowerCase().includes(texto);

    });

    renderizarArtistas(artistasFiltrados);

});

/*==================================================
    INICIAR
==================================================*/

carregarArtistas();
/*==================================================
    MODAL
==================================================*/

const modal = document.getElementById("modal");

const fecharModal = document.getElementById("fecharModal");

const cancelar = document.getElementById("cancelar");

const salvar = document.getElementById("salvar");

const nomeInput = document.getElementById("nome");

const nascimentoInput = document.getElementById("nascimento");

const morteInput = document.getElementById("morte");

const descricaoInput = document.getElementById("descricao");

const imagemPreview = document.getElementById("imagemPreview");

const imagemInput = document.getElementById("imagemInput");

const alterarImagem = document.getElementById("alterarImagem");

let artistaSelecionado = null;

/*==================================================
    ABRIR MODAL
==================================================*/

listaArtistas.addEventListener("click",(evento)=>{

    const botaoExcluir = evento.target.closest(".btn-excluir");

    if(botaoExcluir){

        return;

    }

    const card = evento.target.closest(".card-artista");

    if(!card){

        return;

    }

    const id = Number(card.dataset.id);

    artistaSelecionado = artistas.find((artista)=>artista.id === id);

    if(!artistaSelecionado){

        return;

    }

    preencherModal(artistaSelecionado);

});

/*==================================================
    PREENCHER MODAL
==================================================*/

function preencherModal(artista){

    nomeInput.value = artista.nome;

    nascimentoInput.value = artista.nascimento;

    morteInput.value = artista.morte;

    descricaoInput.value = artista.descricao;

    imagemPreview.src = artista.imagem;

    modal.classList.add("ativo");

}

/*==================================================
    FECHAR MODAL
==================================================*/

function fechar(){

    modal.classList.remove("ativo");

    imagemInput.value = "";

}

fecharModal.addEventListener("click",fechar);

cancelar.addEventListener("click",fechar);

modal.addEventListener("click",(evento)=>{

    if(evento.target === modal){

        fechar();

    }

});

/*==================================================
    ALTERAR IMAGEM
==================================================*/

alterarImagem.addEventListener("click",()=>{

    imagemInput.click();

});

imagemInput.addEventListener("change",(evento)=>{

    const arquivo = evento.target.files[0];

    if(!arquivo){

        return;

    }

    const leitor = new FileReader();

    leitor.onload = function(e){

        imagemPreview.src = e.target.result;

    }

    leitor.readAsDataURL(arquivo);

});

/*==================================================
    SALVAR ALTERAÇÕES
==================================================*/

salvar.addEventListener("click", async ()=>{

    if(!artistaSelecionado){

        return;

    }

    artistaSelecionado.nome = nomeInput.value;

    artistaSelecionado.nascimento = nascimentoInput.value;

    artistaSelecionado.morte = morteInput.value;

    artistaSelecionado.descricao = descricaoInput.value;

    artistaSelecionado.imagem = imagemPreview.src;

    atualizarCard(artistaSelecionado);

    /*
        Quando utilizar uma API CRUD,
        basta descomentar e ajustar o endpoint:

        await fetch(`${API_URL}/${artistaSelecionado.id}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(artistaSelecionado)

        });

    */

    fechar();

});

/*==================================================
    ATUALIZAR CARD
==================================================*/

function atualizarCard(artista){

    const card = document.querySelector(

        `[data-id="${artista.id}"]`

    );

    if(!card){

        return;

    }

    card.querySelector("img").src = artista.imagem;

    card.querySelector("h2").textContent = artista.nome;

    card.querySelector(".datas").textContent =

        `${artista.nascimento} - ${artista.morte}`;

    card.querySelector("p").textContent = artista.descricao;

}
/*==================================================
    ALERTA DE EXCLUSÃO
==================================================*/

const alerta = document.getElementById("alerta");
const btnCancelarExclusao = document.getElementById("naoExcluir");
const btnConfirmarExclusao = document.getElementById("simExcluir");

let artistaExcluir = null;

/*==================================================
    ABRIR ALERTA
==================================================*/

listaArtistas.addEventListener("click",(evento)=>{

    const botao = evento.target.closest(".btn-excluir");

    if(!botao){

        return;

    }

    evento.stopPropagation();

    artistaExcluir = Number(botao.dataset.id);

    alerta.classList.add("ativo");

});

/*==================================================
    CANCELAR
==================================================*/

btnCancelarExclusao.addEventListener("click",()=>{

    alerta.classList.remove("ativo");

    artistaExcluir = null;

});

/*==================================================
    CONFIRMAR EXCLUSÃO
==================================================*/

btnConfirmarExclusao.addEventListener("click", async ()=>{

    if(artistaExcluir === null){

        return;

    }

    try{

        /*
        Caso utilize MockAPI, Firebase ou Supabase,
        basta descomentar este trecho.

        await fetch(`${API_URL}/${artistaExcluir}`,{

            method:"DELETE"

        });

        */

        artistas = artistas.filter(

            artista => artista.id !== artistaExcluir

        );

        artistasFiltrados = artistasFiltrados.filter(

            artista => artista.id !== artistaExcluir

        );

        renderizarArtistas(artistasFiltrados);

        mostrarMensagem(

            "Artista removido com sucesso."

        );

    }

    catch(error){

        mostrarMensagem(

            "Erro ao remover artista.",

            true

        );

        console.error(error);

    }

    alerta.classList.remove("ativo");

    artistaExcluir = null;

});

/*==================================================
    FECHAR ALERTA CLICANDO FORA
==================================================*/

alerta.addEventListener("click",(evento)=>{

    if(evento.target === alerta){

        alerta.classList.remove("ativo");

    }

});

/*==================================================
    TOAST
==================================================*/

function mostrarMensagem(texto,erro=false){

    const toast = document.createElement("div");

    toast.className = "toast";

    if(erro){

        toast.classList.add("erro");

    }

    toast.textContent = texto;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        toast.classList.remove("mostrar");

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}

/*==================================================
    ANIMAÇÃO DOS CARDS
==================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("aparecer");

        }

    });

},{
    threshold:0.15
});

function observarCards(){

    document.querySelectorAll(".card-artista").forEach((card)=>{

        observer.observe(card);

    });

}

/*==================================================
    RECRIAR OBSERVER
==================================================*/

const renderizarOriginal = renderizarArtistas;

renderizarArtistas = function(lista){

    renderizarOriginal(lista);

    observarCards();

};

/*==================================================
    INICIAR
==================================================*/

window.addEventListener("load",()=>{

    carregarArtistas();

});

