const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const show = DATA.find(s => s.id === id);
const container = document.getElementById("details");

container.innerHTML = `
  <div class="details-banner">
    <img src="${show.banner}">
    <div>
      <h1>${show.title}</h1>
      <p>${show.description}</p>
      <button>Assistir</button>
    </div>
  </div>

  <h2>Episódios</h2>
  <div class="episodes">
    ${show.episodes.map(e => `
      <div class="episode">${e.title}</div>
    `).join("")}
  </div>
`;
