const addedProductsContainer = document.getElementById(
  "added-products-container"
);

let products = JSON.parse(localStorage.getItem("added-products")) || [];

function renderProducts() {
  return products
    .map((product) => {
      product.count = 1;
      return `<div class="product" id="${product.id}">
      <div class="product-img">
        <img src="${product.img}" alt="" />
      </div>
      <div class="product-description">
        <p>
          ${product.description}
        </p>
        <div class="product-count">
          <span class="increase" data-index="${product.id}">+</span>
          <span class="count">${product.count}</span>
          <span class="decrease" data-index="${product.id}">-</span>
        </div>
      </div>
      <button class="remove-btn-product" data-id="${product.id}">remove</button>
    </div>`;
    })
    .join("");
}

addedProductsContainer.innerHTML = renderProducts();

function updateLocalStorage() {
  localStorage.setItem("added-products", JSON.stringify(products));
}

addedProductsContainer.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("increase")) {
    const productId = parseInt(target.getAttribute("data-index"));
    const productIndex = products.findIndex(
      (product) => parseInt(product.id) === productId
    );
    if (productIndex !== -1) {
      products[productIndex].count++;
      updateLocalStorage();
      target.parentNode.querySelector(".count").textContent =
        products[productIndex].count;
    }
  } else if (target.classList.contains("decrease")) {
    const productId = parseInt(target.getAttribute("data-index"));
    const productIndex = products.findIndex(
      (product) => parseInt(product.id) === productId
    );
    if (productIndex !== -1 && products[productIndex].count > 1) {
      products[productIndex].count--;
      updateLocalStorage();
      target.parentNode.querySelector(".count").textContent =
        products[productIndex].count;
    }
  } else if (target.classList.contains("remove-btn-product")) {
    const productId = parseInt(target.getAttribute("data-id"));
    products = products.filter((product) => parseInt(product.id) !== productId);
    updateLocalStorage();
    target.parentNode.remove();
  }
});
