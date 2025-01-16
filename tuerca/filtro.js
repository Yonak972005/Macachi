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

// Seleccionamos la imagen con la clase .product
const productImage = document.querySelector('.product img');

// Seleccionamos todos los divs con la clase .bton_display
const buttonDisplays = document.querySelectorAll('.bton_display');

// Añadimos el evento 'click' a la imagen
productImage.addEventListener('click', function() {
    // Iteramos sobre todos los divs .bton_display
    buttonDisplays.forEach(function(buttonDisplay) {
        // Si el div está oculto, lo mostramos; si está visible, lo ocultamos
        if (buttonDisplay.style.display === 'none' || buttonDisplay.style.display === '') {
            buttonDisplay.style.display = 'flex'; // Mostrar el div
        } else {
            buttonDisplay.style.display = 'none'; // Ocultar el div
        }
    });
});


