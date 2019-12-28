var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BN_Nlz_F2MfHyLKEltqTCVtGtTLJwc2fMr21-zwOxbhJ3ZMKsAxpx1I2uIw1nCUIgVdVgBnDYtoZVXBzglcIOfI",
    "privateKey": "AUDlliBbGA6VhnDq4Ucxj5dKkMnEHJavebKDFuIwLEM"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fGS525QjKCA:APA91bHX1IxQSwLj2Mzzaftlao3iPneP9D2ijSt7hCFa3R0uv7fqJfPMl7LjpvdDqL4Z0SODY0zIkb2by3DywX-0Nks7cGAFO_1xVFA7C_QT45x3ohxCMdegzhHjzmNWbUlk1OMVUmzS",
    "keys": {
        "p256dh": "BNIepp6a+0dr2YBwUZXbpRBW/dl2pY2uiT5p6W7yQh4+TOPrG0gBsZSuGqnUBkzeH3SS4K/i6FeQbcQIGVKr8TY=",
        "auth": "B9XZxPF/lCU+KFbDtEa1HA=="
    }
};
var payload = 'Hai Selamat Datang Di Soccer Site!';

var options = {
    gcmAPIKey: '778800223399',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);