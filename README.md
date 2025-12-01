# Jimmy's Diner

A restaurant ordering app built with vanilla JavaScript and Vite as part of the Essential JavaScript course.

## Features

- Dynamic menu rendering
- Add/remove items from order
- Real-time price calculation
- Checkout form with order confirmation
- Unique order ID generation

## JavaScript Concepts

- ES6 modules (`import`/`export`)
- Array methods (`.map()`, `.reduce()`, `.forEach()`, `.includes()`)
- Object destructuring
- DOM manipulation (`querySelector`, `classList`, data attributes)
- Form handling (`FormData`, `preventDefault()`)
- UUID generation

## Menu Data

```javascript
const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        id: 1,
        price: 12,
        emoji: "🍔"
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        id: 2,
        price: 12,
        emoji: "🍺"
    }
]
```

## Purpose

Hands-on practice for JavaScript fundamentals, DOM manipulation, and building interactive UIs.
