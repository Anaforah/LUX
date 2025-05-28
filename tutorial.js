//tutorial.js
export function showTutorialHint() {
    const hints = [
        {
            text: 'Clique e arraste para se mover;<br> Afaste/Aproxime os dedos para ampliar/reduzir',
            icon: '/tutorial/nav.png'
        },
        {
            text: 'Acompanhe as pistas no canto superior direito',
            icon: '/tutorial/help.png'
        },
        {
            text: 'Em baixo centrado estará o menu de elementos guardados<br> que usará posteriormente',
            icon: '/tutorial/menu.png'
        },
        {
            text: 'Ao responder pressione "Enter" para continuar',
            icon: '/tutorial/resposta.png'
        }
    ];

    let currentIndex = 0;

    // Criar sobreposição escura
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    // Criar modal
    const modal = document.createElement('div');
    modal.style.width = '40vw';
    modal.style.height = '50vh';
    modal.style.backgroundColor = '#EDEDED';
    modal.style.borderRadius = '10px';
    modal.style.padding = '2rem';
    modal.style.position = 'relative';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.justifyContent = 'space-between';
    modal.style.alignItems = 'center';
    modal.style.textAlign = 'center';
    modal.style.gap = '1rem';

    // Botão "X"
    const closeButton = document.createElement('button');
    closeButton.innerText = '✕';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0.5rem';
    closeButton.style.right = '0.5rem';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontFamily = '"Alegreya SC", serif';
    closeButton.style.fontSize = '1.8rem';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => overlay.remove());
    modal.appendChild(closeButton);

    // Contentor do hint
    const hintContainer = document.createElement('div');
    hintContainer.style.display = 'flex';
    hintContainer.style.flexDirection = 'column';
    hintContainer.style.alignItems = 'center';
    hintContainer.style.gap = '1rem';

    const img = document.createElement('img');
    img.style.width = '80%';
    img.style.height = 'auto';

    const text = document.createElement('p');
    text.style.margin = '0';
    text.style.color = '#000';
    text.style.fontFamily = '"Alegreya SC", serif';
    text.style.fontSize = '1.1rem';

    hintContainer.appendChild(img);
    hintContainer.appendChild(text);

    // Função para atualizar o hint atual
    function updateHint(index) {
        const hint = hints[index];
        img.src = hint.icon;
        img.alt = 'tutorial icon';
        text.innerHTML = hint.text;
        prevButton.disabled = index === 0;
        nextButton.disabled = index === hints.length - 1;
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }

    // Estilo comum para botões de navegação
    const buttonStyle = `
        padding: 10px 25px;
        font-size: 1rem;
        background-color: #B09172;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        transition: background-color 0.3s ease;
        white-space: nowrap;
    `;

    // Controles de navegação
    const navContainer = document.createElement('div');
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'center';
    navContainer.style.gap = '1.5rem';

    const prevButton = document.createElement('button');
    prevButton.innerText = '←';
    prevButton.style.cssText = buttonStyle;
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateHint(currentIndex);
        }
    });

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo →';
    nextButton.style.cssText = buttonStyle;
    nextButton.addEventListener('click', () => {
        if (currentIndex < hints.length - 1) {
            currentIndex++;
            updateHint(currentIndex);
        }
    });

    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);

    modal.appendChild(hintContainer);
    modal.appendChild(navContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Mostrar o primeiro hint
    updateHint(currentIndex);
}
