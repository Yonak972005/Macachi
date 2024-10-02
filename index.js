
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