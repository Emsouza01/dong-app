const MAX_PER_ROW = 5;  // Limita a quantidade de cards por linha
const rowsContainer = document.getElementById('rows');
let currentRow = 0;
let currentIndex = 0;

function renderRows(items) {
  rowsContainer.innerHTML = ''; // Limpa qualquer conteúdo antigo

  // Verifica se temos dados
  if (!items || items.length === 0) {
    console.log("Sem dados para exibir.");
    return;
  }

  // Cria as linhas de cards (5 por linha)
  for (let i = 0; i < items.length; i += MAX_PER_ROW) {
    const rowItems = items.slice(i, i + MAX_PER_ROW);
    const row = document.createElement('div');
    row.className = 'carousel-row';

    rowItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${item.cover || item.image || ''}" alt="${item.title || item.name || ''}">
        <h3>${item.title || item.name || 'Sem título'}</h3>
      `;

      card.addEventListener('focus', () => {
        // Altera o fundo quando o card recebe o foco
        document.getElementById('bg').style.backgroundImage = `url(${item.banner || item.cover})`;
      });

      card.addEventListener('click', () => {
        // Navega para os detalhes do card ao clicar
        window.location.href = `details.html?id=${item.id}`;
      });

      row.appendChild(card);
    });

    rowsContainer.appendChild(row);
  }

  updateFocus();
}

// Atualiza o foco de acordo com a linha e o card
function updateFocus() {
  document.querySelectorAll('.card').forEach(c =>
    c.classList.remove('active')
  );

  const row = rowsContainer.children[currentRow];
  const card = row.children[currentIndex];

  if (card) {
    card.classList.add('active');
    card.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
}

// Navegação
document.addEventListener('keydown', e => {
  const rows = document.querySelectorAll('.carousel-row');

  if (e.key === 'ArrowRight' && currentIndex < rows[currentRow].children.length - 1) {
    currentIndex++;
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
  } else if (e.key === 'ArrowDown' && currentRow < rows.length - 1) {
    currentRow++;
    currentIndex = 0;
  } else if (e.key === 'ArrowUp' && currentRow > 0) {
    currentRow--;
    currentIndex = 0;
  }

  updateFocus();
});

// Chama a API e renderiza os dados
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getShows();  // Supabase API

    if (!Array.isArray(data)) {
      console.error('API não retornou um array.');
      return;
    }

    renderRows(data);
  } catch (e) {
    console.error('Erro ao renderizar os dados:', e);
  }
});
