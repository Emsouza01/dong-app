const params = new URLSearchParams(window.location.search);
const videoUrl = params.get("url");

const container = document.getElementById("player");

if (!videoUrl) {
  container.innerHTML = "<p>Vídeo não encontrado</p>";
} else {
  renderPlayer(videoUrl);
}

function renderPlayer(url) {
  const config = getPlayerConfig(url);

  if (!config) {
    container.innerHTML = "<p>Formato de vídeo não suportado</p>";
    return;
  }

  if (config.type === "iframe") {
    const iframe = document.createElement("iframe");
    iframe.src = config.src;
    iframe.allow =
      "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.frameBorder = "0";

    container.appendChild(iframe);
  }

  if (config.type === "video") {
    const video = document.createElement("video");
    video.src = config.src;
    video.controls = true;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "100%";

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
      src: `https://www.dailymotion.com/embed/video/${id}?autoplay=1`
    };
  }

  // ▶️ YOUTUBE
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = extractYoutubeId(url);
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${id}?autoplay=1`
    };
  }

  // ▶️ VÍDEO DIRETO
  if (url.endsWith(".mp4") || url.endsWith(".m3u8")) {
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
}

function extractYoutubeId(url) {
  if (url.includes("watch?v=")) {
    return new URL(url).searchParams.get("v");
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1];
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Escape") {
    history.back();
  }
});

document.getElementById("backBtn").onclick = () => {
  history.back();
};

