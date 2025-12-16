const carousel = document.getElementById("carousel");

DATA.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card" + (index === 0 ? " active" : "");
  card.dataset.index = index;

  card.innerHTML = `
    <img src="${item.cover}">
    <h3>${item.title}</h3>
  `;

  carousel.appendChild(card);
});

const cards = document.querySelectorAll(".card");

navigate(cards, (card) => {
  const index = card.dataset.index;
  const id = DATA[index].id;
  window.location.href = `details.html?id=${id}`;
});
