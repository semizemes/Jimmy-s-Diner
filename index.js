import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const ordered = document.getElementById("ordered");
const total = document.getElementById("total");
const pizza = document.getElementById("pizza");
const beer = document.getElementById("beer");
const hamburger = document.getElementById("hamburger");

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
  ordered.innerHTML = `
        <li class="order-list pizza" id="pizza">
          <span class="chosen-order-name">Pizza</span>
          <span>x ${pizzaCount}</span>
          <button class="remove-btn" data-remove="order0">remove</button>
          <span class="chosen-order-price">$${14 * pizzaCount}</span>
        </li>
        <li class="order-list hamburger" id="hamburger">
          <span class="chosen-order-name">Hamburger</span>
          <span>x ${hamburgerCount}</span>
          <button class="remove-btn" data-remove="order1">remove</button>
          <span class="chosen-order-price">$${hamburgerCount * 12}</span>
        </li>
        <li class="order-list beer" id="beer">
          <span class="chosen-order-name">Beer</span>
          <span>x ${beerCount}</span>
          <button class="remove-btn" data-remove="order2">remove</button>
          <span class="chosen-order-price">$${beerCount * 12}</span>
        </li>        
    `;
  return [pizzaCount, hamburgerCount, beerCount];
}

function displayOrder(countArr) {
  if (countArr[0] > 0) {
    console.log(countArr[0]);
    pizza.style.display = "block";
  }
}
