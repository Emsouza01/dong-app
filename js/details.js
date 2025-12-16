const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("details");

getShows().then(shows => {
  const show = shows.find(s => s.id == id);

  container.innerHTML = `
    <div class="details-banner">
      <img src="${show.banner}">
      <div>
        <h1>${show.title}</h1>
        <p>${show.description}</p>
        <button id="playBtn">Assistir</button>
      </div>
    </div>

    <h2>Episódios</h2>
    <div class="episodes" id="episodes"></div>
  `;

  getEpisodes(show.id).then(episodes => {
    const epContainer = document.getElementById("episodes");

    episodes.forEach(ep => {
      const div = document.createElement("div");
      div.className = "episode";
      div.textContent = `Ep ${ep.number} - ${ep.title}`;

      div.addEventListener("click", () => {
        const encoded = encodeURIComponent(ep.video_url);
        window.location.href = `player.html?url=${encoded}`;
      });

      epContainer.appendChild(div);
    });
  });
});
