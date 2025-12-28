const MAX_PER_ROW = 5;

function renderRows(items) {
  const rowsContainer = document.getElementById('rows');
  rowsContainer.innerHTML = '';  // Limpa qualquer conteúdo antigo

  // Verifique se os dados foram recebidos corretamente
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

      // Preenche a imagem e título
      card.innerHTML = `
        <img src="${item.cover || item.image || ''}" alt="${item.title || item.name || ''}">
        <h3>${item.title || item.name || 'Sem título'}</h3>
      `;

      row.appendChild(card);
    });

    rowsContainer.appendChild(row);  // Adiciona a linha ao container
  }

  console.log("Linhas e cards renderizados com sucesso");
}

// Quando o DOM estiver carregado, inicia o processo
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log("Iniciando o carregamento dos dados...");
    
    if (typeof getShows !== 'function') {
      console.error('A função getShows não foi encontrada no api.js.');
      return;
    }

    const data = await getShows();  // Chama a API e obtém os dados

    console.log("Dados recebidos:", data);  // Mostra os dados no console para verificar

    if (!Array.isArray(data)) {
      console.error('API não retornou um array. Dados:', data);
      return;
    }

    renderRows(data);  // Renderiza os cards na tela
  } catch (e) {
    console.error('Erro ao renderizar os dados:', e);
  }
});

