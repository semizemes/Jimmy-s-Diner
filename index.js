import menuArray from "./data.js";

const menu = document.getElementById('menu');

function getHtml (){
    return menuArray.map(item => `
            <div class="item" id="item-${item.id}">
                <div class="item-img">${item.emoji}</div>
                <h2 class="item-name">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(", ")}</p>
                <h3 class="item-price">${item.price}$</h3>
                <button class="add" id="add-${item.id}">+</button>
            </div>
        `)
}

menu.innerHTML = getHtml().join(" ")

