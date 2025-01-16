// Seleccionar los elementos del carrito y productos
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const countProducts = document.querySelector('#contador-productos');
const productsList = document.querySelector('.product-content');

// Recuperar el carrito desde localStorage, o inicializarlo vacío
let allProducts = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos en el carrito
const showHTML = () => {
    rowProduct.innerHTML = '';  // Limpiar HTML antes de mostrar los productos

    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
            </div>
            <img class="icon-close" src="icon-close.png" alt="icon close">
        `;

        rowProduct.append(containerProduct);
        totalOfProducts += product.quantity;
    });

    countProducts.innerText = totalOfProducts;  // Actualizar el contador de productos
};

// Función para manejar la visibilidad del carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Función para agregar un producto al carrito
productsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement; // Obtener el contenedor del producto
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('p').textContent  // Obtener el nombre del producto
        };

        // Verificar si el producto ya existe en el carrito
        const exits = allProducts.some(product => product.title === infoProduct.title);

        if (exits) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            // Si el producto no está en el carrito, agregarlo
            allProducts = [...allProducts, infoProduct];
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(allProducts));

        // Mostrar el carrito actualizado
        showHTML();
    }
});

// Función para eliminar un producto del carrito
rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        // Eliminar el producto del carrito
        allProducts = allProducts.filter(product => product.title !== title);

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(allProducts));

        // Mostrar el carrito actualizado
        showHTML();
    }
});

// Función para enviar el carrito por WhatsApp
function enviarCarritoPorWhatsApp(allProducts, numero) {
    let mensaje = 'Hola, estos son los productos que quiero comprar:\n\n';
    
    allProducts.forEach(product => {
        mensaje += `Producto: ${product.title}\n`;
        mensaje += `Cantidad: ${product.quantity}\n\n`;
    });

    // Codificamos el mensaje para que se pueda pasar en la URL
    let mensajeCodificado = encodeURIComponent(mensaje);
    let url = `https://wa.me/${numero}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

// Inicializar la vista del carrito al cargar la página
showHTML();