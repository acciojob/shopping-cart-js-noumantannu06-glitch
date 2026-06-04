const STORAGE_KEY = "cart";
const products = [
  { id: 1, title: "T-Shirt", price: 20 },
  { id: 2, title: "Shoes", price: 50 },
  { id: 3, title: "Watch", price: 80 }
];

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);
  const existing = cart.find((p) => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter((p) => p.id !== id);
  saveCart(cart);
  renderCart();
}

function renderProducts() {
  const productsEl = document.getElementById("products");
  productsEl.innerHTML = products
    .map(
      (product) => `
      <div class="product">
        <p>${product.title}</p>
        <p>$${product.price}</p>
        <button id="add-${product.id}" onclick="addToCart(${product.id})">Add to cart</button>
      </div>
    `
    )
    .join("");
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  const cart = getCart();

  if (cart.length === 0) {
    cartEl.innerHTML = "";
    return;
  }

  cartEl.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item" id="item">
        <p>${item.title}</p>
        <p>Price: $${item.price}</p>
        <p>Qty: ${item.qty}</p>
        <button id="remove-${item.id}" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `
    )
    .join("");
}

renderProducts();
renderCart();