import { loadHeaderFooter, cartSuperScript } from "./utils.mjs";
import { shoppingCart } from "./shoppingCart.mjs";
import { removeFromCart } from "./productDetails.mjs";

async function initializePage() {
    await loadHeaderFooter();
    shoppingCart();
    cartSuperScript();
    removeFromCart();
}

initializePage();
