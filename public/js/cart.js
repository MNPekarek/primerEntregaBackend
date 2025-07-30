const cartKey = 'cartItems';

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Tu carrito está vacío 😓</li>';
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `🛍️ Producto: ${item.title} - Cantidad: ${item.quantity}`;
    cartList.appendChild(li);
  });
}

document.getElementById('clearCart')?.addEventListener('click', () => {
  localStorage.removeItem(cartKey);
  renderCart();
});

renderCart();