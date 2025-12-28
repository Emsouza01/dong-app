const MAX_PER_ROW = 5;

function renderRows(items) {
  const rowsContainer = document.getElementById('rows');
  rowsContainer.innerHTML = ''; // Limpa qualquer conteúdo antigo

  // Se não houver dados, vai dar erro
  if (!items || items.length === 0) {
    console.log("Sem dados para exibir.");
    return;
  }

  for (let i = 0; i < items.length; i += MAX_PER_ROW) {
    const rowItems = items.slice(i, i + MAX_PER_ROW);

    // Cria a linha de cards
    const row = document.createElement('div');
    row.className = 'carousel-row';

    rowItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${item.cover || item.image || ''}" alt="">
        <h3>${item.title || item.name || 'Sem título'}</h3>
      `;

      row.appendChild(card);  // Adiciona o card à linha
    });

    rowsContainer.appendChild(row);  // Adiciona a linha ao container de rows
  }

  console.log("Linhas e cards renderizados com sucesso");
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log("Iniciando o carregamento dos dados...");
    
    if (typeof fetchShows !== 'function') {
      console.error('A função fetchShows não foi encontrada no api.js.');
      return;
    }

    const data = await fetchShows();

    console.log("Dados recebidos:", data);

    // Verifica se o retorno da API é um array
    if (!Array.isArray(data)) {
      console.error('API não retornou um array. Dados:', data);
      return;
    }

    renderRows(data);  // Renderiza os cards na tela
  } catch (e) {
    console.error('Erro ao renderizar os dados:', e);
  }
});

