import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_list: resolve(__dirname, "src/product-listing/index.html"),
        orders: resolve(__dirname, "src/orders/index.html"),
        success: resolve(__dirname, "src/success/index.html"),
        error: resolve(__dirname, "src/error/index.html"),
      },
    },
  },
});