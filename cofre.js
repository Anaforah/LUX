//cofre.js
export function cofre(id, imageSrc, positionbottom, widthimage, left, clicavel = false, inputToHide = null) {
    const existing = document.getElementById(id);
    
    // Se já existe, ainda assim devolve um objeto com os métodos reais
    if (existing) {
        return {
            element: existing,
            updateImage: (newSrc) => {
                const img = existing.querySelector('img');
                if (img && typeof newSrc === 'string') {
                    img.src = newSrc;
                }
            },
            setPosition: (newBottom, comAnimacao = true) => {
                existing.style.transition = comAnimacao ? 'bottom 1s ease-in-out' : 'none';
                existing.style.bottom = newBottom;
            },
            setInputToHide: (inputEl) => {
                existing._inputToHide = inputEl;
            }
        };
    }

    const cofreInstance = {
        element: null,
        updateImage: null,
        setPosition: null,
        setInputToHide: null
    };

    const container = document.createElement('div');
    container.id = id;
    container.style.width = widthimage;
    container.style.aspectRatio = '1280 / 700';
    container.style.position = 'absolute';
    container.style.bottom = positionbottom;
    container.style.left = left;
    container.style.transform = 'translateX(-50%)';
    container.style.overflow = 'hidden';
    container.style.zIndex = '9998';

    let _inputToHide = inputToHide; // escopo local privado

    cofreInstance.setInputToHide = (inputEl) => {
        _inputToHide = inputEl;
        container._inputToHide = inputEl; // salva também no DOM se for reutilizado
    };

    cofreInstance.setPosition = (newBottom, comAnimacao = true) => {
        container.style.transition = comAnimacao ? 'bottom 1s ease-in-out' : 'none';
        container.style.bottom = newBottom;
    };

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.objectFit = 'cover';
    imageElement.style.position = 'absolute';
    imageElement.style.top = '0';
    imageElement.style.left = '0';

    cofreInstance.updateImage = (newSrc) => {
        if (typeof newSrc === 'string') {
            imageElement.src = newSrc;
        }
    };

    if (!clicavel) {
        const closeButton = document.createElement('div');
        closeButton.textContent = 'X';
        closeButton.style.color = 'white';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20%';
        closeButton.style.right = '30%';
        closeButton.style.zIndex = '9999';
        closeButton.style.fontSize = '30px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.pointerEvents = 'auto';

        closeButton.addEventListener('click', () => {
            container.style.transition = 'bottom 1s ease-in-out';
            container.style.bottom = '-120vh';

            const input = _inputToHide || container._inputToHide;

            if (input) {
                input.style.transition = 'bottom 1s ease-in-out';
                input.style.position = 'absolute';
                input.style.bottom = getComputedStyle(container).bottom;
                input.style.left = container.style.left;

                requestAnimationFrame(() => {
                    input.style.bottom = '-120vh';
                });
            }
        });

        container.appendChild(closeButton);
    }

    container.appendChild(imageElement);
    cofreInstance.element = container;

    return cofreInstance;
}
