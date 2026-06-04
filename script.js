const STORAGE_KEY = "shopping_cart";

const products = [
  { id: 1, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/90?text=T-Shirt" },
  { id: 2, name: "Shoes", price: 50, image: "https://via.placeholder.com/90?text=Shoes" },
  { id: 3, name: "Watch", price: 80, image: "https://via.placeholder.com/90?text=Watch" },
  { id: 4, name: "Bag", price: 40, image: "https://via.placeholder.com/90?text=Bag" }
];

function getCart() {
  const savedCart = localStorage.getItem(STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find((item) => item.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find((p) => p.id === productId);

  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    const updatedCart = cart.filter((p) => p.id !== productId);
    saveCart(updatedCart);
  } else {
    saveCart(cart);
  }

  renderCart();
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  renderCart();
}

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = products.map((product) => `
    <div class="product">
      <div class="row">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item) => {
    total += item.price * item.qty;

    return `
      <div class="cart-item">
        <div class="row">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.qty}</p>
            <p>Subtotal: $${(item.price * item.qty).toFixed(2)}</p>
            <div class="row">
              <button onclick="updateQuantity(${item.id}, 1)">+</button>
              <button class="gray" onclick="updateQuantity(${item.id}, -1)">-</button>
              <button class="secondary" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = total.toFixed(2);
}

document.getElementById("clearCartBtn").addEventListener("click", clearCart);

renderProducts();
renderCart();