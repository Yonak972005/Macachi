const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector ('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/*------------------*/
const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector ('.row-product')

//lista carrito

const productsList = document.querySelector('.product-content')

//variables

let allProducts = []






productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

        const infoProduct = {
            quantity : 1,
            title: product.querySelector('h3').textContent

        }

        allProducts = [...allProducts, infoProduct];

        showHTML();
	}

});

//fundion mostrar html

const showHTML =() => {

    allProducts.forEach(product =>{
		const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
            </div>
                <img class="icon-close" src="../images/icon-close.png" alt="icon close">
        `

        rowProduct.append(containerProduct)
    } )
}