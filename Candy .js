// Get the buttons to add items to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
// Add event listener to each button
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCartClicked);
});

// Function to add item to cart when button is clicked
function addToCartClicked(event) {
  // Get the button that was clicked
  const button = event.target;
  
  // Get the name, price, and image of the item
  const item = button.parentElement;
  const name = item.querySelector('h2').innerText;
  const price = item.querySelector('p').innerText;
  const imageSrc = item.querySelector('img').src;
  // Call function to add item to cart
  addItemToCart(name, price, imageSrc);
  
  // Update the cart count
  updateCartCount();
}

// Function to add item to cart
function addItemToCart(name, price, imageSrc) {
  // Create a new cart item
  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-item');
  cartItem.dataset.name = name;
  cartItem.dataset.price = price;
  
  // Add HTML for the cart item
  cartItem.innerHTML = `
    <img src="${imageSrc}" alt="${name}">
    <div>
      <h3>${name}</h3>
      <p>${price}</p>
    </div>
    <button class="remove-item">Remove</button>
  `;
  
  // Add event listener to remove item button
  const removeButton = cartItem.querySelector('.remove-item');
  removeButton.addEventListener('click', removeItemClicked);
  
  // Add the cart item to the cart
  const cartItems = document.querySelector('#cart-items');
  cartItems.appendChild(cartItem);
  
  // Update the cart total
  updateCartTotal();
}

// Function to update the cart count
function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  const currentCount = parseInt(cartCount.innerText);
  cartCount.innerText = currentCount + 1;
}


// Function to update the cart total
function updateCartTotal() {
  // Get all the cart items
  const cartItems = document.querySelectorAll('.cart-item');
  
  // Calculate the total price
  let total = 0;
  cartItems.forEach(item => {
    const price = parseFloat(item.dataset.price.replace('$', ''));
    total += price;
  });
  
  // Update the cart total in the HTML
  const cartTotal = document.querySelector('#cart-total');
  cartTotal.innerText = total.toFixed(2);
}

// Function to remove item from cart
function removeItemClicked(event) {
  const buttonClicked = event.target;
  const cartItem = buttonClicked.parentElement;
  cartItem.remove();
  updateCartTotal();
  const cartCount = document.querySelector('#cart-count');
  const currentCount = parseInt(cartCount.innerText);
  cartCount.innerText = currentCount - 1;
 
}

// Function to toggle the cart
function toggleCart() {
  const cart = document.querySelector('#cart');
  cart.classList.toggle('open');
}
const checkoutButton = document.querySelector('#checkout-btn');

checkoutButton.addEventListener('click', () => {
  // Remove all cart items
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach(item => item.remove());

  // Update cart count to zero
  const cartCount = document.querySelector('#cart-count');
  cartCount.innerText = '0';

  // Update cart total to zero
  const cartTotal = document.querySelector('#cart-total');
  cartTotal.innerText = '0.00';
  console.log("Successfully purchased");
});