// ==========================
// Buscador avanzado Macachi
// ==========================


// ==========================
// Scroll automático y resaltado de producto
// ==========================

/**
 * Si la URL contiene un hash (#id), hace scroll automático al producto correspondiente
 * Resalta el producto durante 2 segundos para llamar la atención del usuario
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const id = window.location.hash.substring(1); // Obtiene el id del hash
        const el = document.getElementById(id); // Busca el elemento con ese id
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll suave al producto
                el.classList.add('highlight-product'); // Añade clase de resaltado
                setTimeout(() => el.classList.remove('highlight-product'), 2000); // Quita el resaltado después de 2s
            }, 300); // Espera a que cargue el DOM
        }
    }
});

// ==========================
// Acordeón del footer Macachi
// ==========================

/**
 * Permite expandir y contraer secciones del footer tipo acordeón
 * Útil para mostrar información adicional en dispositivos móviles
 */
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.footer-accordion');
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.footer-accordion-header');
        const content = accordion.querySelector('.footer-accordion-content');
        if (header && content) {
            header.addEventListener('click', function() {
                // Alterna la visibilidad del contenido
                content.classList.toggle('active');
                // Opcional: alterna el icono de flecha si existe
                const arrow = header.querySelector('.footer-accordion-arrow');
                if (arrow) {
                    arrow.classList.toggle('open');
                }
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-form');
    const input = document.querySelector('.search-input');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    let externalResultsDiv = document.getElementById('external-search-results');
    // Colocar el div justo después del grid de productos
    if (!externalResultsDiv) {
        externalResultsDiv = document.createElement('div');
        externalResultsDiv.id = 'external-search-results';
        externalResultsDiv.style.display = 'none';
        externalResultsDiv.style.margin = '2rem 0';
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid && productsGrid.parentNode) {
            if (productsGrid.nextSibling) {
                productsGrid.parentNode.insertBefore(externalResultsDiv, productsGrid.nextSibling);
            } else {
                productsGrid.parentNode.appendChild(externalResultsDiv);
            }
        } else {
            document.body.appendChild(externalResultsDiv);
        }
    }
    // Lista de páginas de productos a buscar (agrega/quita según tus archivos)
    const productPages = [
        'tornillos-de-lujo.html', 'tapa-valvulas.html', 'lujos-varios.html', 'tuercas.html',
        'tornillos.html', 'chapetas.html', 'tornillosespeciales.html', 'esparragos.html',
        'taponescarter.html', 'arandelasguias.html', 'resortes.html', 'fuelles.html',
        'cauchos-internos.html', 'partes-acelerador.html', 'pdpp.html', 'kitsprocket.html',
        'lineadepuff.html', 'herramientas.html', 'leva.html', 'tensordecadena.html',
        'ejes.html', 'parrillas.html', 'patas.html', 'defensas.html'
    ];

    if (form && input) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = input.value.trim().toLowerCase();
            if (!query) {
                // Mostrar todos si la búsqueda está vacía
                productCards.forEach(card => card.style.display = '');
                externalResultsDiv.style.display = 'none';
                externalResultsDiv.innerHTML = '';
                return;
            }
            // Filtrar productos del index
            productCards.forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                const features = Array.from(card.querySelectorAll('.product-features li')).map(li => li.textContent.toLowerCase()).join(' ');
                if (title.includes(query) || desc.includes(query) || features.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            // Buscar en los otros HTML
            fetchExternalResults(query);
        });
    }

    async function fetchExternalResults(query) {
        // Si la página es local (file://), fetch no funcionará. Solo funcionará en servidor web.
        if (location.protocol === 'file:') {
            externalResultsDiv.style.display = 'block';
            externalResultsDiv.innerHTML = '<div style="color:red">Para ver resultados de otras páginas, abre el sitio en un servidor web.</div>';
            return;
        }
        let results = [];
        await Promise.all(productPages.map(async (page) => {
            try {
                const res = await fetch(page);
                if (!res.ok) return;
                const text = await res.text();
                // Extraer productos de la página
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const cards = Array.from(doc.querySelectorAll('.product-card'));
                cards.forEach((card, idx) => {
                    const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                    const features = Array.from(card.querySelectorAll('.product-features li')).map(li => li.textContent.toLowerCase()).join(' ');
                    if (title.includes(query) || desc.includes(query) || features.includes(query)) {
                        // Clonar el nodo y ajustar enlaces relativos
                        const clone = card.cloneNode(true);
                        // Crear un id único para el producto en la página de origen
                        let productId = card.getAttribute('id');
                        if (!productId) {
                            productId = 'product-' + idx;
                        }
                        // Envolver la tarjeta en un enlace a la página de origen con hash al id
                        const wrapper = document.createElement('a');
                        wrapper.href = page + '#' + productId;
                        wrapper.style.textDecoration = 'none';
                        wrapper.style.color = 'inherit';
                        // Asegurarse de que el clon NO tenga el id (para evitar duplicados en el DOM actual)
                        clone.removeAttribute('id');
                        wrapper.innerHTML = clone.outerHTML;
                        results.push(wrapper.outerHTML);
                    }
                });
            } catch (err) { /* ignorar errores de fetch */ }
        }));
        if (results.length > 0) {
            externalResultsDiv.style.display = 'block';
            externalResultsDiv.innerHTML =
                '<h3 id="external-search-results-title">También te puede interesar</h3>' +
                '<div class="products-grid">' + results.join('') + '</div>';
        } else {
            externalResultsDiv.style.display = 'none';
            externalResultsDiv.innerHTML = '';
        }
    }
});

// Funcionalidades del slider

// ==========================
// Slider de productos Macachi
// ==========================

/**
 * Controla el slider/carrousel de productos en la página principal
 * Permite navegación manual y automática entre slides
 */
let currentSlideIndex = 0; // Índice de la slide actual
const slides = document.querySelectorAll('.slide'); // Todas las slides
const indicators = document.querySelectorAll('.indicator'); // Indicadores de navegación
const totalSlides = slides.length; // Número total de slides

/**
 * Muestra la slide correspondiente al índice dado
 * @param {number} index - Índice de la slide a mostrar
 */
function showSlide(index) {
    // Oculta todas las slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Muestra la slide e indicador actual
    if (slides[index]) slides[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
}

/**
 * Cambia la slide actual según la dirección (1 siguiente, -1 anterior)
 * @param {number} direction - Dirección del cambio
 */
function changeSlide(direction) {
    currentSlideIndex += direction;

    // Ciclo infinito: vuelve al inicio o al final si se sale de rango
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }

    showSlide(currentSlideIndex);
}

/**
 * Cambia a la slide seleccionada por el usuario (desde indicador)
 * @param {number} index - Índice de la slide (1-based)
 */
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Reproducción automática del slider cada 5 segundos
if (totalSlides > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Cambia cada 5 segundos
}


// ==========================
// Buscador avanzado Macachi
// ==========================

/**
 * Scroll automático al producto si hay hash en la URL
 * Resalta el producto durante 2 segundos
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight-product');
                setTimeout(() => el.classList.remove('highlight-product'), 2000);
            }, 300);
        }
    }
});

/**
 * Buscador de productos en el index y en otras páginas
 * Muestra resultados locales y externos
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales del buscador
    const form = document.querySelector('.search-form');
    const input = document.querySelector('.search-input');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    let externalResultsDiv = document.getElementById('external-search-results');

    // Crear el div de resultados externos si no existe
    if (!externalResultsDiv) {
        externalResultsDiv = document.createElement('div');
        externalResultsDiv.id = 'external-search-results';
        externalResultsDiv.style.display = 'none';
        externalResultsDiv.style.margin = '2rem 0';
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid && productsGrid.parentNode) {
            if (productsGrid.nextSibling) {
                productsGrid.parentNode.insertBefore(externalResultsDiv, productsGrid.nextSibling);
            } else {
                productsGrid.parentNode.appendChild(externalResultsDiv);
            }
        } else {
            document.body.appendChild(externalResultsDiv);
        }
    }

    // Lista de páginas de productos a buscar
    const productPages = [
        'tornillos-de-lujo.html', 'tapa-valvulas.html', 'lujos-varios.html', 'tuercas.html',
        'tornillos.html', 'chapetas.html', 'tornillosespeciales.html', 'esparragos.html',
        'taponescarter.html', 'arandelasguias.html', 'resortes.html', 'fuelles.html',
        'cauchos-internos.html', 'partes-acelerador.html', 'pdpp.html', 'kitsprocket.html',
        'lineadepuff.html', 'herramientas.html', 'leva.html', 'tensordecadena.html',
        'ejes.html', 'parrillas.html', 'patas.html', 'defensas.html'
    ];

    // Evento de búsqueda
    if (form && input) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = input.value.trim().toLowerCase();
            if (!query) {
                // Mostrar todos si la búsqueda está vacía
                productCards.forEach(card => card.style.display = '');
                externalResultsDiv.style.display = 'none';
                externalResultsDiv.innerHTML = '';
                return;
            }
            // Filtrar productos del index
            productCards.forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                const features = Array.from(card.querySelectorAll('.product-features li')).map(li => li.textContent.toLowerCase()).join(' ');
                if (title.includes(query) || desc.includes(query) || features.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            // Buscar en los otros HTML
            fetchExternalResults(query);
        });
    }

    /**
     * Busca productos en otras páginas HTML y muestra los resultados
     * @param {string} query - Texto de búsqueda
     */
    async function fetchExternalResults(query) {
        // Si la página es local (file://), fetch no funcionará. Solo funcionará en servidor web.
        if (location.protocol === 'file:') {
            externalResultsDiv.style.display = 'block';
            externalResultsDiv.innerHTML = '<div style="color:red">Para ver resultados de otras páginas, abre el sitio en un servidor web.</div>';
            return;
        }
        let results = [];
        await Promise.all(productPages.map(async (page) => {
            try {
                const res = await fetch(page);
                if (!res.ok) return;
                const text = await res.text();
                // Extraer productos de la página
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const cards = Array.from(doc.querySelectorAll('.product-card'));
                cards.forEach((card, idx) => {
                    const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                    const features = Array.from(card.querySelectorAll('.product-features li')).map(li => li.textContent.toLowerCase()).join(' ');
                    if (title.includes(query) || desc.includes(query) || features.includes(query)) {
                        // Clonar el nodo y ajustar enlaces relativos
                        const clone = card.cloneNode(true);
                        // Crear un id único para el producto en la página de origen
                        let productId = card.getAttribute('id');
                        if (!productId) {
                            productId = 'product-' + idx;
                        }
                        // Envolver la tarjeta en un enlace a la página de origen con hash al id
                        const wrapper = document.createElement('a');
                        wrapper.href = page + '#' + productId;
                        wrapper.style.textDecoration = 'none';
                        wrapper.style.color = 'inherit';
                        // Asegurarse de que el clon NO tenga el id (para evitar duplicados en el DOM actual)
                        clone.removeAttribute('id');
                        wrapper.innerHTML = clone.outerHTML;
                        results.push(wrapper.outerHTML);
                    }
                });
            } catch (err) { /* ignorar errores de fetch */ }
        }));
        if (results.length > 0) {
            externalResultsDiv.style.display = 'block';
            externalResultsDiv.innerHTML =
                '<h3 id="external-search-results-title">También te puede interesar</h3>' +
                '<div class="products-grid">' + results.join('') + '</div>';
        } else {
            externalResultsDiv.style.display = 'none';
            externalResultsDiv.innerHTML = '';
        }
    }
});
