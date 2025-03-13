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
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <span data-id="${item.Id}" class="cart-card__remove">&times;</span>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="product-indicators" id="productIndicator">${item.IsClearance ? '50% OFF' : ''}</p>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}

