document.addEventListener('DOMContentLoaded', () => {

    const modalObra = document.getElementById('modalObra');
    const btnAbrirAdicionar = document.getElementById('btnAbrirAdicionar');
    const fecharModalBtn = document.getElementById('fecharModal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formObra = document.getElementById('formObra');
    const tituloModal = document.getElementById('tituloModal');

    // Imagem
    const btnAlterarImagem = document.getElementById('btnAlterarImagem');
    const imagemInput = document.getElementById('imagemInput');
    const imagemPreview = document.getElementById('imagemPreview');

    // Campos do Formulário e Lista
    const selectArtista = document.getElementById('selectArtista');
    const inputNomeObra = document.getElementById('nomeObra');
    const inputDataObra = document.getElementById('dataObra');
    const listaObrasGrid = document.getElementById('listaObras');

    // Imagem Padrão quando o modal abre zerado
    const IMAGEM_PADRAO = 'https://via.placeholder.com/300x300/141618/8e949d?text=Sem+Imagem';
    
    // Função para abrir o modal no modo "Adicionar Nova Obra"
    const abrirModalNovo = () => {
        if (tituloModal) tituloModal.textContent = 'ADICIONAR OBRA';
        formObra.reset();
        imagemPreview.src = IMAGEM_PADRAO;
        modalObra.classList.add('ativo');
    };

    // Função para fechar o modal
    const fecharModal = () => {
        modalObra.classList.remove('ativo');
    };

    // Ouvintes de eventos para fechar/abrir
    if (btnAbrirAdicionar) btnAbrirAdicionar.addEventListener('click', abrirModalNovo);
    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModal);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);

    // Fechar ao clicar no fundo escuro fora da caixa do modal
    modalObra.addEventListener('click', (event) => {
        if (event.target === modalObra) {
            fecharModal();
        }
    });

    btnAlterarImagem.addEventListener('click', () => imagemInput.click());

    imagemInput.addEventListener('change', (event) => {
        const arquivo = event.target.files[0];

        if (arquivo) {
            // Valida se o arquivo ultrapassa 5MB (5 * 1024 * 1024 bytes)
            if (arquivo.size > 5 * 1024 * 1024) {
                alert('O arquivo selecionado é maior que o limite permitido de 5MB.');
                imagemInput.value = ''; // Limpa a seleção
                return;
            }

            const leitor = new FileReader();
            leitor.onload = (e) => {
                imagemPreview.src = e.target.result;
            };
            leitor.readAsDataURL(arquivo);
        }
    });

    // Bloqueia instantaneamente qualquer caractere que NÃO for número ou hífen
    inputDataObra.addEventListener('input', (e) => {
        const apenasNumerosEHifen = e.target.value.replace(/[^0-9-]/g, '');
        
        if (e.target.value !== apenasNumerosEHifen) {
            e.target.value = apenasNumerosEHifen;
        }
    });

    formObra.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrao da pagina

        // Validações de segurança
        if (!selectArtista.value) {
            alert('Por favor, selecione um artista.');
            return;
        }

        if (!inputNomeObra.value.trim()) {
            alert('Por favor, informe o nome da obra.');
            return;
        }

        if (!inputDataObra.value.trim()) {
            alert('Não é permitido o uso de letras e outros símbolos na data. Por favor insira um ano válido.');
            return;
        }

        // Obtém o nome visível do artista selecionado no <select>
        const nomeArtistaTexto = selectArtista.options[selectArtista.selectedIndex].text;

        // Cria o objeto da nova obra
        const novaObra = {
            artista: nomeArtistaTexto,
            nome: inputNomeObra.value.trim(),
            data: inputDataObra.value.trim(),
            imagem: imagemPreview.src !== IMAGEM_PADRAO ? imagemPreview.src : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600'
        };

        // Renderiza o card no container da página
        renderizarCardObra(novaObra);

        // Alerta de sucesso e encerramento
        alert('Obra salva com sucesso!');
        fecharModal();
    });

    function renderizarCardObra(obra) {
        const cardHTML = `
            <div class="card-obra">
                <div class="card-thumb">
                    <img src="${obra.imagem}" alt="${obra.nome}">
                </div>
                <div class="card-info">
                    <h3>${obra.nome}</h3>
                    <p class="artista-nome">${obra.artista}</p>
                    <span class="obra-data">${obra.data}</span>
                </div>
            </div>
        `;
        listaObrasGrid.insertAdjacentHTML('afterbegin', cardHTML);
    }

});