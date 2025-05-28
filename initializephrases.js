export let selectedDifficulty = null;

// Funções para acesso controlado
export function getDifficulty() {
    return selectedDifficulty;
}

export function setDifficulty(newDifficulty) {
    selectedDifficulty = newDifficulty;
}

export function startPhrases(arrayphrases = [
    'O último guardião do segredo do Priorado de Sião foi assassinado.',
    'Agora, cabe a ti salvar o Santo Graal e proteger <br>o legado de Maria Madalena.',
    'Segue as pistas, decifra os enigmas<br> e revela a verdade antes que seja tarde demais.'
]) {
    return new Promise((resolve) => {
        const tela = document.querySelector('.phrases');
        if (!tela) {
            console.error("Elemento com a classe '.phrases' não encontrado.");
            return;
        }

        // Etapa 2: Frase + botões de dificuldade
        const showDifficultyIntro = () => {
            tela.innerHTML = "";
            const container = document.createElement('div');
            container.classList.add('center-container');

            const phrase = document.createElement('p');
            phrase.classList.add('text');
            phrase.innerHTML = 'Este jogo pode ter alguns enigmas mais complexos. Escolhe o nível de dificuldade que desejas';
            container.appendChild(phrase);

            setTimeout(() => phrase.classList.add('fade-in'), 10);

            const divButtons = document.createElement('div');
            divButtons.classList.add('button-div');

            divButtons.appendChild(createDifficultyButton("Fácil"));
            divButtons.appendChild(createDifficultyButton("Difícil"));

            container.appendChild(divButtons);
            tela.appendChild(container);
        };

        const createDifficultyButton = (label) => {
            const button = document.createElement('button');
            button.textContent = label;
            button.classList.add('remove-btn');

            button.addEventListener('click', () => {
                selectedDifficulty = label;
                tela.innerHTML = "";
                showPhrases();
            });

            return button;
        };

        // Etapa 3: Mostrar frases com imagens
        const showPhrases = () => {
            let position = 0;
            let skipped = false;

            const skipButton = document.createElement('button');
            skipButton.textContent = 'Skip >>>';
            skipButton.style.position = 'fixed';
            skipButton.style.bottom = '1rem';
            skipButton.style.right = '1rem';
            skipButton.style.zIndex = '10000';
            skipButton.style.background = 'none';
            skipButton.style.color = '#D9D9D9';
            skipButton.style.border = 'none';
            skipButton.style.fontSize = '1.5rem';
            skipButton.style.fontFamily = '"Alegreya SC", serif';
            skipButton.style.cursor = 'pointer';

            skipButton.addEventListener('click', () => {
                skipped = true;
                tela.remove();
                skipButton.remove();
                resolve();
            });

            document.body.appendChild(skipButton);

            const phraseschanging = () => {
                if (skipped) return;

                tela.innerHTML = '';

                if (position < arrayphrases.length) {
                    const container = document.createElement('div');
                    container.classList.add('center-container');

                    const img = document.createElement('img');
                    img.src = `${position}.png`;
                    img.alt = `Imagem ${position}`;
                    img.classList.add('phrase-image');
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 1s ease';

                    const p = document.createElement('p');
                    p.classList.add('text');
                    p.innerHTML = arrayphrases[position];
                    p.style.opacity = '0';
                    p.style.transition = 'opacity 1s ease';

                    container.appendChild(img);
                    container.appendChild(p);
                    tela.appendChild(container);

                    setTimeout(() => {
                        img.style.opacity = '1';
                        p.style.opacity = '1';
                    }, 10);

                    position++;

                    if (position === arrayphrases.length) {
                        setTimeout(() => {
                            if (!skipped) {
                                tela.remove();
                                skipButton.remove();
                                resolve();
                            }
                        }, 5000);
                    } else {
                        setTimeout(phraseschanging, 5000);
                    }
                }
            };

            phraseschanging();
        };

        // Etapa 1: Mostrar logo + botão Entrar
        tela.innerHTML = "";
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('center-container');

        const logo = document.createElement('img');
        logo.src = `logo.png`; // imagem de entrada fixa
        logo.alt = `Logo`;
        logo.classList.add('phrase-image');
        logo.style.opacity = '0';
        logo.style.transition = 'opacity 1s ease';

        setTimeout(() => {
            logo.style.opacity = '1';
        }, 10);

        const entrarButton = document.createElement('button');
        entrarButton.textContent = 'Entrar';
        entrarButton.classList.add('remove-btn');

        contentContainer.appendChild(logo);
        contentContainer.appendChild(entrarButton);
        tela.appendChild(contentContainer);

        entrarButton.addEventListener('click', () => {
            tela.innerHTML = "";
            showDifficultyIntro();
        });
    });
}
