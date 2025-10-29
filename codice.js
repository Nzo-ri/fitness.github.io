// script.js
const titolo = document.getElementById('titolo');
const bottone = document.getElementById('bottone');

fetch('./data.json')
  .then(response => {
    if (!response.ok) throw new Error("Errore caricamento dati: " + response.status);
    return response.json();
  })
  .then(data => {
    // applica colori / messaggi
    document.body.style.backgroundColor = data.colorePrimario;
    titolo.textContent = data.messaggioSaluto;

    bottone.addEventListener('click', () => {
      alert(data.dizionario.hello + "!");
      titolo.textContent = data.dizionario.goodbye;
    });
  })
  .catch(error => {
    console.error("Errore:", error);
  });