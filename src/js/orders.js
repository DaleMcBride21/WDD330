import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "../js/auth.mjs";
import currentOrders from "../js/currentOrders.mjs";

loadHeaderFooter()
  .then(() => {
    // Header and footer are now loaded, so it's safe to edit them.
    const token = checkLogin();
    currentOrders("#orders", token);

})
  .catch((error) => {
    // Handle loading errors here
    console.error("Failed to load header/footer:", error);
});