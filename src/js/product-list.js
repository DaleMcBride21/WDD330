import { productList, addBrandNamesToSelect, sortProducts, textSearch, quickViewProduct, closeQuickView } from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()
  .then(() => {
    // Header and footer are loaded
    const category = getParam("category");
    
    productList(".product-list", category)
      .then(() => {
        // Ensure quickViewProduct runs after products are loaded
        quickViewProduct(category);
        closeQuickView();
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });

    addBrandNamesToSelect(category);

    document.querySelector("#searchPriceOrName").addEventListener("click", () => {
      sortProducts(".product-list", category);
    });

    // document.querySelector("#searchButton").addEventListener("click", () => {
    //   textSearch();
    // });

  })
  .catch((error) => {
    console.error("Error loading header/footer:", error);
    // Handle the error (e.g., display a message to the user)
  });
