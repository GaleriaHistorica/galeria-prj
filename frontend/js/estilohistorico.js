document.addEventListener('DOMContentLoaded', () => {
    const modalPeriodo = document.getElementById('modalPeriodo');
    const fecharModalBtn = document.getElementById('fecharModal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formPeriodo = document.getElementById('formPeriodo');

    const btnAlterarImagem = document.getElementById('btnAlterarImagem');
    const imagemInput = document.getElementById('imagemInput');
    const imagemPreview = document.getElementById('imagemPreview');

    const inputTitulo = document.getElementById('tituloPeriodo');
    const inputAnoData = document.getElementById('anoDataPeriodo');
    const inputMovimento = document.getElementById('movimentoArtistico');
    const inputSubperiodo = document.getElementById('subperiodo');
    const selectEra = document.getElementById('eraCronologica');
    const txtDescricao = document.getElementById('descricaoPeriodo');

    const abrirModal = () => modalPeriodo.classList.add('ativo');
    const fecharModal = () => modalPeriodo.classList.remove('ativo');

    fecharModalBtn.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    modalPeriodo.addEventListener('click', (event) => {
        if (event.target === modalPeriodo) {
            fecharModal();
        }
    });

    btnAlterarImagem.addEventListener('click', () => imagemInput.click());

    imagemInput.addEventListener('change', (event) => {
        const arquivo = event.target.files[0];

        if (arquivo) {
            if (arquivo.size > 5 * 1024 * 1024) {
                alert('O arquivo selecionado excede o limite de 5MB.');
                imagemInput.value = '';
                return;
            }

            const leitor = new FileReader();
            leitor.onload = (e) => {
                imagemPreview.src = e.target.result;
            };
            leitor.readAsDataURL(arquivo);
        }
    });

    inputAnoData.addEventListener('input', (e) => {
        const apenasValidos = e.target.value.replace(/[^0-9\s-]/g, '');
        if (e.target.value !== apenasValidos) {
            e.target.value = apenasValidos;
        }
    });

    formPeriodo.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!inputTitulo.value.trim()) {
            alert('Por favor, informe o título do período histórico.');
            return;
        }

        if (!inputAnoData.value.trim()) {
            alert('Não é permitido o uso de letras e outros símbolos na data. Por favor insira um número válido.');
            return;
        }

        const dadosPeriodo = {
            titulo: inputTitulo.value.trim(),
            anoData: inputAnoData.value.trim(),
            movimento: inputMovimento.value.trim(),
            subperiodo: inputSubperiodo.value.trim(),
            era: selectEra.value,
            descricao: txtDescricao.value.trim(),
            imagemSrc: imagemPreview.src
        };

        console.log('Período histórico salvo:', dadosPeriodo);
        alert('Período histórico salvo com sucesso!');
        fecharModal();
    });

});