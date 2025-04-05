// config.js - Yapılandırma dosyası
const CONFIG = {
    emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID,
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        receiverEmail: process.env.EMAILJS_RECEIVER_EMAIL
    },
    animationSettings: {
        loadingBarDuration: 1000,
        intersectionThreshold: 0.1
    },
    threeJS: {
        particleCount: 1000,
        particleSize: 0.02,
        darkThemeColor: 0x61dafb,
        lightThemeColor: 0x3498db
    }
};

// Uygulamaya özgü değişkenler
let currentLang = 'tr';
let threeJSInstance = null;

// Config'i global olarak dışa aktar
window.CONFIG = CONFIG;