import { productList, searchProduct, sortByPrice } from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()
  .then(() => {
    // Header and footer are loaded
    const category = getParam("category");
    productList(".product-list", category);
    sortByPrice();
    searchProduct();
  })
  .catch((error) => {
    console.error("Error loading header/footer:", error);
    // Handle the error (e.g., display a message to the user)
  });