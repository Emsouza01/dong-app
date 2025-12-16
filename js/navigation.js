let currentIndex = 0;

function navigate(items, onEnter) {
  document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight" && currentIndex < items.length - 1) {
      currentIndex++;
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
    }

    if (e.key === "Enter") {
      onEnter(items[currentIndex]);
    }

    items.forEach(i => i.classList.remove("active"));
    items[currentIndex].classList.add("active");
  });
}
