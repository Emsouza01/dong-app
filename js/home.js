const MAX_PER_ROW = 5;

function renderRows(items) {
  const rowsContainer = document.getElementById('rows');
  rowsContainer.innerHTML = '';

  for (let i = 0; i < items.length; i += MAX_PER_ROW) {
    const rowItems = items.slice(i, i + MAX_PER_ROW);

    const row = document.createElement('div');
    row.className = 'carousel-row';

    rowItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${item.cover || item.image || ''}" alt="">
        <h3>${item.title || item.name || ''}</h3>
      `;

      row.appendChild(card);
    });

    rowsContainer.appendChild(row);
  }
}

/**
 * NÃO muda a API
 * Apenas consome o que ela já entrega
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (typeof fetchShows !== 'function') {
      console.error('fetchShows não encontrado (api.js)');
      return;
    }

    const data = await fetchShows();

    if (!Array.isArray(data)) {
      console.error('API não retornou array', data);
      return;
    }

    renderRows(data);
  } catch (e) {
    console.error('Erro ao renderizar home:', e);
  }
});
