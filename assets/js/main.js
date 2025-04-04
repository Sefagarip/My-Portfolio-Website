// main.js - Ana JavaScript dosyası
document.addEventListener('DOMContentLoaded', () => {
    // Dil ayarlarını yükle
    loadPreferredLanguage();
    initLanguageToggle();

    // EmailJS'yi başlat
    initEmailJS();

    // İletişim formunu ayarla
    setupContactForm();

    // UI animasyonlarını başlat
    initLoadingBar();
    initSmoothScrolling();
    initScrollAnimations();
    initProgressBar();
    initSectionVisibility();

    // Tema değiştirme butonunu ayarla
    initThemeToggle();

    // ThreeJS arkaplanını başlat
    threeJSInstance = initThreeJS();
});