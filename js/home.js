const carousel = document.getElementById("carousel");
const bg = document.getElementById("bg");

let currentIndex = 0;
let showsCache = [];

getShows().then(shows => {
  showsCache = shows;

  shows.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${item.cover}">
      <h3>${item.title}</h3>
    `;

    const bgImage = item.banner?.trim() || item.cover?.trim();

    const updateBackground = () => {
      if (bgImage) {
        bg.style.backgroundImage = `url(${bgImage})`;
      }
    };

    card.addEventListener("focus", updateBackground);
  
    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  // fundo inicial
  const firstBg =
    shows[0].banner?.trim() || shows[0].cover?.trim();
  if (firstBg) bg.style.backgroundImage = `url(${firstBg})`;

  cards[0].classList.add("active");
  cards[0].focus();

  document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
      currentIndex++;
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
    }

    if (e.key === "Enter") {
      cards[currentIndex].click();
      return;
    }

    cards.forEach(c => c.classList.remove("active"));
    cards[currentIndex].classList.add("active");
    cards[currentIndex].focus();

    carousel.style.transform =
      `translateX(-${currentIndex * 300}px)`;
  });
});

