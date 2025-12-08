import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const totalPrice = document.getElementById("total-price");
const pizza = document.getElementById("pizza");
const beer = document.getElementById("beer");
const hamburger = document.getElementById("hamburger");
const pizzaCountSpan = document.getElementById("pizza-count-span");
const pizzaPriceSpan = document.getElementById("pizza-price-span");
const beerCountSpan = document.getElementById("beer-count-span");
const beerPriceSpan = document.getElementById("beer-price-span");
const hamburgerCountSpan = document.getElementById("hamburger-count-span");
const hamburgerPriceSpan = document.getElementById("hamburger-price-span");


let orderedArr = [];
let recepeient;

function getHtml() {
  return menuArray.map(
    (item) => `
              <div class="item" id="item-${item.id}">
                <div class="item-img">${item.emoji}</div>
                <h2 class="item-name">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(", ")}</p>
                <h3 class="item-price">${item.price}$</h3>
                <button class="add" data-add="${item.id}" id="add-${
      item.id
    }">+</button>
            </div>
        `
  );
}

menu.innerHTML = getHtml().join(" ");

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    getOrderArr(e.target.dataset.add);
    document.getElementById("footer").style.display = 'none'
  }
  if (e.target.dataset.add && orderedArr.length > 0) {
    orderSection.style.display = "block";
    yourOrderHtml();
    displayOrder(yourOrderHtml());
  }
  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
    yourOrderHtml();
    displayOrder(yourOrderHtml());
  }
  if (orderedArr.length == 0) {
    orderSection.style.display = "none";
  }
  
  if(e.target.id == "complete-order"){
    document.getElementById("payment").style.display = 'block'
  }
  if(e.target.id == "pay"){
    orderedArr = [];
    document.getElementById("payment").style.display = 'none'
    orderSection.style.display = "none";
    recepeient = document.getElementById("recepient").value
    document.getElementById("footer").style.display = 'block'
    document.getElementById("footer").innerHTML = `
    <div class="item thankyou">
      <p>Thanks, ${recepeient}! Your order is on its way!</p>
    </div>
    `
  }
});

function getOrderArr(itemID) {
  orderedArr.push(itemID);
}

function yourOrderHtml() {
  const pizzaCount = orderedArr.filter((x) => x == 0).length;
  const hamburgerCount = orderedArr.filter((x) => x == 1).length;
  const beerCount = orderedArr.filter((x) => x == 2).length;

  return [pizzaCount, hamburgerCount, beerCount];
}

function displayOrder(countArr) {
  if (countArr[0] > 0) {
    pizza.style.display = "list-item";
    pizzaCountSpan.innerHTML = `x ${countArr[0]}`;
    pizzaPriceSpan.innerHTML = `$${countArr[0] * 14}`;
  } else if (countArr[0] == 0) {
    pizza.style.display = "none";
  }
  if (countArr[1] > 0) {
    hamburger.style.display = "list-item";
    hamburgerCountSpan.innerHTML = `x ${countArr[1]}`;
    hamburgerPriceSpan.innerHTML = `$${countArr[1] * 12}`;
  } else if (countArr[1] == 0) {
    hamburger.style.display = "none";
  }
  if (countArr[2] > 0) {
    beer.style.display = "list-item";
    beerCountSpan.innerHTML = `x ${countArr[2]}`;
    beerPriceSpan.innerHTML = `$${countArr[2] * 12}`;
  } else if (countArr[2] == 0) {
    beer.style.display = "none";
  }
  totalPrice.innerHTML = `$${((countArr[0] * 14) + (countArr[1] * 12) + (countArr[2] * 12))}`
}

function removeItem(itemId) {
  let index = orderedArr.findIndex((orderItem) => orderItem == itemId);
  console.log(index)
    orderedArr.splice(index, 1)
}
