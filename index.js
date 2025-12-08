import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section");
const ordered = document.getElementById("ordered");
const totalPrice = document.getElementById("total-price");

// There are a number of ways to accomplish this but for this simple "toy" application
// just copy the menu and then keep track of a quantity for item.  This way you have
// all the data and can dynamically render the order.  In a real application you
// wouldn't do it this way, instead you'd have something like a link by id from
// the order to the menu item but that's too complicated for this simple app.
let orderedArr = [...menuArray];
let recipient;

function renderMenu() {
  menu.innerHTML = menuArray
    .map(
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
    )
    .join("");
}

document.addEventListener("click", (e) => {
  if (e.target.id == "complete-order") {
    document.getElementById("payment").style.display = "block";
  }

  if (e.target.id == "pay") {
    orderedArr = [];
    document.getElementById("payment").style.display = "none";
    orderSection.style.display = "none";
    recipient = document.getElementById("recepient").value;
    document.getElementById("footer").style.display = "block";
    document.getElementById("footer").innerHTML = `
    <div class="item thankyou">
      <p>Thanks, ${recipient}! Your order is on its way!</p>
    </div>
    `;
  }

  if (e.target.dataset.add != null) {
    const itemId = +e.target.dataset.add;
    const item = orderedArr.find((item) => item.id == itemId);
    item.quantity = item.quantity ? item.quantity + 1 : 1;
    renderOrder();
  }

  if (e.target.dataset.remove != null) {
    const itemId = +e.target.dataset.remove;
    const item = orderedArr.find((item) => item.id == itemId);
    item.quantity--;
    renderOrder();
  }
});

function renderOrder() {
  // Some of the sections in the order are conditional based on
  // whether something's been ordered (i.e. don't show the order
  // at all if there's nothing IN the order.)
  // We also need the price here so it's convenient to calculate
  // the total price and then conditionally render based on
  // whether the price is 0 or not...

  // calculate the total price
  const price = orderedArr.reduce(
    (acc, cur) => acc + (cur.quantity || 0) * cur.price,
    0
  );

  if (price > 0) {
    // the price is > 0 so there are items in the order... render it.
    ordered.innerHTML = orderedArr
      .filter((item) => +item.quantity > 0)
      .map(
        (item) => `
        <li class="order-list ${item.name}" id="item-${item.id}">
          <span class="chosen-order-name">${item.name}</span>
          <span id="count-span">x ${item.quantity || 0}</span>
          <button class="remove-btn" data-remove="${item.id}">remove</button>
          <span class="chosen-order-price" class="price-span">$${
            item.price * (item.quantity || 0)
          }</span>
        </li>
    `
      )
      .join("");

    totalPrice.innerHTML = `$${price.toFixed(2)}`;
    orderSection.style.display = "block";
  } else {
    // the price is 0 so the order is empty... don't render it
    orderSection.style.display = "none";
  }
}

renderMenu();
renderOrder();
