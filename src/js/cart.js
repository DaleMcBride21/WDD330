import { loadHeaderFooter } from "./utils.mjs";
import { shoppingCart, updateTotalPrice } from "./shoppingCart.mjs";
import { removeFromCart, cartSuperScript } from "./productDetails.mjs";

async function initializePage() {
    await loadHeaderFooter();
    shoppingCart();
    removeFromCart();
    updateTotalPrice();
    
}

initializePage();