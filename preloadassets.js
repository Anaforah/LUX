//preloadassets.js
export function preloadassets() {
    const assets = [
      'logo.png',
      '0.png',
      '1.png',
      '2.png',
      '/sounds/mystery2.mp3',
      'blocodenotas.png',
      '/tutorial/help.png',
      '/tutorial/menu.png',
      '/tutorial/nav.png',
      '/tutorial/resposta.png',
      '/icones/afaste.png',
      '/icones/clique.png',
      '/icones/criptex.svg',
      '/icones/favicon.png',
      '/icones/fibonacci.svg',
      '/icones/fleurlisicon.svg',
      '/icones/icone.svg',
      '/icones/info.svg',
      '/icones/soundoff.svg',
      '/icones/soundon.svg',
      '/obras/2.png',
      '/obras/caixa.png',
      '/obras/cofre.png',
      '/obras/cofreaberto.png',
      '/obras/criptex.png',
      '/obras/fleurdelis1.png',
      '/obras/monalisa.png',
      '/obras/tumulo.png',
      '/3.mp4'
    ];
  
    const preloaders = assets.map(asset => {
      return new Promise((resolve, reject) => {
        if (asset.endsWith('.png') || asset.endsWith('.jpg') || asset.endsWith('.svg')) {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = asset;
        } else if (asset.endsWith('.mp3') || asset.endsWith('.wav')) {
          const audio = new Audio();
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          audio.src = asset;
        } else if (asset.endsWith('.mp4') || asset.endsWith('.webm')) {
          const video = document.createElement('video');
          video.onloadeddata = resolve;
          video.onerror = reject;
          video.src = asset;
        } else {
          resolve(); // tipo desconhecido, ignora
        }
      });
    });
  
    return Promise.all(preloaders);
  }
  
  