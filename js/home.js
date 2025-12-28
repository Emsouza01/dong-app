const MAX_PER_ROW = 5;
const rowsEl = document.getElementById("rows");

DATA.forEach((item, index) => {
  // Verifica se precisamos criar uma nova linha
  const rowIndex = Math.floor(index / MAX_PER_ROW);
  let row = rowsEl.children[rowIndex];

  if (!row) {
    // Cria uma nova linha, se necessário
    row = document.createElement('div');
    row.className = 'carousel-row';
    rowsEl.appendChild(row);
  }

  // Cria um card dentro da linha
  const card = document.createElement("div");
  card.className = "card" + (index === 0 ? " active" : "");

  card.innerHTML = `
    <img src="${item.cover}" alt="${item.title}">
    <h3>${item.title}</h3>
  `;

  row.appendChild(card);
});

// Função para navegar entre os cards
function navigate(cards, callback) {
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      callback(index);
    });
  });
}

// Navegar para a página de detalhes quando um card for clicado
navigate(document.querySelectorAll(".card"), (item) => {
  window.location.href = `details.html?id=${DATA[item].id}`;
});
