var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BNbHd334g_1rpLs7Mp8iwZB8-hv8Xh-kaBp61rKvB4MY2b0beBLAMZeL2bSthGiH50kH5jDTBhIgCuweTenM_vY",
    "privateKey": "VeVrSVYZtwvuzkQVsQpdo7exVKG99iX54wQL0t1AdOQ"
};

webPush.setVapidDetails(
    "mailto:dewasemadi@apps.ipb.ac.id",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d5XJHVgisjs:APA91bGOZcCu0RA_qKNMnSVKUriBldmNT0xw0PkSj7XalGsxWQBJNzeJrYuS__omSmEJGt9c4_An7stznxV6_TP7jXLb9wH5gemqe2dZJgJncNBCX-MZwMTbaW0fhu8rcDb2tdh_iIMB",
    "keys": {
        "p256dh": "BGq9GSEgwa6hoTGmnRG7d9r6JcE7wrgnbRosqvu9uUtSs/c2bIfNuLz/Lt2dd5fOd50Zsk5+LUnXhg8uhPonPns=",
        "auth": "JE5iHgjHklXUyWnNHMCe/w=="
    }
};

var payload = "Congratulations! Your application can already receive push notifications!";

var options = {
    gcmAPIKey: "835554547434",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);