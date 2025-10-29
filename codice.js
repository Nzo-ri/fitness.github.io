function mostraSezione(id) {
      // Nasconde tutte le sezioni
      const sezioni = document.querySelectorAll("section");
      sezioni.forEach(s => s.classList.remove("active"));

      // Mostra solo la sezione selezionata
      const sezioneAttiva = document.getElementById(id);
      sezioneAttiva.classList.add("active");
    }