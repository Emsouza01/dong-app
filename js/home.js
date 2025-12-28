const MAX_PER_ROW = 5;
let currentRow = 0;
let currentIndex = 0;

function renderRows(items) {
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  for (let i = 0; i < items.length; i += MAX_PER_ROW) {
    const row = document.createElement('div');
    row.className = 'carousel-row';

    items.slice(i, i + MAX_PER_ROW).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.row = rows.children.length;
      card.dataset.index = index;

      card.innerHTML = `
        <img src="${item.cover}">
        <h3>${item.title}</h3>
      `;

      row.appendChild(card);
    });

    rows.appendChild(row);
  }

  updateFocus();
}

function updateFocus() {
  document.querySelectorAll('.card').forEach(c =>
    c.classList.remove('active')
  );

  const card = document.querySelector(
    `.card[data-row="${currentRow}"][data-index="${currentIndex}"]`
  );

  if (card) {
    card.classList.add('active');
  }
}

document.addEventListener('keydown', e => {
  const rows = document.querySelectorAll('.carousel-row');

  if (e.key === 'ArrowRight') currentIndex++;
  if (e.key === 'ArrowLeft') currentIndex--;
  if (e.key === 'ArrowDown') {
    currentRow++;
    currentIndex = 0;
  }
  if (e.key === 'ArrowUp') {
    currentRow--;
    currentIndex = 0;
  }

  currentRow = Math.max(0, Math.min(currentRow, rows.length - 1));
  currentIndex = Math.max(0, Math.min(currentIndex, rows[currentRow].children.length - 1));

  updateFocus();
});


