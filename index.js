import menuArray from "./data.js";

const menu = document.getElementById('menu');
const orderSection = document.getElementById('order-section')
const ordered = document.getElementById("ordered")
const total = document.getElementById("total")

const orderedArr = []

function getHtml (){
    return menuArray.map(item => `
            <div class="item" id="item-${item.id}">
                <div class="item-img">${item.emoji}</div>
                <h2 class="item-name">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(", ")}</p>
                <h3 class="item-price">${item.price}$</h3>
                <button class="add" data-add="${item.id}" id="add-${item.id}">+</button>
            </div>
        `)
}

menu.innerHTML = getHtml().join(" ");

document.addEventListener("click", (e) => {
    console.log(e.target.dataset.add)
    if(e.target.dataset.add){
        getOrderArr(e.target.dataset.add)
    }
    if(e.target.dataset.add && orderedArr.length > 0){
        orderSection.style.display = 'block'
        yourOrderHtml(orderedArr)
    }

})


function getOrderArr(itemID) {
    orderedArr.push(itemID)
    console.log(orderedArr);
    
}

function yourOrderHtml(orderedArr){
    const pizzaCount = orderedArr.filter(x => x == 0).length
    const hamburgerCount = orderedArr.filter(x => x == 1).length
    const beerCount = orderedArr.filter(x => x == 2).length
    ordered.innerHTML = `
        <li class="order-list pizza">
          <span class="chosen-order-name">Pizza</span>
          <span>x ${pizzaCount}</span>
          <button class="remove-btn">remove</button>
          <span class="chosen-order-price">$${14 * pizzaCount}</span>
        </li>
        <li class="order-list hamburger">
          <span class="chosen-order-name">Hamburger</span>
          <span>x ${hamburgerCount}</span>
          <button class="remove-btn">remove</button>
          <span class="chosen-order-price">$${hamburgerCount * 12}</span>
        </li>
        <li class="order-list beer">
          <span class="chosen-order-name">Beer</span>
          <span>x ${beerCount}</span>
          <button class="remove-btn">remove</button>
          <span class="chosen-order-price">$${beerCount * 12}</span>
        </li>        
    `

}