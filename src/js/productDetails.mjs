import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
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
  cartContents.push(product);
  console.log(cartContents);

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


function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}