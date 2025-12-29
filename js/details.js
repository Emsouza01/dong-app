const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("details");
const bg = document.getElementById("bg");

let focusArea = "button"; // 'button' ou 'episodes'
let episodeIndex = 0;

// Função auxiliar para scroll suave até o elemento
const ensureVisible = (element) => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
};

getShows().then(shows => {
  const show = shows.find(s => s.id == id);
  if (!show) return;

  // Define a imagem de fundo imediatamente
  const bgImage = show.banner?.trim() || show.cover?.trim();
  if (bgImage) {
    bg.style.backgroundImage = `url(${bgImage})`;
  }

  // Injeta o HTML com estrutura melhorada (Semantic HTML + Classes CSS)
  container.innerHTML = `
    <div class="details-banner">
      <img src="${show.cover}" alt="${show.title}">
      <div class="details-info">
        <h1>${show.title}</h1>
        <p>${show.description}</p>
        <button id="playBtn" tabindex="0">Assistir agora</button>
      </div>
    </div>

    <h2 class="section-title">Episódios</h2>
    <div class="episodes" id="episodes"></div>
  `;

  const playBtn = document.getElementById("playBtn");
  
  // Inicia com o foco no botão
  playBtn.classList.add("focused");
  // Força o foco do navegador para aceitar teclado imediatamente se necessário
  playBtn.focus(); 

  getEpisodes(show.id).then(episodes => {
    const epContainer = document.getElementById("episodes");

    if (!episodes || episodes.length === 0) {
      epContainer.innerHTML = "<p>Nenhum episódio disponível.</p>";
      return;
    }

    episodes.forEach((ep, index) => {
      const div = document.createElement("div");
      div.className = "episode";
      div.tabIndex = 0; // Torna focalizável pelo tab nativo também
      div.dataset.url = ep.video_url;
      div.dataset.index = index;

      // HTML interno do card do episódio
      div.innerHTML = `
        <span class="ep-number">Episódio ${ep.number}</span>
        <span class="ep-title">${ep.title}</span>
      `;

      div.addEventListener("focus", () => {
        // Opcional: Se você tiver imagens diferentes por episódio, troque o BG aqui
        // if (ep.thumbnail) bg.style.backgroundImage = ...
      });

      div.addEventListener("click", () => {
        openPlayer(ep.video_url);
      });

      epContainer.appendChild(div);
    });

    const episodeEls = document.querySelectorAll(".episode");

    // Gerenciador de Teclado Global
    document.addEventListener("keydown", (e) => {
      // Previne scroll da página inteira se necessário
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        // e.preventDefault() // Cuidado: pode bloquear scroll do navegador em desktop. 
      }

      switch (e.key) {
        case "ArrowDown":
          if (focusArea === "button") {
            // Move do Botão para o Lista de Episódios
            focusArea = "episodes";
            playBtn.classList.remove("focused");
            episodeEls[episodeIndex]?.classList.add("focused");
            ensureVisible(episodeEls[episodeIndex]);
          }
          break;

        case "ArrowUp":
          if (focusArea === "episodes") {
            // Move da Lista para o Botão
            focusArea = "button";
            episodeEls[episodeIndex]?.classList.remove("focused");
            playBtn.classList.add("focused");
          }
          break;

        case "ArrowRight":
          if (focusArea === "episodes") {
            if (episodeIndex < episodeEls.length - 1) {
              // Remove foco do atual
              episodeEls[episodeIndex].classList.remove("focused");
              
              // Avança índice
              episodeIndex++;
              
              // Adiciona foco no novo
              const nextEp = episodeEls[episodeIndex];
              nextEp.classList.add("focused");
              
              // MELHORIA: Scroll suave para manter o item visível
              ensureVisible(nextEp);
            }
          }
          break;

        case "ArrowLeft":
          if (focusArea === "episodes") {
            if (episodeIndex > 0) {
              episodeEls[episodeIndex].classList.remove("focused");
              episodeIndex--;
              const prevEp = episodeEls[episodeIndex];
              prevEp.classList.add("focused");
              
              // MELHORIA: Scroll suave
              ensureVisible(prevEp);
            }
          }
          break;

        case "Enter":
          const url = focusArea === "button"
            ? episodes[0]?.video_url
            : episodeEls[episodeIndex].dataset.url;
          openPlayer(url);
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
  window.location.href = `player.html?url=${encodeURIComponent(url)}`;
}
