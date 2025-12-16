const carousel = document.getElementById("carousel");
let currentIndex = 0;

getShows().then(shows => {

  shows.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${item.cover}">
      <h3>${item.title}</h3>
    `;

    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  cards[0].classList.add("active");

  document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
      currentIndex++;
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
    }

    if (e.key === "Enter") {
      cards[currentIndex].click();
    }

    cards.forEach(c => c.classList.remove("active"));
    cards[currentIndex].classList.add("active");

    carousel.style.transform = `translateX(-${currentIndex * 300}px)`;
  });

});
