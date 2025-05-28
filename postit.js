//postit.js

let postItInstances = new Map();
let postItVisibility = new Map();
let postItClickCount = new Map();


export async function createPostIt(jsonUrl, difficulty, id) {

    const existingPostIt = document.getElementById(id);
    if (existingPostIt) return existingPostIt;


    const response = await fetch(jsonUrl);
    const data = await response.json();
    const pistaTexto = data[difficulty]?.pista || 'Nenhuma pista disponível';

    const postit = document.createElement('div');
    postit.id = id;
    postit.style.position = 'absolute';
    postit.style.bottom = '-120vh';
    postit.style.right = '20vw';
    postit.style.width = '250px';
    postit.style.height = '250px';
    postit.style.zIndex = 9999;
    postit.style.backgroundImage = 'url("blocodenotas.png")';
    postit.style.backgroundSize = 'cover';
    postit.style.backgroundPosition = 'center';
    postit.style.display = 'flex';
    postit.style.flexDirection = 'column';
    postit.style.alignItems = 'center';
    postit.style.justifyContent = 'center';
    postit.style.padding = '20px';
    postit.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.2)';
    postit.style.borderRadius = '10px';
    postit.style.transition = 'bottom 1s ease-in-out';

    postit.offsetHeight;
    
    const textoElement = document.createElement('div');
    textoElement.innerHTML = pistaTexto;
    textoElement.style.fontFamily = '"Alegreya SC", serif';
    textoElement.style.fontSize = '16px';
    textoElement.style.color = '#333';
    textoElement.style.textAlign = 'center';

    postit.appendChild(textoElement);
    document.body.appendChild(postit);
    
    postit.id = id; // Use o ID único
    postItInstances.set(id, postit); // Armazene na Map
    return postit;
}

export function togglePostIt(id) {
    const postIt = postItInstances.get(id);
    if (!postIt) return;

    let clickCount = postItClickCount.get(id) || 0;
    clickCount += 1;
    postItClickCount.set(id, clickCount);

    const isOddClick = clickCount % 2 === 1;

    if (isOddClick) {
        postIt.style.bottom = '20vh';  // aparece
        postItVisibility.set(id, true);
    } else {
        postIt.style.bottom = '-120vh';  // desaparece
        postItVisibility.set(id, false);
    }
}
