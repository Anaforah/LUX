let _arrayguide = "0";
let isCreatingGuide = false; // bloqueio de criação

export function getArrayGuide() {
    return _arrayguide;
}

export async function setArrayGuide(value, dificuldade) {
    if (isCreatingGuide) return; // evita chamadas simultâneas
    isCreatingGuide = true;

    _arrayguide = value;

    // Remove o guia antigo se existir
    const oldGuide = document.getElementById('guide-element');
    if (oldGuide) oldGuide.remove();

    try {
        const el = await guide(_arrayguide, dificuldade);
        if (el) {
            el.id = 'guide-element';
            el.style.zIndex = '99999';
            document.body.appendChild(el);
        }
    } catch (error) {
        console.error("[setArrayGuide] Erro ao criar guia:", error);
    } finally {
        isCreatingGuide = false; // libera para próxima execução
    }
}


// Função para criar o conteúdo do guia
export async function guide(chaveTexto, dificuldade) {
    try {
        const response = await fetch("texto/guides.json");
        const data = await response.json();

        if (!data[dificuldade] || !data[dificuldade][chaveTexto]) {
            console.warn(`[createText] Texto não encontrado para chave: ${chaveTexto} na dificuldade: ${dificuldade}`);
            return null;
        }

        const texto = data[dificuldade][chaveTexto];

        const content = document.createElement('div');
        content.style.position = 'absolute';
        content.style.top = '1rem';
        content.style.right = '1rem';
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.gap = '0.8rem';
        content.style.cursor = 'default';
        content.id = 'guide-element';

        const p = document.createElement('p');
        p.innerHTML = "?";
        p.title = "Ajuda";
        p.style.margin = '0';
        p.style.fontSize = '4rem';
        p.style.fontFamily = '"Alegreya SC", serif';
        p.style.fontWeight = '500';
        p.style.color = 'white';
        p.style.cursor = 'pointer'; // Indica que é clicável

        const ajuda = document.createElement('p');
        ajuda.innerHTML = texto;
        ajuda.style.fontSize = '1rem';
        ajuda.style.fontFamily = '"Alegreya SC", serif';
        ajuda.style.fontWeight = '500';
        ajuda.style.color = 'white';
        ajuda.style.maxWidth = '300px';
        ajuda.style.lineHeight = '1.5';
        ajuda.style.display = 'block'; // Visível por padrão

        // Alternância de visibilidade do texto
        let textoVisivel = true;
        p.addEventListener('click', () => {
            textoVisivel = !textoVisivel;
            ajuda.style.display = textoVisivel ? 'block' : 'none';
        });

        content.appendChild(p);
        content.appendChild(ajuda);

        return content;
    } catch (error) {
        console.error("[guides] Erro ao carregar JSON:", error);
        return null;
    }
}
