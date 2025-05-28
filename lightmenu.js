export const lightState = { on: true };

const botoes = [];
const funcoes = [];
let body = document.querySelector('body');
const menuContainer = document.createElement('div');

export function buttonmenu(newFuncoes = [], newBotoes = []) {
  const menuContainer = document.getElementById('buttonmenu') || document.createElement('div');
  menuContainer.id = "buttonmenu";
  menuContainer.classList.add('menu-contentor');
  menuContainer.style.position = 'fixed';
  menuContainer.style.zIndex = '100000';

  botoes.push(...newBotoes); // Adiciona botões ao array global
  funcoes.push(...newFuncoes); // Adiciona funções ao array global
  // Limpa o menu antes de recriar
  menuContainer.innerHTML = '';

  // Recria todos os botões
  funcoes.forEach((funcao, i) => {
    const botao = botoes[i];
    if (botao) {
      menuContainer.appendChild(botao);
      funcao(botao); 
    }
  });

  document.body.appendChild(menuContainer);
  return menuContainer;
}


// ✅ Função light com overlay azul incluso
export function light(buttonElement, imageElement = null) {
  let blueOverlay = document.getElementById('blueOverlay');

  if (!blueOverlay) {
    blueOverlay = document.createElement('div');
    blueOverlay.id = 'blueOverlay';
    blueOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 102, 204, 0.3);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      z-index: 99999;
    `;
    document.body.appendChild(blueOverlay);
  }

  buttonElement.addEventListener('click', (event) => {
    event.stopPropagation();

    lightState.on = !lightState.on;
    blueOverlay.style.opacity = lightState.on ? '0' : '1';

    // 🟡 Alternar a cor do botão aqui dentro
    buttonElement.style.backgroundColor = lightState.on ? '#E4D9CE' : '#B09172';

    if (typeof lightState.toggleTextVisibility === 'function') {
      lightState.toggleTextVisibility();
    }
  });
}




export function createLightButton(params) {
  const { iconSrc, width = '35px', height = '35px', className = 'individualdiv' } = params;
  console.log("Criando botão com imagem:", iconSrc); // Agora OK

  const wrapper = document.createElement('div');
  wrapper.classList.add(className);
  wrapper.style.marginLeft = '5px';

  const icon = document.createElement('img');
  icon.src = iconSrc;
  icon.alt = 'Ícone de luz';
  icon.style.width = width;
  icon.style.height = height;
  icon.style.objectFit = 'contain';

  wrapper.appendChild(icon);

  return { wrapper, icon };
}

