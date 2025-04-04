// contact.js - İletişim formu işlemleri
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(CONFIG.emailjs.publicKey);
    } else {
        console.error(currentLang === 'tr' ? "EmailJS kütüphanesi yüklenemedi." : "EmailJS library could not be loaded.");
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error("Form bulunamadı: id='contactForm'");
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Form değerlerini al
        const emailInput = document.getElementById('email');
        const email = emailInput.value;
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const submitButton = this.querySelector('button[type="submit"]');

        // Email doğrulama
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLang === 'tr' ? 'Lütfen geçerli bir e-posta adresi giriniz.' : 'Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        // Buton durumunu güncelle
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';

        // EmailJS için parametreleri hazırla
        const templateParams = {
            to_email: CONFIG.emailjs.receiverEmail,
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email
        };

        // EmailJS ile gönder
        emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert(currentLang === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!');
                contactForm.reset();
            })
            .catch(function (error) {
                console.error('FAILED...', error);
                alert(currentLang === 'tr'
                    ? 'Mesaj gönderilirken bir hata oluştu: ' + JSON.stringify(error)
                    : 'An error occurred while sending your message: ' + JSON.stringify(error));
            })
            .finally(function () {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
    });
}