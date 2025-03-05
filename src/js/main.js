import { loadHeaderFooter } from "./utils.mjs";
import { alert } from "./alert.js";
import { cartSuperScript } from "./productDetails.mjs";

function newsLetter() {
  const main = document.querySelector("main");
  const signUp = document.createElement("div");
  signUp.classList.add("newsletter");
  signUp.innerHTML = `
    <h2>Sign up for our newsletter</h2>
    <p>Get the latest news on our products, upcoming sales, and more.</p>
    <form>
      <input type="email" placeholder="Enter your email">
      <button type="submit">Sign up</button>
    </form>
  `;
  main.insertAdjacentElement("afterend", signUp);

}

loadHeaderFooter()
  .then(() => {
    // Header and footer are now loaded, so it's safe to edit them.
    alert();
    newsLetter();
    cartSuperScript();
  })
  .catch((error) => {
    // Handle loading errors here
    console.error("Failed to load header/footer:", error);
  });

