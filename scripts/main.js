// plants
const getAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
    });
};

const treeContainer = document.getElementById("tree-container");
const showAllPlants = (plants) => {
  treeContainer.innerHTML = "";
  plants.forEach((plant) => {
    const plantCard = document.createElement("div");
    plantCard.classList.add(
      "p-4",
      "bg-white",
      "rounded-lg",
      "max-w-sm",
      "sm:max-w-full",
      "mx-auto",
      "flex",
      "flex-col",
      "justify-between"
    );
    plantCard.innerHTML = `
      <div>
        <figure class="w-full aspect-[1/0.6] bg-gray-200 rounded-lg overflow-hidden">
          <img src="${plant.image}" alt="" class="w-full h-full object-cover">
        </figure>
        <div class="my-3">
          <h5 class="text-sm">${plant.name}</h5>
          <p class="text-xs my-1.5 line-clamp-3" title='${plant.description}'>${plant.description}</p>
        </div>
      </div>
      <div>
        <div class="flex justify-between mb-2">
            <p class="badge badge-md bg-green-100 text-green-600">${plant.category}</p>
            <span class="font-medium">৳${plant.price}</span>
        </div>
        <button onclick='addToCart(${plant.id})' class="btn bg-[#15803D] hover:bg-[#065c26] text-white rounded-full w-full">
          Add to cart
        </button>
      </div>
    `;
    treeContainer.appendChild(plantCard);
  });
};

// categories
const getAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      showAllCategories(data.categories);
    });
};
const treeOptions = document.getElementById("tree-options");
const showAllCategories = (categories) => {
  categories.forEach((cat) => {
    const catBtn = document.createElement("button");
    catBtn.setAttribute("onclick", `selectCategory(${cat.id})`);
    catBtn.classList.add(
      "btn",
      "lg:w-full",
      "justify-start",
      "bg-transparent",
      "border-0",
      "hover:bg-green-700/20",
      "active:bg-[#15803D]",
      "active:text-white"
    );
    catBtn.innerText = cat.category_name;
    treeOptions.appendChild(catBtn);
  });
};

const selectCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => getCategory(data.plants));
};

const getCategory = (plants) => {
  showAllPlants(plants);
};
const removeActive = () => {
  const catBtns = treeOptions.querySelectorAll("button");
  catBtns.forEach((catBtn) => {
    catBtn.classList.remove("active");
  });
};

//Category active
treeOptions.addEventListener("click", (e) => {
  treeOptions.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
    e.target.classList.add("active");
  });
});
const addToCart = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showToCart(data.plants);
    });
};

const cartWrap = document.getElementById("cart-wrap");
const emptyCart = document.getElementById("empty-cart");
const totalCart = document.getElementById("total-cart");
const cartTitle = document.getElementById("cart-container").querySelector("h4");
const cartContainer = document.getElementById("cart-container");
const cartTotalWrap = document.querySelector(".total-cart-wrap");
const toggleCart = document.getElementById("toggle-cart");
const itemCountWrap = document.getElementById("item-count");
toggleCart.addEventListener("click", () => {
  if (cartContainer.classList.contains("right-[-100%]")) {
    cartContainer.classList.add("right-0");
    cartContainer.classList.remove("right-[-100%]");
  } else {
    cartContainer.classList.remove("right-0");
    cartContainer.classList.add("right-[-100%]");
  }
});
let total = 0;
let count = 0;
const showToCart = (plant) => {
  if (emptyCart) {
    emptyCart.style.display = "none";
  }
  const cartCard = document.createElement("div");
  cartCard.classList.add(
    "cart-item",
    "bg-green-100",
    "p-3",
    "flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "mb-2"
  );
  cartCard.innerHTML = `
    <div>
        <h5>${plant.name}</h5>
        <small class="text-gray-600">৳<span class='price'>${plant.price}</span> x 1</small>
    </div>
    <button class='remove-btn text-gray-500 hover:text-red-300 active:text-red-600'><i class="bi bi-x"></i></button>
  `;
  cartWrap.appendChild(cartCard);

  cartTitle.classList.remove("hidden");
  cartTotalWrap.classList.remove("hidden");
  cartTotalWrap.classList.add("flex");
  total += plant.price;
  totalCart.innerText = total;
  count++;
  countCartItem();
};
const countCartItem = () => {
  itemCountWrap.innerText = count;
  if (count > 0) {
    itemCountWrap.classList.remove("hidden");
  } else {
    itemCountWrap.classList.add("hidden");
  }
};
cartWrap.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (!removeBtn) return;
  const price = parseInt(
    removeBtn.parentNode.querySelector(".price").innerText
  );
  total -= price;
  count--;
  countCartItem();
  removeBtn.parentNode.remove();
  totalCart.innerText = total;
  if (total === 0 || cartWrap.querySelectorAll(".cart-item").length === 0) {
    emptyCart.style.display = "block";
    cartTitle.classList.add("hidden");
    cartTotalWrap.classList.add("hidden");
  }
});

//cart item remove
// executions
getAllPlants();
getAllCategories();
