import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const ordered = document.getElementById("ordered");
const total = document.getElementById("total");
const pizza = document.getElementById("pizza");
const beer = document.getElementById("beer");
const hamburger = document.getElementById("hamburger");
const pizzaCountSpan = document.getElementById("pizza-count-span");
const beerCountSpan = document.getElementById("beer-count-span");
const hamburgerCountSpan = document.getElementById("hamburger-count-span");


const orderedArr = [];

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
  }
  if (e.target.dataset.add && orderedArr.length > 0) {
    orderSection.style.display = "block";
    yourOrderHtml();
    displayOrder(yourOrderHtml());
  }
});

function getOrderArr(itemID) {
  orderedArr.push(itemID);
  // console.log(orderedArr);
}

function yourOrderHtml() {
  const pizzaCount = orderedArr.filter((x) => x == 0).length;
  const hamburgerCount = orderedArr.filter((x) => x == 1).length;
  const beerCount = orderedArr.filter((x) => x == 2).length;
  
  return [pizzaCount, hamburgerCount, beerCount];
}

function displayOrder(countArr) {
  console.log(countArr);
  
  if (countArr[0] > 0) {
    console.log(countArr[0]);
    pizza.style.display = "list-item";
  }
  if (countArr[1] > 0) {
    console.log(countArr[1]);
    hamburger.style.display = "list-item";
  }
  if (countArr[2] > 0) {
    console.log(countArr[2]);
    beer.style.display = "list-item";
  }
}
