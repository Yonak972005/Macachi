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
