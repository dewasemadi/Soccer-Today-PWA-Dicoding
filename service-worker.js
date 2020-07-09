importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// cek workbox
if (workbox) {
    console.log('Workbox loaded successfully');
    // cache html, css, and js
    workbox.precaching.precacheAndRoute([{
            url: '/',
            revision: '1'
        },
        {
            url: '/manifest.json',
            revision: '1'
        },
        {
            url: '/index.html',
            revision: '1'
        },
        {
            url: '/nav.html',
            revision: '1'
        },
        {
            url: '/matchesDetails.html',
            revision: '1'
        },
        {
            url: '/playerDetails.html',
            revision: '1'
        },
        {
            url: '/teamDetails.html',
            revision: '1'
        },
        // css
        {
            url: '/css/materialize.min.css',
            revision: '1'
        },
        {
            url: '/css/style.css',
            revision: '1'
        },
        // js
        {
            url: '/js/api.js',
            revision: '1'
        },
        {
            url: '/js/db.js',
            revision: '1'
        },
        {
            url: '/js/helpers.js',
            revision: '1'
        },
        {
            url: '/js/idb.js',
            revision: '1'
        },
        {
            url: '/js/materialize.min.js',
            revision: '1'
        },
        {
            url: '/js/script.js',
            revision: '1'
        },
        {
            url: '/js/nav.js',
            revision: '1'
        },
        {
            url: '/js/standings.js',
            revision: '1'
        },
        {
            url: '/js/matches.js',
            revision: '1'
        },
        {
            url: '/js/teams.js',
            revision: '1'
        },
        {
            url: '/js/matchFav.js',
            revision: '1'
        },
        {
            url: '/js/playerFav.js',
            revision: '1'
        },
        {
            url: '/js/teamFav.js',
            revision: '1'
        },
        // CDN
        {
            url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
            revision: '1'
        },
        {
            url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            revision: '1'
        },
        {
            url: 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-borderless/borderless.css',
            revision: '1'
        },
        {
            url: 'https://cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.js',
            revision: '1'
        },
        {
            url: 'https://code.jquery.com/jquery-3.5.1.js',
            revision: '1'
        },
        {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/js/materialize.min.js',
            revision: '1'
        },
    ], {
        // ignore URL parameter
        ignoreUrlParametersMatching: [/.*/]
    });

    // Caching Google Fonts
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // cache image
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
        workbox.strategies.cacheFirst({
            cacheName: "img",
            plugins: [
                new workbox.expiration.Plugin({
                    // max file
                    maxEntries: 80,
                    // max time
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                })
            ]
        })
    )

    // cache dynamic pages
    workbox.routing.registerRoute(
        new RegExp("/pages/"),
        workbox.strategies.staleWhileRevalidate({
            cacheName: "pages"
        })
    )

    // cache api 
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: "API"
        })
    )

} else {
    console.log('Workbox failed to load')
}

// start push notification area
self.addEventListener("push", event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    const options = {
        body: body,
        icon: "/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});