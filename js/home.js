const carousel = document.getElementById("carousel");
const bg = document.getElementById("bg");
const searchInput = document.getElementById("searchInput");

let currentIndex = 0;
let cards = [];
let allShows = [];
const COLUMNS = 5;

/* =======================
   RENDER CARDS
======================= */
function renderCards(shows) {
  carousel.innerHTML = "";
  cards = [];
  currentIndex = 0;

  if (!shows || !shows.length) {
    bg.style.backgroundImage = "";
    carousel.classList.remove("few-items");
    return;
  }

  shows.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = -1;

    card.innerHTML = `
      <img src="${item.cover}">
      <h3>${item.title}</h3>
    `;

    const bgImage = item.banner || item.cover;

    card.addEventListener("focus", () => {
      if (bgImage) {
        bg.style.backgroundImage = `url(${bgImage})`;
      }
    });

    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
    cards.push(card);
  });

  /* ===== ajuste para poucos itens ===== */
  if (cards.length <= 2) {
    carousel.classList.add("few-items");
  } else {
    carousel.classList.remove("few-items");
  }

  /* ===== fundo inicial ===== */
  bg.style.backgroundImage = `url(${shows[0].banner || shows[0].cover})`;

  /* ===== foco inicial ===== */
  activateCard(0);

  /* ===== caso especial: 1 card ===== */
  if (cards.length === 1) {
    cards[0].classList.add("active", "focused");
    cards[0].focus();
  }
}

/* =======================
   FETCH INICIAL
======================= */
getShows().then(shows => {
  allShows = shows || [];
  renderCards(allShows);
});

/* =======================
   NAVEGAÇÃO (TECLADO / TV)
======================= */
document.addEventListener("keydown", e => {
  if (!cards.length) return;

  let nextIndex = currentIndex;

  if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
    nextIndex++;
  }

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    nextIndex--;
  }

  if (
    e.key === "ArrowDown" &&
    currentIndex + COLUMNS < cards.length
  ) {
    nextIndex += COLUMNS;
  }

  if (
    e.key === "ArrowUp" &&
    currentIndex - COLUMNS >= 0
  ) {
    nextIndex -= COLUMNS;
  }

  if (e.key === "Enter") {
    cards[currentIndex].click();
    return;
  }

  if (nextIndex !== currentIndex) {
    activateCard(nextIndex);
  }
});

/* =======================
   ATIVAR CARD
======================= */
function activateCard(index) {
  cards[currentIndex]?.classList.remove("active", "focused");

  currentIndex = index;

  const card = cards[currentIndex];
  if (!card) return;

  card.classList.add("active", "focused");
  card.focus({ preventScroll: true });

  card.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

/* =======================
   SEARCH
======================= */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase().trim();

    const filtered = allShows.filter(item =>
      item.title.toLowerCase().includes(term)
    );

    renderCards(filtered);
  });
}
