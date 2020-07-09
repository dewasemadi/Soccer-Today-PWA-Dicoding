// /* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
} else {
    console.log("[script.js][ServiceWorker] Service Worker is not yet supported by this browser.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
            console.log("[script.js][registerServiceWorker] Service Worker registration successful.");
            return registration;
        })
        .catch(function (err) {
            console.error("[script.js][registerServiceWorker] Service Worker registration failed.", err);
        });
}

// notification cek
if ("Notification" in window) {
    requestPermission();
} else {
    console.log("Notification not supported in this browser");
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("[script.js][requestPermission] Notification feature not permitted.");
                return;
            } else if (result === "default") {
                console.error("[script.js][requestPermission] The user closes the permission request dialog box.");
                return;
            }

            navigator.serviceWorker.ready.then(() => {
                if (("PushManager") in window) {
                    navigator.serviceWorker.getRegistration().then((registration) =>
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BNbHd334g_1rpLs7Mp8iwZB8-hv8Xh-kaBp61rKvB4MY2b0beBLAMZeL2bSthGiH50kH5jDTBhIgCuweTenM_vY")
                        }).then(function (subscribe) {
                            console.log("[script.js][requestPermission] Successfully subscribed");
                            console.log("[Endpoint]: ", subscribe.endpoint);
                            console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                            console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                        }).catch(function (e) {
                            console.error("[script.js][requestPermission] Unable to subscribe", e.message);
                        })
                    )
                }
            })
        });
    }
}