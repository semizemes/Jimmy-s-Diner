import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const totalPriceLine = document.getElementById("total-price");

const orderedCounts = [0, 0, 0];

function menuOffering(name, price) {
  return {
    orderLine: document.getElementById(`${name}OrderLine`),
    countSpan: document.getElementById(`${name}-count-span`),
    priceSpan: document.getElementById(`${name}-price-span`),
    price: price,
  };
}

const offerings = [
  menuOffering('pizza', 14),
  menuOffering('hamburger', 12),
  menuOffering('beer', 12),
];

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
    orderedCounts[e.target.dataset.add]++;
    document.getElementById("footer").style.display = 'none'
    displayOrder(orderedCounts);
  }
  if (e.target.dataset.remove) {
    orderedCounts[e.target.dataset.remove]--;
    displayOrder(orderedCounts);
  }
  
  if(e.target.id == "complete-order"){
    document.getElementById("payment").style.display = 'block'
  }
  if(e.target.id == "pay"){
    orderedCounts.fill(0);
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

function yourOrderHtml() {
  for (const menuItemCode of orderedArr) {
    orderedCounts[menuItemCode]++;
  }
  return orderedCounts;
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
  orderSection.style.display = "block";
  let totalPrice = 0;
  for (let i = 0; i < offerings.length; i++) {
    const offering = offerings[i];
    const count = countArr[i];
    displayOrderLineIfNonZero(offering, count);
    totalPrice += count * offering.price;
  }
  totalPriceLine.innerHTML = `$${totalPrice}`;
}

function removeItem(itemId) {
}
