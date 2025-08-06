
// ============================================
// FUNCIONALIDADES DEL CARRITO DE COMPRAS
// ============================================

/**
 * Este archivo gestiona el carrito de compras: agregar, eliminar, actualizar productos,
 * mostrar notificaciones, abrir/cerrar el modal y enviar el pedido por WhatsApp.
 * Todas las funciones principales están comentadas para facilitar el mantenimiento.
 */

// --------------------------------------------
// Clase principal del carrito de compras
// --------------------------------------------
class ShoppingCart {

    /**
     * Constructor: carga el carrito y lo inicializa
     */
    constructor() {
        this.items = this.loadCartFromStorage();
        this.init();
    }


    /**
     * Inicializa el carrito: contador y eventos
     */
    init() {
        this.updateCartCounter();
        this.bindEvents();
    }

    /**
     * Carga el carrito desde localStorage
     */
    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('macachi_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            return [];
        }
    }

    /**
     * Guarda el carrito en localStorage
     */
    saveCartToStorage() {
        try {
            localStorage.setItem('macachi_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    }

    /**
     * Añade un producto al carrito
     */
    addItem(product, quantity = 1, selectedSize = null) {
        const existingItem = this.items.find(item => 
            item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                title: product.title,
                image: product.image,
                selectedSize: selectedSize,
                quantity: quantity,
                dateAdded: new Date().toISOString()
            });
        }

        this.saveCartToStorage();
        this.updateCartCounter();
        this.showAddToCartNotification(product.title);
    }

    /**
     * Elimina un producto del carrito
     */
    removeItem(productId, selectedSize = null) {
        this.items = this.items.filter(item => 
            !(item.id === productId && item.selectedSize === selectedSize)
        );
        this.saveCartToStorage();
        this.updateCartCounter();
        this.updateCartModal();
    }

    /**
     * Actualiza la cantidad de un producto
     */
    updateQuantity(productId, selectedSize, newQuantity) {
        const item = this.items.find(item => 
            item.id === productId && item.selectedSize === selectedSize
        );
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId, selectedSize);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartCounter();
                this.updateCartModal();
            }
        }
    }

    /**
     * Devuelve el total de productos en el carrito
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Vacía el carrito
     */
    clearCart() {
        this.items = [];
        this.saveCartToStorage();
        this.updateCartCounter();
        this.updateCartModal();
    }

    /**
     * Actualiza el contador visual del carrito
     */
    updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        const totalItems = this.getTotalItems();
        
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Muestra una notificación cuando se añade un producto
     */
    showAddToCartNotification(productTitle) {
        // Remover notificación existente si la hay
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>¡${productTitle} añadido al carrito!</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Mostrar notificación
        setTimeout(() => notification.classList.add('show'), 100);

        // Ocultar y remover notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Abre el modal del carrito
     */
    openCartModal() {
        this.updateCartModal();
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Cierra el modal del carrito
     */
    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Actualiza el contenido del modal del carrito
     */
    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <h3>Tu carrito está vacío</h3>
                    <p>¡Agrega algunos productos y empezemos a crear algo increíble!</p>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = '0 productos';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.selectedSize || ''}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    ${item.selectedSize ? `<p class="item-size">Medida: ${item.selectedSize}</p>` : ''}
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button onclick="cart.updateQuantity('${item.id}', '${item.selectedSize || ''}', ${item.quantity - 1})">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button onclick="cart.updateQuantity('${item.id}', '${item.selectedSize || ''}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item" onclick="cart.removeItem('${item.id}', '${item.selectedSize || ''}')">
                            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        if (cartTotal) {
            cartTotal.textContent = `${this.getTotalItems()} producto${this.getTotalItems() !== 1 ? 's' : ''}`;
        }
    }

    /**
     * Envía el pedido por WhatsApp
     */
    checkout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        let message = '¡Hola Macachi! 🏍️\n\nMe interesa el siguiente pedido:\n\n';
        
        this.items.forEach((item, index) => {
            message += `${index + 1}. ${item.title}\n`;
            if (item.selectedSize) {
                message += `   Medida: ${item.selectedSize}\n`;
            }
            message += `   Cantidad: ${item.quantity}\n\n`;
        });

        message += `Total de productos: ${this.getTotalItems()}\n\n`;
        message += '¿Podrías ayudarme con los precios y disponibilidad? ¡Gracias!';

        const whatsappUrl = `https://wa.me/573114446963?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Vincula los eventos de la interfaz al carrito
     */
    bindEvents() {
        // Evento para abrir carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-link')) {
                e.preventDefault();
                this.openCartModal();
            }

            // Evento para cerrar carrito con la X
            if (e.target.closest('.close-cart')) {
                e.preventDefault();
                this.closeCartModal();
            }

            // Evento para cerrar carrito haciendo clic en el fondo del modal
            if (e.target.id === 'cartModal') {
                this.closeCartModal();
            }
        });

        // Cerrar carrito con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCartModal();
            }
        });
    }
}


// --------------------------------------------
// Inicialización global del carrito
// --------------------------------------------
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});

/**
 * Añade al carrito desde el modal de producto
 */
function addToCart() {
    const modal = document.getElementById('productModal');
    if (!modal || modal.style.display === 'none') return;

    const productTitle = document.getElementById('modalProductTitle')?.textContent;
    const productImage = document.getElementById('modalProductImage')?.src;
    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
    
    // Obtener medida seleccionada
    const selectedSizeElement = document.querySelector('.size-option.selected');
    const selectedSize = selectedSizeElement ? selectedSizeElement.textContent : null;

    if (!selectedSize) {
        alert('Por favor selecciona una medida');
        return;
    }

    const product = {
        id: modal.dataset.productId || productTitle.toLowerCase().replace(/\s+/g, '-'),
        title: productTitle,
        image: productImage
    };

    cart.addItem(product, quantity, selectedSize);
    
    // Cerrar modal del producto después de añadir
    closeProductModal();
}

/**
 * Añade producto rápido al carrito (sin modal)
 */
function addQuickToCart(productId, productTitle, productImage) {
    if (!cart) {
        console.error('Carrito no inicializado');
        return;
    }

    // Usar la primera medida disponible como predeterminada
    const productData = typeof productsData !== 'undefined' && productsData[productId];
    const defaultSize = productData && productData.sizes ? productData.sizes[0] : 'Estándar';

    const product = {
        id: productId,
        title: productTitle,
        image: productImage
    };

    cart.addItem(product, 1, defaultSize);
}

// --------------------------------------------
// Exportar funciones globalmente
// --------------------------------------------
window.addQuickToCart = addQuickToCart;
