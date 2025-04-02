import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export function shoppingCart() {
  let cartItems = getLocalStorage("so-cart");
  cartItems = JSON.parse(cartItems);
  console.log("Cart Items:", cartItems);
  console.log("Type of CartItems:", typeof cartItems);
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
    console.log("shown");
  } else {
    document.querySelector(".list-footer").classList.add("hide");
    console.log("hidden");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.SelectedColorImage}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.SelectedColor}</p>
  <p class="cart-card__quantity">qty: 
    <select class="quantity" id="quantity" name="quantity" data-id="${item.Id}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
  </p>
  <span data-id="${item.Id}" class="cart-card__remove">&times;</span>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="product-indicators" id="productIndicator">${item.IsClearance ? '50% OFF' : ''}</p>
  </li>`;

  return newItem;
}

function getQuantities() {
  const quantityInputs =  document.querySelectorAll(".quantity");
  const quantities = Array.from(quantityInputs).map(input => input.value);
  
  return quantities;
}

function calculateListTotal(list) {
  
  const quantities = getQuantities();
  console.log("Quantities:", quantities);
  const amounts = list.map((item) => item.FinalPrice);
  console.log("Amounts:", amounts);
  const total = quantities
  .map((quantity, index) => quantity * amounts[index])
  .reduce((sum, item) => sum + item, 0);
  console.log("Total:", total);

  return total;
}

export function updateTotalPrice() {
  const quantityInputs = document.querySelectorAll(".quantity");
  let cartItems = getLocalStorage("so-cart");
  cartItems = JSON.parse(cartItems);
  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const total = calculateListTotal(cartItems);
      document.querySelector(".list-total").innerText = 'Total: ';
      displayCartTotal(total);
    });
  });
}






