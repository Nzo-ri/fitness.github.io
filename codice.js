const BIN_ID = "6907e03543b1c97be9949da9"
const API_KEY = "$2a$10$crWmJHjIH0SksJJTBwtf5u/.MPTvMUAvsY0Jny7vwM5rWy/0VTYnu"
const BASE_URL = "https://api.jsonbin.io/v3/b/6907e03543b1c97be9949da9"
async function caricaEsercizi() {
      const res = await fetch(BASE_URL, {
        headers: { "X-Master-Key": API_KEY }
      });
      const data = await res.json();
      const esercizio = data.record.esercizio;

      const select = document.getElementById("esercizio");
      select.innerHTML = "";
      esercizio.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        select.appendChild(opt);
      });
    }

  async function aggiungiEsercizio() {
      const nuovo = prompt("Inserisci un nuovo esercizio:");
      if (!nuovo) return;

      // Ottieni dati attuali
      const res = await fetch(BASE_URL, { headers: { "X-Master-Key": API_KEY } });
      const data = await res.json();
      const nomi = data.record.nuovo;

      // Aggiorna su JSONBin
      await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ esercizi })
      });

      caricaEsercizi();
    }
let dati = [];
function mostraSezione(id) {
      // Nasconde tutte le sezioni
      const sezioni = document.querySelectorAll("section");
      sezioni.forEach(s => s.classList.remove("active"));

      // Mostra solo la sezione selezionata
      const sezioneAttiva = document.getElementById(id);
      sezioneAttiva.classList.add("active");
    }
function aggiungiRiga() {
      const esercizio = document.getElementById("esercizio").value;
      const ripetizioni = parseInt(document.getElementById("ripetizioni").value);

      if (!esercizio || isNaN(ripetizioni) || ripetizioni <= 0) {
        alert("Seleziona un esercizio ed un numero di ripetizioni");
        return;
      }
      dati.push({ esercizio,ripetizioni });

      aggiornaTabella();
    }
function aggiornaTabella() {
      const tbody = document.querySelector("#tabella tbody");
      tbody.innerHTML = "";

      dati.forEach((riga, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${riga.esercizio}</td>
          <td>${riga.ripetizioni}</td>
        `;
        tbody.appendChild(tr);
      });
    }
function scaricaPDF() {
      if (dati.length === 0) {
        alert("La tabella è vuota!");
        return;
      }
      const note = document.getElementById("note").value.trim();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.text("Esercizi", 14, 25);

      // Aggiunge le note (se presenti)
      if (note) {
        const noteLines = doc.splitTextToSize("Riscaldamento: " + note, 180);
        doc.text(noteLines, 14,25);
      }

      // Calcola la posizione di partenza della tabella
      const startY = note ? 25 + (doc.getTextDimensions(note).h * 2) : 25;


      doc.autoTable({
        startY: startY +10,
        head: [['Esercizi', 'Ripetizioni']],
        body: dati.map(r => [r.esercizio, r.ripetizioni]),
      });

      doc.save("tabella.pdf");
    }