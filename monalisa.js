// monalisa.js
export function monalisa(imageSrc, positionbottom, widthimage, left, clicavel = false, customId = 'monalisa-container') {
    // Verifica se o elemento já existe
    const existing = document.getElementById(customId);
    if (existing) return existing;

    const container = document.createElement('div');
    container.id = customId;
    container.style.position = 'absolute';
    container.style.bottom = positionbottom;
    container.style.left = left;
    container.style.transform = 'translateX(-50%)';
    container.style.transition = 'bottom 1s ease-in-out';
    container.style.zIndex = '9999';
    container.style.width = widthimage;
    container.style.pointerEvents = clicavel ? 'auto' : 'none';

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.width = widthimage;
    imageElement.style.pointerEvents = 'none';

    container.appendChild(imageElement);

    let isVisible = positionbottom === '10vh';

    if (!clicavel) {
        // Só cria o botão X se clicavel for false
        const closeButton = document.createElement('div');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20%';
        closeButton.style.right = '30%';
        closeButton.style.color = 'white';
        closeButton.style.padding = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '30px';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.borderRadius = '50%';
        closeButton.style.pointerEvents = 'auto';

        container.appendChild(closeButton);

        closeButton.addEventListener('click', () => {
            container.style.bottom = isVisible ? '-120vh' : '10vh';
            isVisible = !isVisible;
        });
    }

    return container;
}
