//============================ fetching data from api ===========================//

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//=========================== Show All Products In UI ===========================//

const showProducts = (products) => {
  for (const product of products) {
    const {
      image,
      title,
      category,
      rating: { rate, count },
      price,
      id,
    } = product;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product bg-gray-200 rounded-3xl">
        <div>
      <img class="product-image mx-auto " src=${image}></img>
        </div>
        <h3>${title}</h3>
        <p>Category: ${category}</p>
        <div class=" font-semibold text-3xl " >Customer Ratings</div>
        <h4 class="stars-outer">
        <div id="${title}" class="stars-inner"></div>
        </h4>
        <span class="text-2xl ml-2" style="font-size:18px;" >${rate} out of 5</span>
        <div class="text-2xl"style="color: #565959">${count} global ratings</div>
        <h4>Price: $ ${price}</h4>
        <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-success ">add to cart</button>
        <button  class="btn btn-danger ">Details</button></div>
        `;
    document.getElementById("all-products").appendChild(div);

    //============================ Customizing Rating Icons ===========================//

    const starTotal = 5;
    const starPercentage = (rate / starTotal) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    document.getElementById(`${title}`).style.width = starPercentageRounded;
  }
};

//============================== Function for add to cart ====================================//

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

//============================ Function for getting price of product ===========================//

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

//================================= Main Price Update Function =============================//

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

//=================================== Set Inner Text Function ==============================//

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

//============================== update delivery charge and total Tax ============================//

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//============================== grandTotal update function ============================//

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//============================== function for search input value ============================//

function inputChange(event) {
  const searchedKey = event.target.value.toLowerCase();
  filterNotes(searchedKey);
}

const filterNotes = (searchedKey) => {
  const card = document.getElementsByClassName("product");

  for (let i = 0; i < card.length; i++) {
    const element = card[i];

    if (element.innerText.toLowerCase().includes(searchedKey)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
};
