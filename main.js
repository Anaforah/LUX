import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { buttonmenu , light, lightState, createLightButton } from '/lightmenu.js';
import { startPhrases , selectedDifficulty } from '/initializephrases.js';
import { resizecanvas } from '/resizecanvas.js';
import { createText , createInput, CorrectAnswer } from '/enigmatext.js';
import { monalisa } from '/monalisa.js';
import { cofre } from '/cofre.js';
import { setArrayGuide } from '/guides.js';
import { createPostIt } from '/postit.js';
import { finalscene } from '/finalscene.js';
import { gameover } from '/gameover.js';
import { config } from '/config.js';
import { showTutorialHint } from '/tutorial.js';

let botaoElementfluer; // <-- só declarando, sem criar ainda
let botaoElementfibonacci; // agora é global
let botaoFleurCriado = false;
let fibonacciBotaoCriado = false;
let textTopClicked = false;

const activeTimeouts = {
    guide42: null,
    guide15: null,
    guide162: null
};

let postItVisivel = false;
let postItElemento = null;

let botoes = [];
let funcoes = [];

// Inicia frases e define controle de clique

window.canClick = false;

function cancelAllTimeouts() {
    Object.keys(activeTimeouts).forEach(key => {
        if (activeTimeouts[key]) {
            clearTimeout(activeTimeouts[key]);
            activeTimeouts[key] = null;
        }
    });
}

startPhrases().then(() => {
    setArrayGuide("0", selectedDifficulty);
    window.canClick = true;

    if (!document.getElementById('botao-luz')) {
        const botao1 = createLightButton({ iconSrc: 'icones/icone.svg' });
        botao1.wrapper.id = 'botao-luz';
        buttonmenu([light], [botao1.wrapper]);
      }

    //botão superior esquerdo
    // 1. Criar botão
    const botaoTopoEsquerda = createLightButton({
        iconSrc: 'icones/info.svg',
        width: '30px', 
        height: '30px',
    });
    
    // Ajustar o tamanho do contentor (wrapper)
    
    botaoTopoEsquerda.wrapper.style.width = 'fit-content';
    botaoTopoEsquerda.wrapper.style.padding = '10px';
    botaoTopoEsquerda.wrapper.style.height = 'fit-content';
    botaoTopoEsquerda.wrapper.style.display = 'flex';
    botaoTopoEsquerda.wrapper.style.alignItems = 'center';
    botaoTopoEsquerda.wrapper.style.justifyContent = 'center';
    botaoTopoEsquerda.wrapper.style.position = 'fixed';
    botaoTopoEsquerda.wrapper.style.top = '20px';
    botaoTopoEsquerda.wrapper.style.left = '20px';
    botaoTopoEsquerda.wrapper.style.zIndex = '100001';

    
       // Ação de clique
       botaoTopoEsquerda.wrapper.addEventListener('click', (event) => {
        const currentColor = getComputedStyle(botaoTopoEsquerda.wrapper).backgroundColor;

  // 🔁 Alternar entre as cores
  botaoTopoEsquerda.wrapper.style.backgroundColor =
    currentColor === 'rgb(228, 217, 206)' ? '#B09172' : '#E4D9CE';
        event.stopPropagation();
        
        console.log("Botão do canto superior esquerdo clicado!");
    
        const existingOverlay = document.getElementById('config-screen');
        
        if (existingOverlay) {
            // Se o overlay já existe, remove
            existingOverlay.remove();
        } else {
            // Caso contrário, cria e adiciona
            const overlay = config(selectedDifficulty);
            document.body.appendChild(overlay);
        }
    });
    
    // Adiciona ao body
    document.body.appendChild(botaoTopoEsquerda.wrapper);

    const botaoaudio = createLightButton({
        iconSrc: 'icones/soundon.svg',
        width: '30px', 
        height: '30px',
    });
    
    // Ajustar o tamanho do contentor (wrapper)
    botaoaudio.wrapper.style.width = 'fit-content';
    botaoaudio.wrapper.style.padding = '10px';
    botaoaudio.wrapper.style.height = 'fit-content';
    botaoaudio.wrapper.style.display = 'flex';
    botaoaudio.wrapper.style.alignItems = 'center';
    botaoaudio.wrapper.style.justifyContent = 'center';
    botaoaudio.wrapper.style.position = 'fixed';
    botaoaudio.wrapper.style.top = '20px';
    botaoaudio.wrapper.style.left = '90px';
    botaoaudio.wrapper.style.zIndex = '100001';

    const audioElement = document.getElementById('bg-audio');

    let isMuted = false;
    
       // Ação de clique
       botaoaudio.wrapper.addEventListener('click', (event) => {
        const currentColor = getComputedStyle(botaoaudio.wrapper).backgroundColor;

  botaoaudio.wrapper.style.backgroundColor =
    currentColor === 'rgb(228, 217, 206)' ? '#B09172' : '#E4D9CE';

            isMuted = !isMuted;
        audioElement.muted = isMuted;

        botaoaudio.icon.src = isMuted ? 'icones/soundoff.svg' : 'icones/soundon.svg';

        event.stopPropagation();
        
        console.log("Botão do canto superior esquerdo clicado!");
    });
    
    // Adiciona ao body
    document.body.appendChild(botaoaudio.wrapper);

    showTutorialHint();
    
});

// Cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, -30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "threeCanvas";
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.7;
controls.enableZoom = true;
controls.enablePan = true;
controls.minPolarAngle = Math.PI / 6;             // ~30º acima da horizontal
controls.maxPolarAngle = Math.PI / 2 + Math.PI / 6;  // ~150º, ou seja, 30º abaixo da horizontal
controls.minDistance = 15;   // não deixa a câmera chegar mais perto que 5 unidades
controls.maxDistance = 50;  // não deixa a câmera se afastar mais que 50 unidades

const gltfLoader = new GLTFLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableObjects = [];
let firstModel;

// Carrega modelos 3D
function loadModel(path, position, modelName) {
    gltfLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.name = modelName;
        scene.add(model);

        model.traverse((child) => {
            if (child.isMesh) {
                clickableObjects.push(child);
                if (modelName === 'morto') child.userData.isMorto = true;
                if (modelName === 'mona') child.userData.isMona = true;
                if (modelName === 'cofre') child.userData.isCofre = true;
                if (modelName === 'tumulo') child.userData.isTumulo = true;
            }
        });

        if (path === '/cenario.glb') firstModel = model;
        // Centraliza a câmera com base no bounding box
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Atualiza o target dos controles e posição da câmera
    controls.target.copy(center);
    controls.update();

    // Define uma posição de câmera relativa ao centro (mais atrás no eixo Z)
    camera.position.set(center.x, 4, -35);
    }, undefined, (error) => {
        console.error(`Erro ao carregar modelo ${path}:`, error);
    });
}

loadModel('/cenario.glb', { x: 0, y: 0, z: 0 }, 'cenario');
loadModel('/mona.glb', { x: 0, y: 0, z: 0 }, 'mona');
loadModel('/morto.glb', { x: 0, y: 0, z: 0 }, 'morto');
loadModel('/cofre.glb', { x: 0, y: 0, z: 0 }, 'cofre');
loadModel('/tumulo.glb', { x: 0, y: 0, z: 0 }, 'tumulo');

// Verifica relação pai-filho
function isDescendant(parent, child) {
    let node = child.parent;
    while (node !== null) {
        if (node === parent) return true;
        node = node.parent;
    }
    return false;
}

// Criação imagem animada
let imageElement = null;
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, true);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
//------------------------------------------------MORTO------------------------------------------------
        if (clickedObject.userData.isMorto) {
            

            if (!imageElement) {
                animatedimage('obras/2.png').then((imgEl) => {
                    imageElement = imgEl;
                    document.body.appendChild(imageElement);
                    setTimeout(() => {
                        imageElement.style.bottom = "0vh";
                        imageElement.style.transform = 'translateX(-50%)';

                        setTimeout(() => {
                            window.canClick = true;
                        }, 1000); 
                    
                    }, 50);
                });
            } else {
                imageElement.style.bottom = "0vh";
                imageElement.style.transform = 'translateX(-50%)';
            }
        } 
 //------------------------------------------------MONA LISA------------------------------------------------
        else if (clickedObject.userData.isMona) {
            cancelAllTimeouts();
            
            const monaElement = monalisa('obras/monalisa.png', '-120vh', '80vw','50%', false);
            const monakey = monalisa('obras/fleurdelis1.png', '-120vh', "10vw", '45%', true);
            document.body.appendChild(monaElement);
            document.body.appendChild(monakey);

            const initMonaGuides = async () => {
                await setArrayGuide("6", selectedDifficulty);
            }

            setTimeout(() => {
                monaElement.style.bottom = "10vh";
                monakey.style.bottom = "40vh";
            }, 50);

            initMonaGuides();

            monakey.addEventListener('click', async () => {
                
                if (botaoFleurCriado) return;
                botaoFleurCriado = true;
                
                // Sequência de guias pós-clique
                await setArrayGuide("7", selectedDifficulty);
                await setArrayGuide("8", selectedDifficulty);
                
                monakey.remove();
                botaoElementfluer = createLightButton({
                    iconSrc: 'icones/fleurlisicon.svg',
                    width: '30px',
                    height: '30px'
                });
            
                botoes.push(botaoElementfluer.wrapper);
            
                const fleurfunction = (botaoElement) => {
                    botaoElement.addEventListener('click', (event) => {
                        setArrayGuide("101", selectedDifficulty);
                        event.stopPropagation();
                        console.log("Novo botão clicado!");
                    });
                };
            
                funcoes.push(fleurfunction);
            
                const menuExistente = document.getElementById('buttonmenu');
                if (menuExistente) {
                    menuExistente.appendChild(botaoElementfluer.wrapper);
                    fleurfunction(botaoElementfluer.wrapper, imageElement);
                }
            });
            
 //--------------------------------------------------COFRE--------------------------------------------------
} else if (clickedObject.userData.isCofre) {
    
    cancelAllTimeouts();
    let inputElement;
    let novoCofreImgAtual = '/obras/caixa.png';
    setArrayGuide("91", selectedDifficulty);
    const cofreInstance = cofre(
        'cofre-container', // ID único original
        '/obras/cofre.png', 
        '-120vh', 
        '70vw', 
        '50%',
        false
    );
    document.body.appendChild(cofreInstance.element);

    requestAnimationFrame(() => {
        cofreInstance.setPosition("10vh", true); // Animação suave após renderização
    });

    if (botaoElementfluer) {
        setArrayGuide("101", selectedDifficulty);
        const wrapper = botaoElementfluer.wrapper;
        const handleBotaoClick = async () => {
            wrapper.removeEventListener('click', handleBotaoClick);

             // <- só será executado uma única vez

    
             inputElement = await createInput('/texto/2enigma.json', selectedDifficulty, '30vw');
                if (inputElement) {
                    inputElement.style.zIndex = '9999';
                    document.body.appendChild(inputElement);

                    cofreInstance.setInputToHide(inputElement); 
                botaoElementfluer.wrapper.remove();
                botaoElementfluer = null;
    
                inputElement.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        const valorDigitado = inputElement.value.trim().toLowerCase();
    
                        fetch('/texto/2enigma.json')
                            .then(res => res.json())
                            .then(data => {
                                const respostaCorreta = data[selectedDifficulty].resposta.trim().toLowerCase();
                                if (valorDigitado === respostaCorreta) {
                                    setArrayGuide("11", selectedDifficulty);
                                    cofreInstance.updateImage('/obras/cofreaberto.png');
                                    const novoCofre = cofre(
                                        'cofre2-container',
                                        novoCofreImgAtual,
                                        cofreInstance.element.style.bottom,
                                        '15vw',
                                        '50%',
                                        true
                                    );
                                    novoCofre.element.style.zIndex = '9999';
                                    document.body.appendChild(novoCofre.element);
                                    inputElement.remove();
    
                                    requestAnimationFrame(() => {
                                        novoCofre.setPosition("40vh", false);
                                    });
    
                                    novoCofre.element.addEventListener('click', () => {
                                        
    
                                        if (novoCofreImgAtual === '/obras/caixa.png') {
                                            novoCofreImgAtual = '/obras/criptex.png';
                                            novoCofre.updateImage(novoCofreImgAtual);
                                            setArrayGuide("12", selectedDifficulty);
                                        } else if (novoCofreImgAtual === '/obras/criptex.png') {
                                            novoCofre.element.remove();
                                            let hasTriggered = false; // Variável de controle global

                                            // Dentro do evento de clique
                                            if (!hasTriggered) {
                                                hasTriggered = true;
                                                setArrayGuide("13", selectedDifficulty);
                                                setTimeout(() => {
                                                    setArrayGuide("14", selectedDifficulty);
                                                }, 1000);
                                            }
                                            if (!window.botaoElementCriptex) {
                                                window.botaoElementCriptex = createLightButton({
                                                    iconSrc: 'icones/criptex.svg',
                                                    width: '30px',
                                                    height: '30px'
                                                });
    
                                                botoes.push(window.botaoElementCriptex.wrapper);
                                                const menuExistente = document.getElementById('buttonmenu');
                                                if (menuExistente) {
                                                    menuExistente.appendChild(window.botaoElementCriptex.wrapper);
                                                }
    
                                                const criptexFunction = (botaoElement) => {
                                                    const handleClick = async (event) => {
                                                        event.stopPropagation();
                                                        
                                                        console.log("Botão do Criptex clicado!");
                                                
                                                        // Cria a imagem do criptex
                                                        const criptexImage = cofre('cofre-criptex', '/obras/criptex.png', '-120vh', '70vw', '50%', false);
                                                        document.body.appendChild(criptexImage.element);
                                                        requestAnimationFrame(() => {
                                                            criptexImage.setPosition("10vh", false);
                                                        });
                                                
                                                        // Cria o input para resposta
                                                        const inputElementcriptex = await createInput('/texto/4enigma.json', selectedDifficulty, '30vw');
                                                        if (inputElementcriptex) {
                                                            document.body.appendChild(inputElementcriptex);
                                                            inputElementcriptex.style.zIndex = '9999';
                                                
                                                            inputElementcriptex.addEventListener('keydown', async (event) => {
                                                                if (event.key === 'Enter') {
                                                                    const valorDigitado = inputElementcriptex.value.trim().toLowerCase();
                                                                    const respostaCorreta = (await fetch('/texto/4enigma.json')
                                                                        .then(res => res.json()))
                                                                        [selectedDifficulty].resposta.trim().toLowerCase();
                                                
                                                                    if (valorDigitado === respostaCorreta) {
                                                                        console.log("acertou");
                                                                        finalscene();
                                                                    } else {
                                                                        const gameOverScreen = gameover();
                                                                        document.body.appendChild(gameOverScreen);
                                                                        console.log("errou");
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            console.warn("Input do criptex não foi criado.");
                                                        }
                                                    };
                                                
                                                    // Adiciona o evento apenas uma vez
                                                    botaoElement.addEventListener('click', handleClick, { once: true });
                                                };
                                                
                                                // E a chamada:
                                                criptexFunction(window.botaoElementCriptex.wrapper);
                                                
                                            }
                                        }
                                    });
                                }
                            });
                    }
                });
            } else {
                console.warn("Input não foi criado.");
            }
        };
    
        wrapper.addEventListener('click', handleBotaoClick, { once: true });
    }
     else {
        console.log("Botão ainda não foi criado! Clique na Mona Lisa primeiro!");
    }
} //--------------------------------------------------TÚMULO--------------------------------------------------
else if (clickedObject.userData.isTumulo) {

    cancelAllTimeouts(); // Cancela guias anteriores
    
    setArrayGuide("161", selectedDifficulty);
    
    

    const tumulo = monalisa('/obras/tumulo.png', '-120vh', '80vw','50%', false, 'tumulo-container');
    let postItVisivelTumulo = false;
    let postItElementoTumulo = null;

    document.body.appendChild(tumulo);

    // Animação de entrada
    requestAnimationFrame(() => {
        tumulo.style.transition = 'bottom 1s ease-in-out';
        tumulo.style.bottom = "10vh";
    });

    // Criação e entrada do post-it
    const togglePostItTumulo = async () => {
        if (!postItElementoTumulo) {
            postItElementoTumulo = await createPostIt('/texto/4enigma.json', selectedDifficulty, 'tumulo-postit');
            postItVisivelTumulo = true;
            postItElementoTumulo.style.bottom = "10vh";
        } else {
            postItVisivelTumulo = !postItVisivelTumulo;
            postItElementoTumulo.style.bottom = postItVisivelTumulo ? "10vh" : "-120vh";
        }
    };

    // Espera animação do túmulo e mostra o post-it
    setTimeout(togglePostItTumulo, 300);

    setTimeout(() => {
        const botaoFechar = tumulo.querySelector('div'); // O primeiro <div> dentro do tumulo é o "X"
        if (botaoFechar) {
            botaoFechar.addEventListener('click', () => {
                // Quando clicar no "X", esconder também o post-it
                if (postItElementoTumulo) {
                    postItElementoTumulo.style.bottom = "-120vh";
                    postItVisivelTumulo = false;
                }
            });
        }
    }, 100); // Pequeno atraso para garantir que o botão "X" já foi criado
}

}
}

window.addEventListener('click', onMouseClick);

// Loop de animação
function animateScene() {
    requestAnimationFrame(animateScene);
    controls.update();
    renderer.render(scene, camera);
}

animateScene();
resizecanvas(renderer, camera);

// Cria imagem animada e textos
async function animatedimage(imageSrc) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.bottom = "-120vh";
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.transition = 'bottom 1s ease-in-out';
    container.style.zIndex = '9999';

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.width = '45vw';

    container.appendChild(imageElement);
    setArrayGuide("1", selectedDifficulty);
    await waitForDifficulty();

    // Cria textos independentemente da luz
    const textTop = await createText('/texto/1enigma.json', selectedDifficulty, 'texto1', "35%");
    const textBottom = await createText('/texto/1enigma.json', selectedDifficulty, 'texto2', "60%");

    if (textTop) {

        textTop.classList.add('texto1');
        textTop.style.cursor = 'pointer';
        textTop.style.display = !lightState.on ? 'block' : 'none';

        textTop.addEventListener('click', () => {
            if (textTopClicked) return; 
            textTopClicked = true;
            
            textTop.remove();
            setArrayGuide("2", selectedDifficulty);
            setTimeout(() => setArrayGuide("3", selectedDifficulty), 2000);

                        // No clique do textTop (animatedimage)
            // 1. Define a função togglePostIt antes de tudo
const togglePostIt = async () => {
    if (!postItElemento) {
        postItElemento = await createPostIt('/texto/1enigma.json', selectedDifficulty, 'postit-fibonacci');
        document.body.appendChild(postItElemento);
    }

    postItVisivel = !postItVisivel;
    postItElemento.style.bottom = postItVisivel ? "20vh" : "-120vh";
};

// 2. Cria o botão
const botaoElementfibonacci = createLightButton({ 
    iconSrc: 'icones/fibonacci.svg',
    width: '30px',
    height: '30px'
});

// 3. Usa buttonmenu corretamente com a função já existente
buttonmenu(
    [ (botao) => {
        botao.addEventListener('click', (event) => {
            
            event.stopPropagation();
            console.log("Botão do post-it clicado!");
            togglePostIt();
        });
    } ],
    [ botaoElementfibonacci.wrapper ]
);

// 4. Adiciona ao menu visualmente (caso necessário)
botoes.push(botaoElementfibonacci.wrapper);
const menuExistente = document.getElementById('buttonmenu');
if (menuExistente) {
    menuExistente.appendChild(botaoElementfibonacci.wrapper);
}

        });

        container.appendChild(textTop);
    }

    if (textBottom) {
        textBottom.classList.add('texto2');
        textBottom.style.cursor = 'pointer';
        textBottom.style.display = !lightState.on ? 'block' : 'none';

        textBottom.addEventListener('click', async () => {
            

            cancelAllTimeouts();

            await setArrayGuide("41", selectedDifficulty);
        
            const input = await createInput('/texto/1enigma.json', selectedDifficulty, '80%');
            container.appendChild(input);
        });

        container.appendChild(textBottom);
    }

    lightState.toggleTextVisibility = () => {
        if (textTop) textTop.style.display = !lightState.on ? 'block' : 'none';
        if (textBottom) textBottom.style.display = !lightState.on ? 'block' : 'none';
    };

    // Oculta tudo quando acerta
    const checkResposta = setInterval(() => {
        if (CorrectAnswer === true) {
            container.style.bottom = "-120vh";
            clearInterval(checkResposta);
            setArrayGuide("5", selectedDifficulty);
        }
    }, 300);

    return container;
}


function waitForDifficulty() {
    return new Promise((resolve) => {
        const check = setInterval(() => {
            if (selectedDifficulty !== null && selectedDifficulty !== undefined) {
                clearInterval(check);
                resolve();
            }
        }, 100);
    });
}
