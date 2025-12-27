const carousel = document.getElementById("carousel");
const bg = document.getElementById("bg");

let currentIndex = 0;
let cards = [];

getShows().then(shows => {

  carousel.innerHTML = "";

  shows.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${item.cover}">
      <h3>${item.title}</h3>
    `;

    const bgImage = item.banner?.trim() || item.cover?.trim();

    card.addEventListener("focus", () => {
      if (bgImage) bg.style.backgroundImage = `url(${bgImage})`;
    });

    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
  });

  cards = Array.from(document.querySelectorAll(".card"));
  if (!cards.length) return;

  // fundo inicial
  const firstBg = shows[0].banner || shows[0].cover;
  if (firstBg) bg.style.backgroundImage = `url(${firstBg})`;

  cards[0].classList.add("active");
  cards[0].focus();

  document.addEventListener("keydown", (e) => {
    const columns = 5;

    cards[currentIndex].classList.remove("active");

    if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
      currentIndex++;
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
    }

    if (e.key === "ArrowDown" && currentIndex + columns < cards.length) {
      currentIndex += columns;
    }

    if (e.key === "ArrowUp" && currentIndex - columns >= 0) {
      currentIndex -= columns;
    }

    if (e.key === "Enter") {
      cards[currentIndex].click();
      return;
    }

    cards[currentIndex].classList.add("active");
    cards[currentIndex].focus({ preventScroll: true });
  });
});
