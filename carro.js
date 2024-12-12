const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.product-content');
const countProducts = document.querySelector('#contador-productos');

// Variables
let allProducts = [];

// Recuperar el carrito guardado en localStorage
function loadCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        allProducts = carritoGuardado;
        showHTML(); // Mostrar el carrito cargado
    }
}

loadCarrito(); // Cargar el carrito al cargar la página

// Mostrar el carrito en HTML
const showHTML = () => {
    rowProduct.innerHTML = '';
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
            </div>
            <img class="icon-close" src="../images/icon-close.png" alt="icon close">
        `;

        rowProduct.append(containerProduct);
        totalOfProducts += product.quantity;
    });

    countProducts.innerText = totalOfProducts;
};

// Función para agregar un producto al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h3').textContent
        };

        // Verificar si el producto ya existe en el carrito
        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            allProducts = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                }
                return product;
            });
        } else {
            allProducts.push(infoProduct);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(allProducts));

        showHTML(); // Actualizar la interfaz con el carrito
    }
});

// Función para eliminar un producto del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        // Filtrar el producto que se debe eliminar
        allProducts = allProducts.filter(product => product.title !== title);

        // Guardar el carrito actualizado en localStorage después de eliminar el producto
        localStorage.setItem('carrito', JSON.stringify(allProducts));

        showHTML(); // Actualizar la interfaz con el carrito modificado
    }
});

// Abrir y cerrar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Función para enviar el carrito por WhatsApp
function enviarCarritoPorWhatsApp(allProducts, numero) {
    let mensaje = 'Hola, estos son los productos que quiero comprar:\n\n';

    allProducts.forEach(product => {
        mensaje += `Producto: ${product.title}\n`;
        mensaje += `Cantidad: ${product.quantity}\n\n`;
    });

    let mensajeCodificado = encodeURIComponent(mensaje);
    let url = `https://wa.me/${numero}?text=${mensajeCodificado}`;

    // Usar window.location.href para abrir el enlace directamente
    window.location.href = url;
}
