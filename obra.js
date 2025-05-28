//obra.js
import { CorrectAnswer } from 'enigmatext.js';

export function animatedimage(imageSrc) {
    const container = document.createElement('div');
    container.style.cssText = `
    position: fixed; // Alterado para fixed
    bottom: -120vh;
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 1s ease-in-out;
    z-index: 10000; // Aumentado para 10000
    width: 100%;
    max-width: 800px;
    pointer-events: none;
`;

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.cssText = `
        width: 100%;
        display: block;
        z-index: 1;
        position: relative;
    `;

    const textTop = createImageText('Texto Superior', '20%');
    const textBottom = createImageText('Texto Inferior', '80%');

    container.appendChild(imageElement);
    container.appendChild(textTop);
    container.appendChild(textBottom);

    if(CorrectAnswer){

    }

    return container;
}


function createImageText(content, topPosition) {
    const text = document.createElement('p');
    text.textContent = content;
    text.style.cssText = `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: ${topPosition};
        color: black;
        background-color: rgba(0, 0, 0, 0.6);
        font-size: 1.5rem;
        font-weight: bold;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
        width: 100%;
        text-align: center;
        pointer-events: none;
        z-index: 9999; /* MAIOR QUE O DA IMAGEM */
        mix-blend-mode: screen;
    `;
    return text;
}

