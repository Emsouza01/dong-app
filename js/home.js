const carousel = document.getElementById("carousel");

DATA.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card" + (index === 0 ? " active" : "");

  card.innerHTML = `
    <img src="${item.cover}">
    <h3>${item.title}</h3>
  `;

  carousel.appendChild(card);
});

navigate(document.querySelectorAll(".card"), (item) => {
  window.location.href = `details.html?id=${DATA[item].id}`;
});
