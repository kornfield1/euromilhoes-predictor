// Service Worker para o Previsor Euromilhões PWA
const CACHE_NAME = 'euromilhoes-pwa-v1';
const urlsToCache = [
  '/',
  '/estatisticas',
  '/relatorios',
  '/sobre',
  '/static/css/style.css',
  '/static/js/main.js',
  '/static/img/euromilhoes-logo.png',
  '/static/img/icon-192x192.png',
  '/static/img/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
  'https://code.jquery.com/jquery-3.6.0.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estratégia de cache: Cache First, then Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica se a resposta é válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone da resposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Evento de sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'sync-previsoes') {
    event.waitUntil(sincronizarPrevisoes());
  }
});

// Função para sincronizar previsões em segundo plano
function sincronizarPrevisoes() {
  // Implementação da sincronização de previsões
  console.log('Sincronizando previsões em segundo plano');
  return Promise.resolve();
}
