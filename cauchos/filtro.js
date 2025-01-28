// BUSCADOR
document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
        if (e.key ==="Escape")e.target.value = ""

        document.querySelectorAll(".product").forEach(productos =>{

            productos.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?productos.classList.remove("filtro")
                :productos.classList.add("filtro")
        })
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll('.product');

    products.forEach((product) => {
        const mainImage = product.querySelector('img'); // Imagen principal del producto
        const displays = product.querySelectorAll('.bton_display'); // Todas las imágenes de medidas dentro del producto

        // Función para manejar el clic en la imagen principal
        mainImage.addEventListener('click', function() {
            // Alternar visibilidad de todas las imágenes de medidas
            displays.forEach((display) => {
                if (display.style.display === 'none' || display.style.display === '') {
                    display.style.display = 'flex'; // Mostrar la imagen de medidas
                } else {
                    display.style.display = 'none'; // Ocultar la imagen de medidas
                }
            });
        });

        // No hacemos nada en este bloque de código con los clics en los botones
        displays.forEach((display) => {
            display.addEventListener('click', function(event) {
                // No hacer nada si se hace clic en el botón "Añadir al carrito"
                if (event.target.closest('.btn-add-cart')) {
                    return; // No hacer nada si el clic fue en el botón
                }
            });
        });
    });
});
