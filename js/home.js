let currentRow = 0;
let currentIndex = 0;

function renderRows(data) {
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  data.forEach((rowData, rowIndex) => {
    const row = document.createElement('div');
    row.className = 'carousel-row';

    rowData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.row = rowIndex;
      card.dataset.index = index;

      card.innerHTML = `
        <img src="${item.cover}">
        <h3>${item.title}</h3>
      `;

      row.appendChild(card);
    });

    rows.appendChild(row);
  });

  updateFocus();
}

function updateFocus() {
  document.querySelectorAll('.card').forEach(c =>
    c.classList.remove('active')
  );

  const selector = `.card[data-row="${currentRow}"][data-index="${currentIndex}"]`;
  const card = document.querySelector(selector);

  if (card) {
    card.classList.add('active');
    card.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
}

document.addEventListener('keydown', e => {
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

  currentRow = Math.max(0, currentRow);
  currentIndex = Math.max(0, currentIndex);

  updateFocus();
});

