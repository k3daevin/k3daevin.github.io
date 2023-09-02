// service-worker.js

let counter = 0;

// Eine Funktion, um den Counter alle Sekunde zu erhöhen
function increaseCounter() {
  setInterval(() => {
    counter++;
    // Nachricht an die Webseite senden, um den Counter-Wert zu aktualisieren
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'counterUpdate', value: counter });
      });
    });
  }, 1000); // 1000 Millisekunden (1 Sekunde)
}

self.addEventListener('install', (event) => {
  // Installationsschritte...
});

self.addEventListener('activate', (event) => {
  // Aktivierungsschritte...
  // Hier starten wir den Counter, nachdem der Service Worker aktiviert wurde.
  increaseCounter();
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'registerClient') {
        // Wenn die Webseite sich beim Service Worker registriert, fügen wir sie zur Liste der Clients hinzu.
        self.clients.push(event.source);
    }
});