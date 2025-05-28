// gameover.js
export function gameover() {
    // Cria a camada de fundo
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
    overlay.id = 'gameover-screen';

    // Título
    const title = document.createElement('h1');
    title.textContent = 'Game Over';
    title.style.fontFamily = '"Alegreya SC", serif';
    title.style.color = '#fff';
    title.style.fontSize = '4rem';
    title.style.marginBottom = '2rem';

    // Texto explicativo
    const description = document.createElement('p');
    description.innerHTML = 'A senha inserida estava incorreta;<br> a delicada ampola de vidro com ácido foi acidentalmente pressionada,<br>destruindo a mensagem e apagando para sempre<br> a localização do Santo Graal.';
    description.style.fontFamily = '"Alegreya SC", serif;';
    description.style.color = '#ddd';
    description.style.fontSize = '1.2rem';
    description.style.maxWidth = '60%';
    description.style.textAlign = 'center';
    description.style.marginBottom = '3rem';

    // Botão de retry no mesmo estilo de outros botões
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Voltar';
    retryButton.classList.add('remove-btn'); // usa mesma classe do seu botão
    retryButton.addEventListener('click', () => {
        window.location.reload(); // recarrega a página
    });

    // Monta tudo no overlay
    overlay.appendChild(title);
    overlay.appendChild(description);
    overlay.appendChild(retryButton);

    // Adiciona ao DOM
    return overlay;
}
