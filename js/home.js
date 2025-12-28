const rowsEl = document.getElementById("rows");
const bg = document.getElementById("bg");

const CARDS_PER_ROW = 5;   // 👈 ALTERE AQUI (5, 6, 7…)
let rowIndex = 0;
let colIndex = 0;

let rows = []; // [{ track, cards, offset }]

getShows().then(shows => {

  // quebra em linhas
  for (let i = 0; i < shows.length; i += CARDS_PER_ROW) {
    const rowShows = shows.slice(i, i + CARDS_PER_ROW);

    const row = document.createElement("div");
    row.className = "row";

    const track = document.createElement("div");
    track.className = "row-track";

    rowShows.forEach(show => {
      const card = document.createElement("div");
      card.className = "card";
      card.tabIndex = -1;

      card.innerHTML = `
        <img src="${show.cover}">
        <h3>${show.title}</h3>
      `;

      const bgImage = show.banner || show.cover;

      card.addEventListener("focus", () => {
        if (bgImage) {
          bg.style.backgroundImage = `url(${bgImage})`;
        }
      });

      card.addEventListener("click", () => {
        window.location.href = `details.html?id=${show.id}`;
      });

      track.appendChild(card);
    });

    row.appendChild(track);
    rowsEl.appendChild(row);

    rows.push({
      track,
      cards: track.querySelectorAll(".card"),
      offset: 0
    });
  }

  // foco inicial
  rows[0].cards[0].classList.add("active");
  rows[0].cards[0].focus();

  const firstBg =
    shows[0].banner || shows[0].cover;
  if (firstBg) bg.style.backgroundImage = `url(${firstBg})`;

  document.addEventListener("keydown", handleKeys);
});

function handleKeys(e) {
  const currentRow = rows[rowIndex];
  const cards = currentRow.cards;

  if (e.key === "ArrowRight") {
    if (colIndex < cards.length - 1) {
      updateFocus(colIndex + 1);
    }
  }

  if (e.key === "ArrowLeft") {
    if (colIndex > 0) {
      updateFocus(colIndex - 1);
    }
  }

  if (e.key === "ArrowDown") {
    if (rowIndex < rows.length - 1) {
      changeRow(rowIndex + 1);
    }
  }

  if (e.key === "ArrowUp") {
    if (rowIndex > 0) {
      changeRow(rowIndex - 1);
    }
  }

  if (e.key === "Enter") {
    cards[colIndex].click();
  }
}

function updateFocus(newCol) {
  const row = rows[rowIndex];

  row.cards[colIndex].classList.remove("active");

  colIndex = newCol;

  row.cards[colIndex].classList.add("active");
  row.cards[colIndex].focus();

  const cardWidth = 200 + 26; // card + gap
  const visibleLimit = (CARDS_PER_ROW - 1) * cardWidth;

  const targetX = colIndex * cardWidth;
  row.offset = Math.max(0, targetX - visibleLimit);

  row.track.style.transform =
    `translateX(-${row.offset}px)`;
}

function changeRow(newRow) {
  rows[rowIndex].cards[colIndex].classList.remove("active");

  rowIndex = newRow;
  colIndex = Math.min(colIndex, rows[rowIndex].cards.length - 1);

  rows[rowIndex].cards[colIndex].classList.add("active");
  rows[rowIndex].cards[colIndex].focus();
}

