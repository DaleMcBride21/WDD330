import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-indicators">
        ${product.IsClearance ? '50% OFF' : ''} 
    </p></a>
  </li>`;
}

export async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductsByCategory(category);
  products.map((product) => {
    product.FinalPrice = clearanceSale(product);
  });
  console.log(products);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}

export function clearanceSale(product) {
  if (product.IsClearance === true) {
    product.FinalPrice = product.FinalPrice * 0.5;
    return product.FinalPrice;
  } else {
    return product.FinalPrice;
  }
}

export function searchProduct() {
  
}


export function sortByName() {

}

export async function sortByPrice(selector, category) {
  const searchButton = document.getElementById("searchPriceOrName"); //search button
  const el = document.querySelector(selector);
  const productList = document.querySelector(".product-list"); // product container
  const filterValue = document.querySelector("#pricePoint").value;

  const products = await getProductsByCategory(category);
  console.log("Products",products);

  searchButton.addEventListener("click", () => {
    productList.innerHTML = "";

    const filteredProducts = products.filter(product => {
      if (product.FinalPrice < filterValue) {
        
        return product;
      }
    })
    console.log(filteredProducts);

  })

}

