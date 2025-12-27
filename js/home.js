console.log("HOME JS CARREGADO");
const carousel = document.getElementById("carousel");
const bg = document.getElementById("bg");

let currentIndex = 0;
let cards = [];
const COLUMNS = 5;

getShows().then(shows => {

  carousel.innerHTML = "";

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
      if (bgImage) bg.style.backgroundImage = `url(${bgImage})`;
    });

    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
  });

  cards = [...document.querySelectorAll(".card")];
  if (!cards.length) return;

  // fundo inicial
  bg.style.backgroundImage = `url(${shows[0].banner || shows[0].cover})`;

  activateCard(0);

  document.addEventListener("keydown", e => {
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
      nextIndex++;
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      nextIndex--;
    }

    if (e.key === "ArrowDown" && currentIndex + COLUMNS < cards.length) {
      nextIndex += COLUMNS;
    }

    if (e.key === "ArrowUp" && currentIndex - COLUMNS >= 0) {
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

  function activateCard(index) {
    cards[currentIndex]?.classList.remove("active");
    currentIndex = index;
    cards[currentIndex].classList.add("active");
    cards[currentIndex].focus({ preventScroll: true });
  }
});
