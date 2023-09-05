function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleArray(products);

//start slider
const slider = document.querySelector(".slider-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const images = document.querySelectorAll(".slider-img img");
let currentIndex = 0;

function showImage(index) {
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateX(-${index * 100}%)`;
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

function autoSlide() {
  nextImage();
}

let autoSlideInterval = setInterval(autoSlide, 3000);

slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

slider.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(autoSlide, 3000);
});

showImage(currentIndex);
window.addEventListener("resize", function () {
  showImage(currentIndex);
});
//end of slider

const productsContainer = document.querySelector(".products");
const allBtn = document.getElementById("all-btn");
const phonesBtn = document.getElementById("phones-btn");
const lapsBtn = document.getElementById("laps-btn");
const handmadeBtn = document.getElementById("handmade-btn");
const carsBtn = document.getElementById("cars-btn");
const shoppingCart = document.querySelector(".shopping-cart-icon");
const cartItemCountElement = document.querySelector(".cart-item-count");

phonesBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const phonesProducts = products.filter(
    (product) => product.category === "phones"
  );
  displayProducts(phonesProducts);
});

allBtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayProducts(products);
});

lapsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const lapsProducts = products.filter(
    (product) => product.category === "laps"
  );
  displayProducts(lapsProducts);
});

handmadeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const handmadeProducts = products.filter(
    (product) => product.category === "handmade"
  );
  displayProducts(handmadeProducts);
});

carsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const carsProducts = products.filter(
    (product) => product.category === "cars"
  );
  displayProducts(carsProducts);
});

shoppingCart.addEventListener("click", function (e) {
  window.location = "./cart/cart.html";
});

function displayProducts(productsArray) {
  productsContainer.innerHTML = "";
  productsArray.forEach((product) => {
    productsContainer.innerHTML += `<div class="product" id="${product.id}">
      <div class="product-img">
        <img src="${product.img}" alt="" />
      </div>
      <div class="product-description">
        <p>${product.description}</p>
        <div class="product-number">count: <span>${product.count}</span></div>
      </div>
      <button class="add-btn-product">Add</button>
    </div>`;
  });

  attachAddButtonListeners();
}

displayProducts(products);

//array for added products in local storage
let addedProducts = [];

//add btn

function attachAddButtonListeners() {
  const addBtns = document.querySelectorAll(".add-btn-product");
  const addedProducts =
    JSON.parse(localStorage.getItem("added-products")) || [];

  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const chosenProduct = btn.closest(".product");
      const productId = chosenProduct.getAttribute("id");
      const productIndex = addedProducts.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        // Add product
        const imgChosenProduct =
          chosenProduct.querySelector(".product-img img");
        const descriptionChosenProduct = chosenProduct.querySelector(
          ".product-description"
        );
        const countChosenProduct = chosenProduct.querySelector(
          ".product-number span"
        );

        const chosenProductObj = {
          id: productId,
          img: imgChosenProduct.src,
          description: descriptionChosenProduct.textContent.trim(),
          count: countChosenProduct.textContent.trim(),
        };

        addedProducts.push(chosenProductObj);
        localStorage.setItem("added-products", JSON.stringify(addedProducts));

        btn.classList.replace("add-btn-product", "remove-btn-product");
        btn.textContent = "Remove";
      } else {
        // Remove product
        addedProducts.splice(productIndex, 1);
        localStorage.setItem("added-products", JSON.stringify(addedProducts));

        btn.classList.replace("remove-btn-product", "add-btn-product");
        btn.textContent = "Add";
      }

      updateCartItemCount();
    });
  });
}

attachAddButtonListeners();

function updateCartItemCount() {
  const addedProducts = JSON.parse(
    localStorage.getItem("added-products") || "[]"
  );
  cartItemCountElement.textContent = addedProducts.length;
}

document.addEventListener("DOMContentLoaded", function () {
  const goToTopButton = document.querySelector(".go-to-top");

  goToTopButton.addEventListener("click", function (e) {
    e.preventDefault();

    const scrollOptions = {
      top: 0,
      behavior: "smooth",
    };

    window.scrollTo(scrollOptions);
  });
});

let popupStructure = ``;

// popup product details
let productPopupContainer = document.querySelector(".product-popup-overlay");
const closePopup = document.querySelectorAll(".close-popup");
const popupImg = document.getElementById("popup-img");
const popupDescription = document.getElementById("popup-description");
const popupCount = document.getElementById("popup-count");

function displayProductPopup(productsArray) {
  productsArray.forEach((product) => {
    const productImage = product.querySelector(".product-img img");
    const productDescription = product.querySelector(".product-description p");
    const productCount = product.querySelector(".product-number span");

    productImage.addEventListener("click", () => {
      productPopupContainer.style.display = "flex";
      popupImg.src = productImage.src;
      popupDescription.textContent = productDescription.textContent;
      popupCount.textContent = `Count: ${productCount.textContent}`;
    });
  });
}

displayProductPopup(Array.from(productsContainer.querySelectorAll(".product")));

closePopup.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    productPopupContainer.style.display = "none";
  });
});
