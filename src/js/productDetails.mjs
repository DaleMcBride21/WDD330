import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";
import { clearanceSale } from "./productList.mjs";

let product = {};

export function wiggleCartIcon() {
  const cartIcon = document.getElementById("cart-icon");

  cartIcon.classList.add("wiggle");
            console.log("wiggle");
            setTimeout(() => {
                cartIcon.classList.remove("wiggle");
            }, 500);   
          }

export async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // add the FinalPrice to the product object
  product.FinalPrice = clearanceSale(product);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}



function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  
  // Check if there was anything there and parse it.
  if (cartContents) {
    try {
      cartContents = JSON.parse(cartContents);
      if (!Array.isArray(cartContents)) {
        cartContents = []; //if the parsed value is not an array, initialize to an empty array.
      }
    } catch (error) {
      console.error("Error parsing cart contents:", error);
      cartContents = []; // If parsing fails, reset to an empty array.
    }
  } else {
    cartContents = [];
  }

  // Then add the current product to the list
  if (cartContents.some((item) => item.Id === product.Id)) {
    console.log("Product is already in the cart.");
    alertMessage(`${product.NameWithoutBrand} is already in your cart!`);
  } else {
    wiggleCartIcon();
    cartContents.push(product);
    alertMessage(`${product.NameWithoutBrand} added to cart!`);
    console.log(cartContents);
  }
  
  // Stringify the array before storing it.
  setLocalStorage("so-cart", JSON.stringify(cartContents));
}

export function removeFromCart() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  
  removeButtons.forEach((button, index) => {

    button.addEventListener("click", () => {
      console.log("Remove button clicked");

      // Get the cart from local storage
      let cartContents = getLocalStorage("so-cart");
      if (cartContents) {
        cartContents = JSON.parse(cartContents);
      } else {
        cartContents = [];
      }

      // Ensure the cart is an array
      if (!Array.isArray(cartContents)) {
        cartContents = [];
      }

      // Remove the product based on the button's index
      cartContents.splice(index, 1);

      // Update the cart in local storage
      setLocalStorage("so-cart", JSON.stringify(cartContents));

      // Optionally: Refresh the cart after removal
      window.location.reload();
    });
  });
}

export function cartSuperScript() {
  let cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    const cartCount = cartItems.length;
    console.log("Cart Count:", cartCount);

    const cartIcon = document.querySelector(".cart");
    cartIcon.insertAdjacentHTML("beforeend", `<sup class="superScript">${cartCount}</sup>`);

  }  
}


function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productIndicator").innerText = product.IsClearance ? '50% OFF' : '';
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

