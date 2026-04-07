// Add to Cart function
function addToCart(name, price, image) {
  // localStorage se purana cart nikalo
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // naya product banao
  let product = {
    name: name,
    price: price,
    quantity: 1,
    image: image
  };

  // check karo agar same product already cart me hai
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;  // agar already hai to qty badha do
  } else {
    cart.push(product); // nahi hai to add kar do
  }

  // localStorage me save karo
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show success message with better styling
  showNotification(name + " added to cart!");
  updateCartCount();
}

// Function to show notifications
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Function to update cart count in navigation
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartIcon = document.querySelector('nav a[href="cart.html"]');
  if (cartIcon) {
    // Remove existing count if any
    const existingCount = cartIcon.querySelector('.cart-count');
    if (existingCount) {
      existingCount.remove();
    }
    
    if (totalItems > 0) {
      const countSpan = document.createElement('span');
      countSpan.className = 'cart-count';
      countSpan.textContent = totalItems;
      countSpan.style.cssText = `
        background: #ff4444;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        margin-left: 5px;
        min-width: 18px;
        text-align: center;
      `;
      cartIcon.appendChild(countSpan);
    }
  }
}

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
