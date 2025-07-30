
const cartKey = 'cartItems';

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function showNotification(message, type = "success") {
  const notif = document.getElementById("notification");
  
  notif.textContent = message;
  notif.className = `notification show`;

  if (type === "error") notif.style.backgroundColor = "#e74c3c";
  else notif.style.backgroundColor = "#2ecc71";

  setTimeout(() => {
    notif.className = `notification hidden`;
  }, 2500);
}

function addToCart(productId, productTitle) {
  let cart = getCart();
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, title: productTitle, quantity: 1 });
  }

  saveCart(cart);
  showNotification(`✅ "${productTitle}" agregado al carrito", "success`);
}

