// language.js - Dil değiştirme işlemleri
function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const translation = element.getAttribute('data-' + lang);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update language button text
    document.querySelector('.current-lang').textContent = lang.toUpperCase();

    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// Dil değiştirme butonu için event listener
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            changeLanguage(newLang);
        });
    }
}

// Kaydedilmiş dil tercihini yükle
function loadPreferredLanguage() {
    const preferredLang = localStorage.getItem('preferred-language') || 'tr';
    changeLanguage(preferredLang);
}