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
        const medidasImage = product.querySelector('.medidas-image'); // Imagen de las medidas

        // Función para manejar el clic en la imagen principal
        mainImage.addEventListener('click', function() {
            // Alternar visibilidad de la imagen de medidas
            if (medidasImage.style.display === 'none' || medidasImage.style.display === '') {
                medidasImage.style.display = 'block'; // Mostrar la imagen de medidas
            } else {
                medidasImage.style.display = 'none'; // Ocultar la imagen de medidas
            }
        });

        // Función para manejar el clic en la imagen de medidas para cerrarla
        medidasImage.addEventListener('click', function() {
            medidasImage.style.display = 'none'; // Ocultar la imagen de medidas
        });
    });
});
