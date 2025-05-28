// config.js

import { getDifficulty, setDifficulty } from '/initializephrases.js';
export function config() {
    // Cria a camada de fundo
    let currentDifficulty = getDifficulty();
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backdropFilter = 'blur(10px)';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.id = 'config-screen';

    // Texto explicativo
    const description = document.createElement('p');
    description.innerHTML = 'Este projeto foi no âmbito de Comunicação Multimédia<br> da Licenciatura Design e Multimédia<br>realizado por Ana Almeida e Bernardo Tavares';
    description.style.fontFamily = '"Alegreya SC", serif';
    description.style.color = '#ddd';
    description.style.fontSize = '1.2rem';
    description.style.maxWidth = '60%';
    description.style.textAlign = 'center';
    description.style.marginBottom = '3rem';

    // Cria o container dos botões lado a lado
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '1rem'; // Espaço entre os botões
    buttonContainer.style.marginTop = '1rem';
    buttonContainer.style.flexWrap = 'wrap';
    buttonContainer.style.justifyContent = 'center';

    // Botão de recarregar
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Refresh';
    retryButton.classList.add('remove-btn');
    retryButton.addEventListener('click', () => {
        window.location.reload();
    });

    // Botão de alterar dificuldade
    const changedifficulty = document.createElement('button');
    changedifficulty.textContent = `Alterar dificuldade: ${currentDifficulty}`;
    changedifficulty.classList.add('remove-btn');
    changedifficulty.addEventListener('click', () => {
        // Usa a função setter para modificar o valor
        if (currentDifficulty === "Fácil") {
            setDifficulty("Difícil");
        } else {
            setDifficulty("Fácil");
        }
        
        // Atualiza a variável local e o texto do botão
        currentDifficulty = getDifficulty();
        changedifficulty.textContent = `Alterar dificuldade: ${currentDifficulty}`;
    });

    // Adiciona os botões ao container
    buttonContainer.appendChild(retryButton);
    buttonContainer.appendChild(changedifficulty);

    // Monta tudo no overlay
    overlay.appendChild(description);
    overlay.appendChild(buttonContainer);

    // Adiciona ao DOM
    return overlay;
}

