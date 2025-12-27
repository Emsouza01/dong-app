// navigation.js
function initNavigation() {
  let currentRow = 0;
  let currentIndex = 0;

  const rows = document.querySelectorAll(".carousel-row");

  rows[0]?.children[0]?.focus();

  document.addEventListener("keydown", (e) => {
    const row = rows[currentRow];
    const cards = row.children;

    switch (e.key) {
      case "ArrowRight":
        if (currentIndex < cards.length - 1) currentIndex++;
        break;

      case "ArrowLeft":
        if (currentIndex > 0) currentIndex--;
        break;

      case "ArrowDown":
        if (currentRow < rows.length - 1) {
          currentRow++;
          currentIndex = Math.min(
            currentIndex,
            rows[currentRow].children.length - 1
          );
        }
        break;

      case "ArrowUp":
        if (currentRow > 0) {
          currentRow--;
          currentIndex = Math.min(
            currentIndex,
            rows[currentRow].children.length - 1
          );
        }
        break;

      case "Enter":
        cards[currentIndex].click();
        return;
    }

    const active = rows[currentRow].children[currentIndex];
    active.focus({ preventScroll: true });
    active.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  });
}

