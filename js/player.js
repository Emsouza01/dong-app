const params = new URLSearchParams(window.location.search);
const videoUrl = params.get("url");

const container = document.getElementById("player");

if (!videoUrl) {
  container.innerHTML = "<p style='color: white; text-align: center; margin-top: 20px;'>Vídeo não encontrado</p>";
} else {
  renderPlayer(videoUrl);
}

function renderPlayer(url) {
  // Limpa qualquer conteúdo anterior
  container.innerHTML = "";
  
  const config = getPlayerConfig(url);

  if (!config) {
    container.innerHTML = "<p style='color: white; text-align: center; margin-top: 20px;'>Formato de vídeo não suportado</p>";
    return;
  }

  if (config.type === "iframe") {
    const iframe = document.createElement("iframe");
    iframe.src = config.src;
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; encrypted-media");
    iframe.allowFullscreen = true;
    
    // Ajustes de estilo inline para garantir full screen
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "absolute"; /* Opcional, mas ajuda a cobrir tudo */
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.border = "none";
    iframe.style.display = "block";
    iframe.style.zIndex = "1";

    container.appendChild(iframe);
  }

  if (config.type === "video") {
    const video = document.createElement("video");
    video.src = config.src;
    video.controls = true;
    video.autoplay = true;
    
    // Ajustes de estilo
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain"; /* 'contain' mostra o vídeo todo, 'cover' corta as bordas */
    video.style.display = "block";
    video.style.background = "black";

    container.appendChild(video);
  }
}

/* ===============================
   DETECTA O TIPO DE PLAYER
================================ */

function getPlayerConfig(url) {

  // ▶️ DAILYMOTION
  if (url.includes("dailymotion.com") || url.includes("dai.ly")) {
    const id = extractDailymotionId(url);
    return {
      type: "iframe",
      src: `https://www.dailymotion.com/embed/video/${id}?autoplay=1&quality=720`
    };
  }

  // ▶️ YOUTUBE
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = extractYoutubeId(url);
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    };
  }

  // ▶️ VÍDEO DIRETO
  if (url.endsWith(".mp4") || url.endsWith(".m3u8") || url.endsWith(".webm")) {
    return {
      type: "video",
      src: url
    };
  }

  return null;
}

/* ===============================
   EXTRATORES DE ID
================================ */

function extractDailymotionId(url) {
  if (url.includes("/video/")) {
    return url.split("/video/")[1].split("_")[0];
  }
  if (url.includes("dai.ly/")) {
    return url.split("dai.ly/")[1];
  }
  return url;
}

function extractYoutubeId(url) {
  if (url.includes("watch?v=")) {
    return new URL(url).searchParams.get("v");
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1];
  }
  return url;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Escape") {
    // Tenta pausar o vídeo antes de voltar (boa prática para Smart TV)
    const video = document.querySelector("video");
    if(video) video.pause();
    
    history.back();
  }
});
