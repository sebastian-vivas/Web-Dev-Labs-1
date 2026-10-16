// Widget Shop (BEGINNER track) - CHECKPOINT: finished code at the end of Part 1
// Project 99.01

// ===== PART 1: The shop's data =====

// 1. Create the constant `SHOP_NAME` and set it to the text `"Widget Shop"`.
const SHOP_NAME = "Widget Shop";

// 2. Create two constants: `TAX_RATE` set to `0.08`, and `FREE_SHIPPING_MIN` set to `100`.
const TAX_RATE = 0.08; // 8% as a decimal
const FREE_SHIPPING_MIN = 100; // orders of $100 or more ship free

// 3. Create the constant `products` as an object that holds one product, `widget`.
const products = {
  widget: { name: "Wonder Widget", price: 19.99, dealPrice: 15.99, stock: 5, onDeal: false },
  gadget: { name: "Gadget Pro", price: 34.5, dealPrice: 27.6, stock: 3, onDeal: false },
  gizmo: { name: "Mini Gizmo", price: 12, dealPrice: 9.6, stock: 10, onDeal: false },
  doodad: { name: "Doo-Dad Deluxe", price: 75, dealPrice: 60, stock: 2, onDeal: false },
};

// 5. Create the constant `cart` as an object with the four product ids, each set to `0`.
const cart = { widget: 0, gadget: 0, gizmo: 0, doodad: 0 };

// 6. Create the constant `coupons` with three coupons: `SAVE10`, `SAVE20`, and `WELCOME`.
const coupons = {
  SAVE10: { rate: 0.1, percent: 10 },
  SAVE20: { rate: 0.2, percent: 20 },
  WELCOME: { rate: 0.15, percent: 15 },
};

// 7. Create the variable `appliedCoupon` with `let` and set it to an empty string, `""`.
let appliedCoupon = ""; // "" means no coupon yet

// 8. Test your data: add these four `console.log` lines to your file.
console.log(products.widget);
console.log(products.widget.name, products.widget.price);
let testId = "gizmo";
console.log(products[testId].name);
console.log(typeof SHOP_NAME, typeof TAX_RATE, typeof products, typeof appliedCoupon);

// 9. Create a function named `getPrice` that takes an `id` and returns that product's `price`.
function getPrice(id) {
  return products[id].price;
}

// 10. Create a function named `showProduct` that takes an `id` and shows that product's name on its card.
function showProduct(id) {
  document.getElementById("name-" + id).textContent = products[id].name;
  document.getElementById("price-" + id).textContent = "$" + getPrice(id).toFixed(2);
  document.getElementById("stock-" + id).textContent = products[id].stock + " in stock";
}

// 11. Show `SHOP_NAME` in the page heading, and call `showProduct("widget")`.
document.getElementById("shop-name").textContent = SHOP_NAME;
showProduct("widget");
showProduct("gadget");
showProduct("gizmo");
showProduct("doodad");
