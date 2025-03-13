import { getParam } from "./utils.mjs";
import { productDetails, cartSuperScript } from "./productDetails.mjs";



const productId = getParam("product");
productDetails(productId);

cartSuperScript();
