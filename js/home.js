// home.js
const CONFIG = {
  cardsPerRow: 5,
  rows: 3,
};

document.addEventListener("DOMContentLoaded", async () => {
  const rowsContainer = document.getElementById("rows");
  rowsContainer.classList.add("rows");

  const shows = await getShows();

  for (let r = 0; r < CONFIG.rows; r++) {
    const row = document.createElement("div");
    row.className = "carousel-row";
    row.dataset.row = r;

    const start = r * CONFIG.cardsPerRow;
    const end = start + CONFIG.cardsPerRow * 4;

    shows.slice(start, end).forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.tabIndex = 0;

      card.innerHTML = `
        <img src="${item.cover}">
        <h3>${item.title}</h3>
      `;

      card.addEventListener("focus", () => {
        setBackground(item.banner || item.cover);
      });

      card.addEventListener("click", () => {
        window.location.href = `details.html?id=${item.id}`;
      });

      row.appendChild(card);
    });

    rowsContainer.appendChild(row);
  }

  initNavigation();
});

