//finalscene.js
export function finalscene() {
    console.log("finalscene chamada");

    const video = document.createElement('video');
    video.src = '/3.mp4';
    video.autoplay = true;
    video.loop = false;
    video.controls = false;
    video.playsInline = true;
    video.muted = true; // Adicionado para evitar bloqueios de autoplay

    Object.assign(video.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: '999999',
        backgroundColor: 'black',
    });

    document.body.appendChild(video);

    video.play().then(() => {
        console.log("Vídeo reproduzido com sucesso");
    }).catch((err) => {
        console.error("Erro ao tentar reproduzir o vídeo:", err);
    });

    document.body.style.overflow = 'hidden';
}
