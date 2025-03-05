import { loadHeaderFooter } from "./utils.mjs";
import { shoppingCart } from "./shoppingCart.mjs";
import { removeFromCart, cartSuperScript } from "./productDetails.mjs";

async function initializePage() {
    await loadHeaderFooter();
    shoppingCart();
    removeFromCart();
}

initializePage();
