document.addEventListener('DOMContentLoaded', () => {

    const modalObra = document.getElementById('modalObra');
    const fecharModalBtn = document.getElementById('fecharModal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formObra = document.getElementById('formObra');

    // Elementos de Imagem
    const btnAlterarImagem = document.getElementById('btnAlterarImagem');
    const imagemInput = document.getElementById('imagemInput');
    const imagemPreview = document.getElementById('imagemPreview');

    // Elementos do Formulário
    const inputDataObra = document.getElementById('dataObra');
    const inputNomeObra = document.getElementById('nomeObra');
    const selectArtista = document.getElementById('selectArtista');
    
    const abrirModal = () => {
        modalObra.classList.add('ativo');
    };

    const fecharModal = () => {
        modalObra.classList.remove('ativo');
    };
  
    fecharModalBtn.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    modalObra.addEventListener('click', (event) => {
        if (event.target === modalObra) {
            fecharModal();
        }
    });

    btnAlterarImagem.addEventListener('click', () => {
        imagemInput.click();
    });

    imagemInput.addEventListener('change', (event) => {
        const arquivo = event.target.files[0];

        if (arquivo) {
        
            if (arquivo.size > 5 * 1024 * 1024) {
                alert('O arquivo selecionado é maior que o limite de 5MB.');
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
    
    inputDataObra.addEventListener('input', (e) => {
        
        const apenasNumeros = e.target.value.replace(/[^0-9-]/g, '');
        
        if (e.target.value !== apenasNumeros) {
            e.target.value = apenasNumeros;
        }
    });

    formObra.addEventListener('submit', (event) => {
        event.preventDefault(); 

        if (!inputNomeObra.value.trim()) {
            alert('Por favor, informe o nome da obra.');
            return;
        }

        if (!inputDataObra.value.trim()) {
            alert('Por favor, insira uma data válida contendo apenas números.');
            return;
        }

        const dadosObra = {
            artista: selectArtista.value,
            nomeObra: inputNomeObra.value.trim(),
            data: inputDataObra.value.trim(),
            imagemSrc: imagemPreview.src
        };

        console.log('Dados salvos com sucesso:', dadosObra);

        alert('Alterações salvas com sucesso!');

        fecharModal();
    });

});