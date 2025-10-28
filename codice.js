// Seleziono gli elementi dal DOM
const titolo = document.getElementById("titolo");
const bottone = document.getElementById("bottone");

// Aggiungo un event listener al bottone
bottone.addEventListener("click", function() {
  titolo.textContent = "Hai cliccato il bottone! 🎉";
  titolo.style.color = "crimson";
});
