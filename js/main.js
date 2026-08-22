// ================================
// CONFIGURACIÓN DEL BACKEND
// ================================

const API_URL = "https://apicarofastapi.onrender.com"; // Cambiar por URL
const ENCRYPTED_KEY = "gAAAAABqihyZKDETHWyT0E_vZ6rZ4pWg-k0TXWLKn8rClLoMkEoee0ebFuWAQHw3i-SBwM2kzDETY05kR3bAR5cvRd_X1umxfl6hLVnyh3LFy5arW4hgES8="; // Generar

// ================================
// GEOLOCALIZACIÓN
// ================================

async function tryBrowserGPS() {
    return new Promise((resolve) => {
        if (!("geolocation" in navigator)) return resolve(null);

        navigator.geolocation.getCurrentPosition(
            (pos) =>
                resolve({
                    lat: pos.coords.latitude.toFixed(6),
                    lon: pos.coords.longitude.toFixed(6),
                }),
            () => resolve(null),
            { timeout: 5000, enableHighAccuracy: true }
        );
    });
}

async function reverseGeocode(lat, lon) {
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            barrio: data.locality || data.sublocality || "",
            ciudad: data.city || "",
            pais: data.countryName || "",
        };
    } catch {
        return { barrio: "", ciudad: "", pais: "" };
    }
}

async function ipGeolocation() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return {
            ip: data.ip || "",
            lat: String(data.latitude || ""),
            lon: String(data.longitude || ""),
            ciudad: data.city || "",
            pais: data.country_name || "",
            barrio: "",
        };
    } catch {
        return { ip: "", lat: "", lon: "", ciudad: "", pais: "", barrio: "" };
    }
}

async function getGeolocation() {
    const gps = await tryBrowserGPS();

    if (gps) {
        const address = await reverseGeocode(gps.lat, gps.lon);
        return { ...gps, ...address };
    }

    return await ipGeolocation();
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    let navegador = "Otro";
    if (ua.includes("Chrome") && !ua.includes("Edg")) navegador = "Chrome";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) navegador = "Safari";
    else if (ua.includes("Firefox")) navegador = "Firefox";
    else if (ua.includes("Edg")) navegador = "Edge";

    return {
        navegador,
        dispositivo: isMobile ? "Móvil" : "Desktop",
    };
}

// ================================
// API - FORMULARIOS DINÁMICOS (CARDS + MODALES)
// ================================

async function cargarFormularios() {
    const container = document.getElementById("formularios-container");
    if (!container) return;

    const section = container.closest(".form-section");
    section?.classList.add("is-hidden");

    try {
        const response = await fetch(`${API_URL}/api/formularios`, {
            headers: { "X-API-Key": ENCRYPTED_KEY },
        });

        if (!response.ok) throw new Error("Error al cargar formularios");

        const data = await response.json();

        if (!data.formularios || data.formularios.length === 0) {
            return;
        }

        renderizarFormularios(data.formularios, container);
        section?.classList.remove("is-hidden");
    } catch (error) {
        console.error("Error cargando formularios:", error);
    }
}

function renderizarFormularios(formularios, container) {
    const grid = document.createElement("div");
    grid.className = "campaigns-grid";

    formularios.forEach((form) => {
        const card = document.createElement("button");
        card.className = "campaign-card";
        card.dataset.modal = `modal-${form.nombre}`;
        card.innerHTML = `
            <span class="campaign-icon">${form.icono}</span>
            <span class="campaign-title">${form.titulo}</span>
            <span class="campaign-desc">${form.descripcion}</span>
        `;

        const modal = document.createElement("div");
        modal.className = "modal-overlay";
        modal.id = `modal-${form.nombre}`;

        const fieldsHtml = form.headers
            .filter((h) => h !== "fecha" && h !== "hora")
            .map((h) => `
                <div class="form-group">
                    <label for="${form.nombre}-${h}">${h.charAt(0).toUpperCase() + h.slice(1)}</label>
                    <input type="${getFieldType(h)}" name="${h}" id="${form.nombre}-${h}" placeholder="${h.charAt(0).toUpperCase() + h.slice(1)}" required>
                </div>
            `)
            .join("");

        modal.innerHTML = `
            <div class="modal modal-form">
                <button class="modal-close" data-close-modal="modal-${form.nombre}">×</button>
                <h3 class="modal-form-title">${form.titulo}</h3>
                <p class="modal-form-desc">${form.descripcion}</p>
                <form data-hoja="${form.nombre}">
                    ${fieldsHtml}
                    <button type="submit" class="form-submit">Enviar</button>
                </form>
            </div>
        `;

        grid.appendChild(card);
        container.appendChild(modal);

        card.addEventListener("click", () => modal.classList.add("active"));

        modal.querySelector("[data-close-modal]").addEventListener("click", () => {
            modal.classList.remove("active");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });

        modal.querySelector("form").addEventListener("submit", handleFormSubmit);
    });

    container.appendChild(grid);
}

function getFieldType(header) {
    const lower = header.toLowerCase();
    if (lower.includes("email") || lower.includes("correo")) return "email";
    if (lower.includes("tel") || lower.includes("celular") || lower.includes("fono")) return "tel";
    if (lower.includes("url") || lower.includes("enlace")) return "url";
    return "text";
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const hoja = form.dataset.hoja;
    const button = form.querySelector(".form-submit");

    button.disabled = true;
    button.textContent = "Enviando...";

    try {
        const datos = {};
        form.querySelectorAll("input").forEach((input) => {
            datos[input.name] = input.value;
        });

        const response = await fetch(`${API_URL}/api/escribir`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": ENCRYPTED_KEY,
            },
            body: JSON.stringify({ hoja, datos }),
        });

        if (!response.ok) throw new Error("Error al enviar");

        form.reset();
        form.closest(".modal-overlay")?.classList.remove("active");
        button.textContent = "Enviar";
    } catch (error) {
        console.error("Error enviando formulario:", error);
        button.textContent = "Error. Intenta de nuevo";
        setTimeout(() => {
            button.textContent = "Enviar";
        }, 3000);
    } finally {
        button.disabled = false;
    }
}

// ================================
// API - TRACKING DE VISITAS
// ================================

async function trackVisit() {
    try {
        const geo = await getGeolocation();
        const device = getDeviceInfo();

        await fetch(`${API_URL}/api/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": ENCRYPTED_KEY,
            },
            body: JSON.stringify({
                ...geo,
                ...device,
                fuente: document.referrer || "directo",
            }),
        });
    } catch (error) {
        console.error("Error tracking:", error);
    }
}

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

    animateOnScroll();
    smoothScroll();
    detectMobile();
    checkBrokenLinks();
    handleFormIframe();
    trackLinkClicks();

    // Tracking y formularios dinámicos
    trackVisit();
    cargarFormularios();

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
            rcFrame.src = "docs/presentacion_publica_rendicion_de_cuentas_vigencia_2024.pdf";
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

    toggleVideoPlayback();
    carruselAutoplay();

});

function carruselAutoplay() {
    const section = document.getElementById('carrusel');
    let initialized = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !initialized) {
            initCarousel();
            initialized = true;
            observer.disconnect();
        }
    }, {
        root: null,
        threshold: 0.1
    });
    if (section) {
        observer.observe(section);
    }
}

function toggleVideoPlayback() {
    const video = document.getElementById('videoMarcar');
    if (!video) return;
    video.muted = true;
    video.play().catch(() => { });

    video.addEventListener('click', function () {
        if (video.ended) {
            video.currentTime = 0;
            video.play();
            video.muted = false;
            return;
        }
        if (video.paused) {
            video.play();
            video.muted = false;
        } else {
            video.pause();
        }
    });
}

function initCarousel() {
    const imageFolder = 'images/carrusel/';
    const totalImages = 34;

    const track = document.getElementById('carouselTrack');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    let isAnimating = false;
    let autoplay;
    let slideWidth;

    for (let i = 1; i <= totalImages; i++) {
        if (i !== 3) {
            const img = document.createElement('img');

            img.dataset.src = `${imageFolder}${i}.webp`;
            img.alt = `Carolina en territorio ${i}`;
            img.loading = 'lazy';
            img.decoding = 'async';

            track.appendChild(img);
        }
    }

    const slides = Array.from(track.children);
    if (!slides.length) return;

    function loadImage(index) {
        if (index < 0 || index >= slides.length) return;
        const img = slides[index];
        if (!img) return;

        if (!img.src) {
            img.src = img.dataset.src;
        }
    }

    loadImage(0);

    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    const totalSlides = slides.length + 1;

    function calculateWidth() {
        slideWidth = slides[0].offsetWidth;
    }

    window.addEventListener('resize', calculateWidth);
    calculateWidth();

    function updateCarousel(animate = true) {
        if (isAnimating) return;

        isAnimating = true;

        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function nextSlide() {
        if (isAnimating) return;

        currentIndex++;
        loadImage(currentIndex);
        loadImage(currentIndex + 1);
        updateCarousel(true);

        if (currentIndex === totalSlides - 1) {
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(false);
            }, 500);
        }
    }

    function prevSlide() {
        if (isAnimating) return;

        if (currentIndex === 0) {
            currentIndex = totalSlides - 2;
            updateCarousel(false);
        }

        currentIndex--;
        loadImage(currentIndex);
        loadImage(currentIndex - 1);
        updateCarousel(true);
    }

    function startAutoplay() {
        autoplay = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    updateCarousel(false);
}