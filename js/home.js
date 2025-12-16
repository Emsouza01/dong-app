const carousel = document.getElementById("carousel");
let currentIndex = 0;

// cria os cards
DATA.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;

  card.innerHTML = `
    <img src="${item.cover}">
    <h3>${item.title}</h3>
  `;

  // clique (funciona no PC e TV)
  card.addEventListener("click", () => {
    window.location.href = `details.html?id=${item.id}`;
  });

  carousel.appendChild(card);
});

const cards = document.querySelectorAll(".card");
cards[0].classList.add("active");

// controle remoto / teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
    currentIndex++;
  }

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex--;
  }

  if (e.key === "Enter") {
    cards[currentIndex].click(); // 👈 AQUI ESTÁ O SEGREDO
  }

  cards.forEach(c => c.classList.remove("active"));
  cards[currentIndex].classList.add("active");

  carousel.style.transform = `translateX(-${currentIndex * 300}px)`;
});
