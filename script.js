const STORAGE_KEY = "cart";

const products = [
  { id: 1, title: "T-Shirt", price: 20 }
];

function getCart() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart() {
  const cart = getCart();
  const product = products[0];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCart();
}

function renderProducts() {
  const productsEl = document.getElementById("products");
  productsEl.innerHTML = `
    <div class="product">
      <p>${products[0].title}</p>
      <p>$${products[0].price}</p>
      <button id="add" onclick="addToCart()">Add to Cart</button>
    </div>
  `;
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
        <div id="item">
          <p>${item.title}</p>
          <p>Price: $${item.price}</p>
          <p>Qty: ${item.qty}</p>
          <button id="remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `
    )
    .join("");
}

renderProducts();
renderCart();