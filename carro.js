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
            title: product.querySelector('p').textContent

        }

	}
});