// ================================
// ANIMACIONES DE ENTRADA
// ================================

// Función para animar elementos cuando entran en el viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para cada elemento
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100); // 100ms de delay entre cada elemento

                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Activar cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Activar un poco antes
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ================================

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Si es solo "#" no hacer nada
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// EFECTO PARALLAX SUAVE EN SCROLL (OPCIONAL)
// ================================

function parallaxEffect() {
    const profileImage = document.querySelector('.profile-image');

    if (!profileImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < 300) { // Solo aplicar en los primeros 300px
            profileImage.style.transform = `translateY(${rate}px) scale(${1 - scrolled * 0.0001})`;
        }
    });
}

// ================================
// VALIDACIÓN SIMPLE DE ENLACES
// ================================

function checkBrokenLinks() {
    const links = document.querySelectorAll('a[href="#"]');

    if (links.length > 0) {
        console.warn(`⚠️ Hay ${links.length} enlaces sin configurar (href="#"). Recuerda agregar las URLs correctas.`);
    }
}

// ================================
// LOADING DE IFRAME DE GOOGLE FORMS
// ================================

function handleFormIframe() {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            console.log('✅ Formulario de Google Forms cargado correctamente');
        });

        iframe.addEventListener('error', () => {
            console.error('❌ Error al cargar el formulario de Google Forms');
        });
    });
}

// ================================
// ANALYTICS/TRACKING (OPCIONAL)
// ================================

function trackLinkClicks() {
    const buttons = document.querySelectorAll('.link-button, .social-icon');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const linkText = this.querySelector('span')?.textContent || this.getAttribute('aria-label');
            console.log(`📊 Click en: ${linkText}`);

            // Aquí puedes agregar tu código de Google Analytics o tracking
            // Ejemplo: gtag('event', 'click', { 'event_category': 'Link', 'event_label': linkText });
        });
    });
}

// ================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ================================

function detectMobile() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');
        console.log('📱 Dispositivo móvil detectado');
    }
}

// ================================
// COPIAR ENLACE AL PORTAPAPELES (OPCIONAL)
// ================================

function copyLinkToClipboard() {
    // Puedes agregar un botón para compartir la página
    const shareButton = document.querySelector('.share-button');

    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const url = window.location.href;

            navigator.clipboard.writeText(url).then(() => {
                alert('✅ Enlace copiado al portapapeles');
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    }
}

// ================================
// INICIALIZACIÓN
// ================================

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Carolina Agudelo - Construyendo Juntas');

    // Inicializar todas las funciones
    animateOnScroll();
    smoothScroll();
    detectMobile();
    checkBrokenLinks();
    handleFormIframe();
    trackLinkClicks();

    // Parallax opcional (descomenta si lo quieres)
    // parallaxEffect();

    console.log('✅ JavaScript inicializado correctamente');
});

// ================================
// SERVICE WORKER PARA PWA (OPCIONAL)
// ================================

// Si quieres convertir esto en una PWA (Progressive Web App)
// Descomenta el siguiente código:

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('❌ Error al registrar Service Worker:', error);
            });
    });
}
*/