const params = new URLSearchParams(window.location.search);
const videoUrl = params.get("url");

const video = document.getElementById("video");
video.src = decodeURIComponent(videoUrl);

// suporte a ENTER / PLAY em TV
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (video.paused) video.play();
    else video.pause();
  }
});
