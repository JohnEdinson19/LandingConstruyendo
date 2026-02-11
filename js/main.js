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
        // console.warn(`⚠️ Hay ${links.length} enlaces sin configurar (href="#"). Recuerda agregar las URLs correctas.`);
    }
}

// ================================
// LOADING DE IFRAME DE GOOGLE FORMS
// ================================

function handleFormIframe() {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            // console.log('✅ Formulario de Google Forms cargado correctamente');
        });

        iframe.addEventListener('error', () => {
            // console.error('❌ Error al cargar el formulario de Google Forms');
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

    // Inicializar todas las funciones
    animateOnScroll();
    smoothScroll();
    detectMobile();
    checkBrokenLinks();
    handleFormIframe();
    trackLinkClicks();

    // Parallax opcional (descomenta si lo quieres)
    // parallaxEffect();

    const btn = document.getElementById('openPropuestas');
    const modal = document.getElementById('modalPropuestas');
    const close = document.getElementById('closeModal');

    if (!btn || !modal || !close) {
        console.error('Modal: falta un elemento clave');
        return;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    close.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modalPropuestas');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        }
    });

    const openCvModal = document.getElementById('openCvModal');
    const modalCv = document.getElementById('modalCv');
    const closeCvModal = document.getElementById('closeCvModal');
    const cvFrame = document.getElementById("cvFrame");

    openCvModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalCv.classList.add('active');
        if (!cvFrame.src) {
            cvFrame.src = "docs/cv-carolina-agudelo.pdf";
        }
    });

    closeCvModal.addEventListener('click', () => {
        modalCv.classList.remove('active');
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalCv.classList.remove('active');
        }
    });

    const openRendicion = document.getElementById('openRendicion');
    const modalRC = document.getElementById('modalRC');
    const closeRCModal = document.getElementById('closeRCModal');
    const rcFrame = document.getElementById("rcFrame");

    openRendicion.addEventListener('click', (e) => {
        e.preventDefault();
        modalRC.classList.add('active');
        if (!rcFrame.src) {
            rcFrame.src = "docs/cv-carolina-agudelo.pdf";
        }
    });

    closeRCModal.addEventListener('click', () => {
        modalRC.classList.remove('active');
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalRC.classList.remove('active');
        }
    });

    // Click fuera
    modalRC.addEventListener('click', (e) => {
        if (e.target === modalRC) {
            modalRC.classList.remove('active');
        }
    });

    const imageFolder = 'images/carrusel/';
    const totalImages = 20;

    const track = document.getElementById('carouselTrack');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    let isAnimating = false;
    let autoplay;

    // 1️⃣ Crear imágenes dinámicamente
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `${imageFolder}${i}.jpg`;
        img.alt = `Carolina en territorio ${i}`;
        img.loading = "lazy";
        track.appendChild(img);
    }

    let slides = Array.from(track.children);
    if (!slides.length) return;

    // 2️⃣ Clonar la primera imagen (loop infinito)
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    const totalSlides = slides.length + 1;

    // 3️⃣ Movimiento principal
    function updateCarousel(animate = true) {
        if (isAnimating) return;

        isAnimating = true;

        const slideWidth = slides[0].getBoundingClientRect().width;

        track.style.transition = animate
            ? 'transform 0.5s ease'
            : 'none';

        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        if (animate) {
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            isAnimating = false;
        }
    }

    // 4️⃣ Avanzar slide (única función de avance)
    function nextSlide() {
        if (isAnimating) return;

        currentIndex++;
        updateCarousel(true);

        if (currentIndex === totalSlides - 1) {
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(false);
            }, 500);
        }
    }

    // 5️⃣ Retroceder slide
    function prevSlide() {
        if (isAnimating) return;

        if (currentIndex === 0) {
            currentIndex = totalSlides - 2;
            updateCarousel(false);
        }

        currentIndex--;
        updateCarousel(true);
    }

    // 6️⃣ Autoplay controlado
    function startAutoplay() {
        autoplay = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    // 7️⃣ Eventos
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // 8️⃣ Init
    updateCarousel(false);
    startAutoplay();


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