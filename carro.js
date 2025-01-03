const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

/*------------------*/
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// lista carrito
const carrito = document.querySelector('.info-cart-product');
const productsList = document.querySelector('.product-content');

// variables
let allProducts = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito desde localStorage

const countProducts = document.querySelector('#contador-productos');

productsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('p').textContent
        };

        const exits = allProducts.some(product => product.title === infoProduct.title);

        if (exits) {
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
            allProducts = [...allProducts, infoProduct];
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(allProducts));

        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(allProducts));

        showHTML();
    }
});

// Función mostrar HTML
const showHTML = () => {
    // Limpiar HTML
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
            <img class="icon-close" src="icon-close.png" alt="icon close">
        `;

        rowProduct.append(containerProduct);
        totalOfProducts += product.quantity;
    });

    countProducts.innerText = totalOfProducts;
}

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