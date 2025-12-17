const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("details");
const bg = document.getElementById("bg");

let focusArea = "button";
let episodeIndex = 0;

getShows().then(shows => {
  const show = shows.find(s => s.id == id);
  if (!show) return;

  const bgImage =
    show.banner_url?.trim() ||
    show.poster_url?.trim();

  if (bgImage) {
    bg.style.backgroundImage = `url(${bgImage})`;
  }

  container.innerHTML = `
    <div class="details-banner">
      <img src="${show.poster_url}">
      <div>
        <h1>${show.title}</h1>
        <p>${show.description}</p>
        <button id="playBtn" tabindex="0">Assistir agora</button>
      </div>
    </div>

    <h2>Episódios</h2>
    <div class="episodes" id="episodes"></div>
  `;

  const playBtn = document.getElementById("playBtn");
  playBtn.classList.add("focused");

  getEpisodes(show.id).then(episodes => {
    const epContainer = document.getElementById("episodes");

    episodes.forEach(ep => {
      const div = document.createElement("div");
      div.className = "episode";
      div.textContent = `Ep ${ep.number} - ${ep.title}`;
      div.dataset.url = ep.video_url;
      div.tabIndex = 0;

      div.addEventListener("focus", () => {
        if (bgImage) {
          bg.style.backgroundImage = `url(${bgImage})`;
        }
      });

      div.addEventListener("click", () => {
        openPlayer(ep.video_url);
      });

      epContainer.appendChild(div);
    });

    const episodeEls = document.querySelectorAll(".episode");

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
          if (focusArea === "button") {
            focusArea = "episodes";
            playBtn.classList.remove("focused");
            episodeEls[0]?.classList.add("focused");
            episodeIndex = 0;
          }
          break;

        case "ArrowUp":
          if (focusArea === "episodes") {
            focusArea = "button";
            episodeEls[episodeIndex]?.classList.remove("focused");
            playBtn.classList.add("focused");
          }
          break;

        case "ArrowRight":
          if (focusArea === "episodes" && episodeIndex < episodeEls.length - 1) {
            episodeEls[episodeIndex].classList.remove("focused");
            episodeIndex++;
            episodeEls[episodeIndex].classList.add("focused");
          }
          break;

        case "ArrowLeft":
          if (focusArea === "episodes" && episodeIndex > 0) {
            episodeEls[episodeIndex].classList.remove("focused");
            episodeIndex--;
            episodeEls[episodeIndex].classList.add("focused");
          }
          break;

        case "Enter":
          openPlayer(
            focusArea === "button"
              ? episodes[0]?.video_url
              : episodeEls[episodeIndex].dataset.url
          );
          break;

        case "Backspace":
        case "Escape":
          window.location.href = "index.html";
          break;
      }
    });
  });
});

function openPlayer(url) {
  if (!url) return;
  window.location.href =
    `player.html?url=${encodeURIComponent(url)}`;
}

function openPlayer(url) {
  if (!url) return;
  window.location.href =
    `player.html?url=${encodeURIComponent(url)}`;
}
