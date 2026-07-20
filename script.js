const elements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {

  elements.forEach(el => {

    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      el.classList.add('show');
    }

  });

  //document.querySelectorAll('.card).forEach(card => {
  document.querySelectorAll('.card, .premium-details').forEach(card => {
  const decreaseButton = card.querySelector('.decrease');
  const increaseButton = card.querySelector('.increase');
  const quantityValue = card.querySelector('.quantity-value');
  const orderLinks = card.querySelectorAll('.order-actions a');

  if (!decreaseButton || !increaseButton || !quantityValue) return;

  let quantity = 1;

  function updateQuantity() {
    quantityValue.textContent = quantity;

    const title = card.querySelector('h3, h2');
    const productName = title ? title.textContent.trim() : 'this product';
    
    orderLinks.forEach(link => {
      const url = new URL(link.href);
      //const productName = card.querySelector('h3').textContent;
      url.searchParams.set(
        'text',
        `Hi, I would like to order ${quantity} × ${productName}.`
      );
      link.href = url.toString();
    });
  }

  decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  increaseButton.addEventListener('click', () => {
    quantity++;
    updateQuantity();
  });

  updateQuantity();
});

}); 

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  const isOpen = navLinks.classList.contains('open');
  menuToggle.setAttribute('aria-expanded', isOpen);

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

document.querySelectorAll('img').forEach(image => {
  image.addEventListener('contextmenu', event => {
    event.preventDefault();
  });

  image.addEventListener('dragstart', event => {
    event.preventDefault();
  });
});
