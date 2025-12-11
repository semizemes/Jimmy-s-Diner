import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const totalPriceLine = document.getElementById("total-price");

const cartElements = menuArray.map((menuItem) => {
  return {
    item: menuItem,
    rowElements: menuRow(menuItem.name.toLowerCase()),
    currentCount: 0,
  };
});

function menuRow(name) {
  return {
    orderLine: document.getElementById(`${name}OrderLine`),
    countSpan: document.getElementById(`${name}-count-span`),
    priceSpan: document.getElementById(`${name}-price-span`),
  };
}

let recipient;

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
    cartElements[e.target.dataset.add].currentCount++;
    document.getElementById("footer").style.display = 'none'
    displayOrder(cartElements);
  }
  if (e.target.dataset.remove) {
    cartElements[e.target.dataset.remove].currentCount--;
    displayOrder(cartElements);
  }
  
  if(e.target.id == "complete-order"){
    document.getElementById("payment").style.display = 'block'
  }
  if(e.target.id == "pay"){
    zeroOutOrder();
    document.getElementById("payment").style.display = 'none'
    orderSection.style.display = "none";
    recipient = document.getElementById("recepient").value
    document.getElementById("footer").style.display = 'block'
    document.getElementById("footer").innerHTML = `
    <div class="item thankyou">
      <p>Thanks, ${recipient}! Your order is on its way!</p>
    </div>
    `
  }
});

function zeroOutOrder() {
  for (const item of cartElements) {
    item.currentCount = 0;
  }
}

function displayOrderLineIfNonZero(cartElement) {
  const rowElements = cartElement.rowElements;
  const numOrdered = cartElement.currentCount;
  const price = cartElement.item.price

  if (numOrdered > 0) {
    rowElements.orderLine.style.display = "list-item";
    rowElements.countSpan.innerHTML = `x ${numOrdered}`;
    rowElements.priceSpan.innerHTML = `$${numOrdered * price}`;
  } else if (numOrdered == 0) {
    rowElements.orderLine.style.display = "none";
  }
}

function displayOrder(cartElements) {
  orderSection.style.display = "block";
  let totalPrice = 0;
  for (const cartElement of cartElements) {
    displayOrderLineIfNonZero(cartElement)
    totalPrice += cartElement.currentCount * cartElement.item.price;
  }
  totalPriceLine.innerHTML = `$${totalPrice}`;
}