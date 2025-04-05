// config.js - Yapılandırma dosyası
// Helper function to safely get environment variables from window object
function getEnvVar(name, defaultValue = '') {
    // Check if window._env_ exists (for Vercel deployment)
    if (window._env_ && window._env_[name]) {
        return window._env_[name];
    }
    // Fallback to direct values if they exist
    if (window[name]) {
        return window[name];
    }
    return defaultValue;
}

const CONFIG = {
    emailjs: {
        serviceId: getEnvVar('EMAILJS_SERVICE_ID'),
        templateId: getEnvVar('EMAILJS_TEMPLATE_ID'),
        publicKey: getEnvVar('EMAILJS_PUBLIC_KEY'),
        receiverEmail: getEnvVar('EMAILJS_RECEIVER_EMAIL')
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