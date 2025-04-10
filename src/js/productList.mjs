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
    </p>
    </a>
    <a class="modal-preview" role="button"><p data-product-id="${product.Id}">Preview: 🔍</p></a>
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

//this function gets the product brand names from the product list
async function getProductNames(category) {
  const products = await getProductsByCategory(category);
  const seenNames = new Set();

  const productNames = products
    .map(product => product.Brand.Name)
    .filter(name => {
      if (seenNames.has(name)) {
        return false;
      }
      seenNames.add(name);
      return true;
    });

  return productNames;
}

// this function addes the brands from the product list to the select element
export async function addBrandNamesToSelect(category) {
  const select = document.querySelector("#brandName");
  const productNames = await getProductNames(category);
  console.log("test", productNames);

  productNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

function getNameValue() {
  const nameValue = document.querySelector("#brandName").value;
  return nameValue;
}

function getPriceValue() {
  const priceValue = document.querySelector("#pricePoint").value;
  return priceValue;
}

export async function sortProducts(selector, category) {
  const nameValue = getNameValue(); // Get selected brand
  const priceValue = getPriceValue(); // Get entered price
  const el = document.querySelector(selector);
  const products = await getProductsByCategory(category);

  const sortedProducts = products.filter(product => {
    clearanceSale(product);
    // Check name if provided
    if (nameValue && product.Brand.Name !== nameValue) {
      return false;
    }
    // Check price if provided
    if (priceValue && product.FinalPrice > priceValue) {
      return false;
    }
    return true;
  });

  console.log(sortedProducts);
  renderListWithTemplate(productCardTemplate, el, sortedProducts);
  
}

export function quickViewProduct(category) {
  const preview = document.querySelectorAll('.modal-preview');
  const productModalBackground = document.getElementById('productModalBackground');
  const productModal = document.getElementById('productModal');

  const previewImage = document.querySelector(".product-img");
  const previewBrand = document.querySelector(".preview__brand");
  const previewName = document.querySelector(".preview__name");
  const previewPrice = document.querySelector(".product-preview__price");
  const previewDescription = document.querySelector(".preview__description");
  
  

  preview.forEach((button) => {
    button.addEventListener("click", async (event) => { // Make the event handler async
      const productId = event.target.closest('.modal-preview').querySelector('p').dataset.productId;
      console.log(`Preview clicked for product ${productId}`);

      try {
        const productInfo = await getProductInfo(productId, category); // Wait for the data
        clearanceSale(productInfo);
        console.log(productInfo); // Now productInfo contains the resolved product data

        productModalBackground.style.display = 'block';
        productModal.style.display = 'block';
        

        previewImage.src = productInfo.Images.PrimaryMedium; 
        previewBrand.textContent = productInfo.Brand.Name;
        previewName.textContent = productInfo.NameWithoutBrand;
        previewDescription.innerHTML = productInfo.DescriptionHtmlSimple;
        previewPrice.textContent = `$${productInfo.FinalPrice}`;

      } catch (error) {
        console.error("Error fetching product info:", error);
      }
    });
  });
}

export function closeQuickView() {
  const productModalBackground = document.getElementById('productModalBackground');
  const productModal = document.getElementById('productModal');
  productModalBackground.addEventListener("click", () => {
    productModalBackground.style.display = "none";
    productModal.style.display = "none";
    
    console.log("Closed Preview")
  });
}

async function getProductInfo(productId, category) {
  const products = await getProductsByCategory(category);
  
  // Find the product with the matching ID
  const product = products.find((p) => p.Id == productId);
  
  return product || null; // Return null if no product is found
}


export function textSearch() {
  const searchValue = document.querySelector("#searchInput").value;
  console.log(searchValue);
  return searchValue;
}