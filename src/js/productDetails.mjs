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
  console.log(product);
  // add the FinalPrice to the product object
  product.FinalPrice = clearanceSale(product);
  // once we have the product details we can render out the HTML
  renderProductDetails();

  // add the event listener to the color swatch
  changeColor();
  updateProductColor();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}



function addToCart() {
  let cartContents = getLocalStorage("so-cart");

  if (cartContents) {
    try {
      cartContents = JSON.parse(cartContents);
      if (!Array.isArray(cartContents)) {
        cartContents = []; 
      }
    } catch (error) {
      console.error("Error parsing cart contents:", error);
      cartContents = []; 
    }
  } else {
    cartContents = [];
  }

  // Ensure that a color was selected
  if (!product.SelectedColor) {
    alertMessage("Please select a color before adding to cart.");
    return;
  }

  // Add the selected color to the product object
  const productWithColor = {
    ...product, 
    SelectedColor: product.SelectedColor,
    SelectedColorImage: product.SelectedColorImage
  };

  // Check if product with same ID and color already exists
  if (cartContents.some((item) => item.Id === product.Id && item.SelectedColor === productWithColor.SelectedColor)) {
    console.log("Product with this color is already in the cart.");
    alertMessage(`${product.NameWithoutBrand} (${productWithColor.SelectedColor}) is already in your cart!`);
  } else {
    wiggleCartIcon();
    cartContents.push(productWithColor);
    alertMessage(`${product.NameWithoutBrand} (${productWithColor.SelectedColor}) added to cart!`);
    console.log(cartContents);
  }

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

function changeColor() {
  const colors = product.Colors;
  console.log(colors);
  const colorSelector = document.querySelector(".color__selector");
  colorSelector.innerHTML = ""; // Clear existing options before adding new ones

  colors.forEach((color) => {
    const colorOption = document.createElement("li");
    colorOption.classList.add("color__option");
    colorOption.setAttribute("data-color", color.ColorName); // Store color name
    colorOption.innerHTML = `
      <img src="${color.ColorChipImageSrc}" alt="${color.ColorName}" />
      <p>${color.ColorName}</p>
    `;
    colorSelector.appendChild(colorOption);
  });
}

function updateProductColor() {
  const colorSelector = document.querySelector(".color__selector");

  colorSelector.addEventListener("click", (event) => {
    const clickedElement = event.target.closest(".color__option"); // Get the clicked color option
    if (!clickedElement) return; // Ignore clicks outside of options

    const selectedColor = clickedElement.getAttribute("data-color"); // Get the selected color

    const selectedColorObj = product.Colors.find(
      (color) => color.ColorName === selectedColor
    );

    console.log(selectedColorObj);
    if (selectedColorObj) {
      document.querySelector("#productImage").src =
        selectedColorObj.ColorPreviewImageSrc;
      document.querySelector("#productImage").alt =
        `${product.Name} - ${selectedColor}`;
      document.querySelector("#productColorName").innerText =
        selectedColorObj.ColorName;

      // Store selected color for adding to cart
      product.SelectedColor = selectedColorObj.ColorName;
      product.SelectedColorImage = selectedColorObj.ColorPreviewImageSrc;
    }
  });
}




function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productIndicator").innerText = product.IsClearance ? '50% OFF' : '';
  
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

