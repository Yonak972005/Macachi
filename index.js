
const menuButton = document.querySelector('.header_menu');
const closeButton = document.querySelector('.modal-navbar_close');
const modalNavbar = document.querySelector('.modal-navbar');
const modalBackground = document.querySelector('.modal-navbar_background');

//abrir el menú
menuButton.addEventListener('click', () => {
  modalNavbar.classList.add('open');
  modalBackground.style.display = 'block';
});

//cerrar el menú
closeButton.addEventListener('click', () => {
  modalNavbar.classList.remove('open');
  modalBackground.style.display = 'none';
});

//click fuera del menú
modalBackground.addEventListener('click', () => {
  modalNavbar.classList.remove('open');
  modalBackground.style.display = 'none';
});

document.addEventListener('contextmenu', function(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    event.preventDefault();  // Deshabilita el clic derecho en imágenes
  }
});

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', ()=>{
    changePreviusImage(imageContainer);
});

function changeNextImage(imgContainer){
  if(imgIndex === 4){
      imgIndex = 1;
  }else{
      imgIndex++;
  }
  imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}

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

// FUNCIONES

function changePreviusImage(imgContainer){
  if(imgIndex === 1){
      imgIndex = 4;
  }else{
      imgIndex--;
  }
  imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}
