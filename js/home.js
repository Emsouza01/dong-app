const carousel = document.getElementById("carousel");
let currentIndex = 0;

async function fetchData() {
  const data = await getShows(); // Supabase API para obter os shows
  if (!Array.isArray(data)) {
    console.error('API não retornou dados válidos.');
    return;
  }

  renderCards(data);
}

function renderCards(items) {
  carousel.innerHTML = ''; // Limpa o conteúdo anterior

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card" + (index === 0 ? " active" : ""); // Foco no primeiro card

    card.innerHTML = `
      <img src="${item.cover || item.image || ''}" alt="${item.title || item.name || ''}">
      <h3>${item.title || item.name || 'Sem título'}</h3>
    `;

    // Adiciona evento de foco para mudar o fundo
    card.addEventListener('focus', () => {
      document.getElementById('bg').style.backgroundImage = `url(${item.cover || item.banner})`;
    });

    // Navega para a página de detalhes ao clicar no card
    card.addEventListener('click', () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    carousel.appendChild(card);
  });

  // Atualiza o foco
  updateFocus();
}

// Função para atualizar o foco nos cards
function updateFocus() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => c.classList.remove('active'));
  
  const activeCard = cards[currentIndex];
  activeCard.classList.add('active');
  activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

// Navegação com as setas do teclado
document.addEventListener('keydown', e => {
  const cards = document.querySelectorAll('.card');
  
  if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
    currentIndex++;
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
  }

  updateFocus();
});

document.addEventListener('DOMContentLoaded', () => {
  fetchData(); // Chama a função para buscar os dados e renderizar os cards
});
