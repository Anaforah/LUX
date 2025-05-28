export let CorrectAnswer = false;

export async function createText(jsonUrl, dificuldade, chaveTexto, topPosition) {
    console.log("[createText] Dificuldade recebida:", dificuldade); // Debug

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        if (!data[dificuldade] || !data[dificuldade][chaveTexto]) {
            console.warn(`[createText] Texto não encontrado para dificuldade: ${dificuldade}, chave: ${chaveTexto}`);
            return null;
        }

        const texto = data[dificuldade][chaveTexto];

        const p = document.createElement('p');
        p.innerHTML = texto;
        p.style.position = 'absolute';
        p.style.top = topPosition;
        p.style.left = '50%';
        p.style.transform = 'translateX(-50%)';
        p.style.textAlign = 'center';
        p.style.color = 'white';
        p.style.fontSize = '1.4rem';
        p.style.fontFamily = 'Alegreya SC, serif';
        p.style.width = '80vw';

        return p;
    } catch (error) {
        console.error("[createText] Erro ao carregar JSON:", error);
        return null;
    }
}


export async function createInput(jsonUrl, dificuldade, topPosition) {
    console.log("[createInput] Dificuldade recebida:", dificuldade);

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        console.log("Dados carregados:", data);
        console.log("Resposta dentro de", dificuldade, ":", data[dificuldade]?.resposta);

        if (!data[dificuldade]?.resposta) {
            console.warn(`[createInput] Resposta não encontrada para dificuldade: ${dificuldade}`);
            return null;
        }

        const respostaCorretaTexto = data[dificuldade].resposta.trim().toLowerCase();
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = "Escreva a sua resposta";
        input.classList.add('input-resposta');
        input.style.top = topPosition;

        // Evento para verificar a resposta ao pressionar Enter
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const valorDigitado = input.value.trim().toLowerCase();
                if (valorDigitado === respostaCorretaTexto) {
                    CorrectAnswer = true;
                    input.disabled = true; // desabilita o input se quiser
                    input.style.backgroundColor = "#b6fcb6"; // opcional: feedback visual
                } else {
                    input.style.backgroundColor = "#fcb6b6"; // opcional: feedback visual
                }
            }
        });

        return input;
    } catch (error) {
        console.error("[createInput] Erro ao carregar JSON:", error);
        return null;
    }
}
