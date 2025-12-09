import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const totalPrice = document.getElementById("total-price");

const pizzaOffering = {
  orderLine: document.getElementById("pizzaOrderLine"),
  countSpan: document.getElementById("pizza-count-span"),
  priceSpan: document.getElementById("pizza-price-span"),
  price: 14,
};

const hamburgerOffering = {
  orderLine: document.getElementById("hamburgerOrderLine"),
  countSpan: document.getElementById("hamburger-count-span"),
  priceSpan: document.getElementById("hamburger-price-span"),
  price: 12,
};

const beerOffering = {
  orderLine: document.getElementById("beerOrderLine"),
  countSpan: document.getElementById("beer-count-span"),
  priceSpan: document.getElementById("beer-price-span"),
  price: 12,
};


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

function displayOrderLineIfNonZero(offering, numOrdered) {
  if (numOrdered > 0) {
    offering.orderLine.style.display = "list-item";
    offering.countSpan.innerHTML = `x ${numOrdered}`;
    offering.priceSpan.innerHTML = `$${numOrdered * offering.price}`;
  } else if (numOrdered == 0) {
    offering.orderLine.style.display = "none";
  }
}

function displayOrder(countArr) {
  displayOrderLineIfNonZero(pizzaOffering, countArr[0]);
  displayOrderLineIfNonZero(hamburgerOffering, countArr[1]);
  displayOrderLineIfNonZero(beerOffering, countArr[2]);
  totalPrice.innerHTML = `$${((countArr[0] * pizzaOffering.price) + (countArr[1] * hamburgerOffering.price) + (countArr[2] * beerOffering.price))}`
}

function removeItem(itemId) {
  let index = orderedArr.findIndex((orderItem) => orderItem == itemId);
  console.log(index)
    orderedArr.splice(index, 1)
}
