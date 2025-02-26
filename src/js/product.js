import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

function wiggleCartIcon() {
    const cartIcon = document.getElementById("cart-icon");
    const addToCartButton = document.getElementById("addToCart");

    addToCartButton.addEventListener("click", () => {
        cartIcon.classList.add("wiggle");
        console.log("wiggle");
        setTimeout(() => {
            cartIcon.classList.remove("wiggle");
        }, 500);
    });
}



wiggleCartIcon();
