// Widget Shop (BEGINNER track) - CHECKPOINT: finished code at the end of Part 4
// Project 99.01

// ===== PART 1: The shop's data =====

// 1. Create the constant `SHOP_NAME` and set it to the text `"Widget Shop"`.
const SHOP_NAME = "Widget Shop";

// 2. Create two constants: `TAX_RATE` set to `0.08`, and `FREE_SHIPPING_MIN` set to `100`.
const TAX_RATE = 0.08; // 8% as a decimal
const FREE_SHIPPING_MIN = 100; // orders of $100 or more ship free

// 3. Create the constant `products` as an object with one product, `widget`. Its value is another object with five properties: `name` is `"Wonder Widget"`, `price` is `19.99`, `dealPrice` is `15.99` (the price with 20% off, already worked out), `stock` is `5`, and `onDeal` is `false`.
const products = {
  widget: { name: "Wonder Widget", price: 19.99, dealPrice: 15.99, stock: 5, onDeal: false },
  gadget: { name: "Gadget Pro", price: 34.5, dealPrice: 27.6, stock: 3, onDeal: false },
  gizmo: { name: "Mini Gizmo", price: 12, dealPrice: 9.6, stock: 10, onDeal: false },
  doodad: { name: "Doo-Dad Deluxe", price: 75, dealPrice: 60, stock: 2, onDeal: false },
};

// 5. Create the constant `cart` as an object with the four product ids, each set to `0`.
const cart = { widget: 0, gadget: 0, gizmo: 0, doodad: 0 };

// 6. Create the constant `coupons` with three coupons. Each one is an object with a `rate` and a `percent`: `SAVE10` is `0.1` and `10`, `SAVE20` is `0.2` and `20`, and `WELCOME` is `0.15` and `15`.
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
  showStock(id); // step 32
}

// 11. Show `SHOP_NAME` in the page heading, and call `showProduct("widget")`.
document.getElementById("shop-name").textContent = SHOP_NAME;
showProduct("widget");
showProduct("gadget");
showProduct("gizmo");
showProduct("doodad");

// ===== PART 2: Greeting, date, and dark mode =====

// 15. Create the constant `DAYS`, an array of the seven day names as text, from `"Sunday"` to `"Saturday"`.
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 16. Create the constant `MONTHS`, an array of the twelve month names as text, from `"January"` to `"December"`.
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// 17. Create a function named `getGreeting` that takes an `hour` (0 to 23) and returns `"Good Morning"` if the hour is less than 12, `"Good Afternoon"` if it is less than 18, and `"Good Evening"` for any other hour.
function getGreeting(hour) {
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

// 18. Create a function named `getDateString` that takes a `date` and returns text like `"Friday, October 16, 2026"`.
function getDateString(date) {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// 19. Create the constant `now` with a new `Date()`, and show the greeting in the element with the id `greeting`.
const now = new Date();
document.getElementById("greeting").textContent = getGreeting(now.getHours()) + "! Welcome to the " + SHOP_NAME + ".";
document.getElementById("today-date").textContent = getDateString(now);

// 21. Create the variable `darkMode` with `let` and set it to `false`.
let darkMode = false;

// 22. Create a function named `toggleDarkMode` that switches dark mode on or off.
function toggleDarkMode() {
  if (darkMode) {
    document.body.classList.remove("dark-mode");
    darkMode = false;
  } else {
    document.body.classList.add("dark-mode");
    darkMode = true;
  }
}

// 23. Add a `keydown` listener on `document` that stops (returns) when the user is typing in a box or menu.
document.addEventListener("keydown", function (event) {
  if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT") {
    return; // the user is typing, so ignore shortcuts
  }
  switch (event.key) {
    case "d":
      toggleDarkMode();
      break;
  }
});

// ===== PART 3: The cart =====

// 25. Create a function named `showCartLine` that takes an `id` and shows that product's name and quantity in the cart.
function showCartLine(id) {
  document.getElementById("cartname-" + id).textContent = products[id].name;
  document.getElementById("qty-" + id).textContent = cart[id];
}

// 26. Read this: `calcSubtotal()` adds up the cart. It is already in your PROG.js.
function calcSubtotal() {
  let subtotal = 0;
  subtotal += getPrice("widget") * cart.widget;
  subtotal += getPrice("gadget") * cart.gadget;
  subtotal += getPrice("gizmo") * cart.gizmo;
  subtotal += getPrice("doodad") * cart.doodad;
  return subtotal;
}

// 27. Create a function named `updateCart` that calls `showCartLine` for all four products, and then call `updateCart()` once.
function updateCart() {
  showCartLine("widget");
  showCartLine("gadget");
  showCartLine("gizmo");
  showCartLine("doodad");
  updateSummary(); // step 47
}

updateCart();

// 29. Create a function named `showStock` that takes an `id` and shows a **SOLD OUT** message when that product's stock is `0`.
function showStock(id) {
  let stock = products[id].stock;
  let stockEl = document.getElementById("stock-" + id);
  let addBtn = document.getElementById("add-" + id);

  if (stock === 0) {
    stockEl.textContent = "SOLD OUT";
    stockEl.className = "stock out";
    addBtn.disabled = true;
  } else if (stock <= 2) {
    stockEl.textContent = "Only " + stock + " left!";
    stockEl.className = "stock low";
    addBtn.disabled = false;
  } else {
    stockEl.textContent = stock + " in stock";
    stockEl.className = "stock";
    addBtn.disabled = false;
  }
}

// 33. Create a function named `showMessage` that takes `text` and a `type` (`"ok"` or `"error"`) and shows the message to the customer.
function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

// 34. Create a function named `addToCart` that takes an `id`, and stops with a "sold out" message if that product's stock is `0`.
function addToCart(id) {
  if (products[id].stock === 0) {
    showMessage(products[id].name + " is sold out.", "error");
    return;
  }
  products[id].stock--;
  cart[id]++;
  showStock(id);
  updateCart();
  showMessage(products[id].name + " added to cart.", "ok");
}

// 37. Make the Wonder Widget's "Add to cart" button call `addToCart("widget")` when it is clicked.
document.getElementById("add-widget").addEventListener("click", function () {
  addToCart("widget");
});
document.getElementById("add-gadget").addEventListener("click", function () {
  addToCart("gadget");
});
document.getElementById("add-gizmo").addEventListener("click", function () {
  addToCart("gizmo");
});
document.getElementById("add-doodad").addEventListener("click", function () {
  addToCart("doodad");
});

// 39. Create a function named `returnToStock` that takes an `id`, puts that product's cart quantity back into stock, and resets the cart quantity to `0`.
function returnToStock(id) {
  products[id].stock += cart[id];
  cart[id] = 0;
  showStock(id);
}

// 40. Create a function named `emptyCart` that calls `returnToStock` for all four products, calls `updateCart()`, and shows the message `"Cart emptied."` as `"ok"`. Then connect it to the "Empty cart" button (id `empty-btn`).
function emptyCart() {
  returnToStock("widget");
  returnToStock("gadget");
  returnToStock("gizmo");
  returnToStock("doodad");
  updateCart();
  showMessage("Cart emptied.", "ok");
}

document.getElementById("empty-btn").addEventListener("click", emptyCart);

// ===== PART 4: Totals, coupons, and shipping =====

// 41. Read this: `roundMoney()` rounds a money amount to whole cents. It is already in your PROG.js.
function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

// 42. Create a function named `getShippingCost` that takes a `method` and a `subtotal`. It returns `0` if the subtotal is `0` or at least `FREE_SHIPPING_MIN`. Otherwise, `"standard"` returns `5.99`, `"express"` returns `14.99`, `"overnight"` returns `29.99`, and anything else returns `0`.
function getShippingCost(method, subtotal) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_MIN) {
    return 0;
  }
  switch (method) {
    case "standard":
      return 5.99;
    case "express":
      return 14.99;
    case "overnight":
      return 29.99;
    default:
      return 0;
  }
}

// 43. Create a function named `getDiscountRate` that returns the applied coupon's `rate`, or `0` when there is no coupon.
function getDiscountRate() {
  if (appliedCoupon === "") {
    return 0;
  }
  return coupons[appliedCoupon].rate;
}

// 44. Create a function named `getTip` that reads the tip box and returns the tip as a number, or `0` if it isn't usable.
function getTip() {
  const tip = Number(document.getElementById("tip-amount").value);
  if (!tip || tip < 0) {
    return 0; // empty, not a number, or negative: no tip
  }
  return tip;
}

// 45. Read this: `calcTotals()` works out every amount in the price summary. It is already in your PROG.js.
function calcTotals() {
  const subtotal = roundMoney(calcSubtotal());
  const discount = roundMoney(subtotal * getDiscountRate());
  const tax = roundMoney((subtotal - discount) * TAX_RATE);
  const shipping = getShippingCost(document.getElementById("shipping-menu").value, subtotal);
  const tip = getTip();
  const total = roundMoney(subtotal - discount + tax + shipping + tip);

  return { subtotal: subtotal, discount: discount, tax: tax, shipping: shipping, tip: tip, total: total };
}

// 46. Create a function named `updateSummary` that calls `calcTotals()` and shows all six amounts on the page.
function updateSummary() {
  const totals = calcTotals();
  document.getElementById("sum-subtotal").textContent = "$" + totals.subtotal.toFixed(2);
  document.getElementById("sum-discount").textContent = "-$" + totals.discount.toFixed(2);
  document.getElementById("sum-tax").textContent = "$" + totals.tax.toFixed(2);
  document.getElementById("sum-shipping").textContent = "$" + totals.shipping.toFixed(2);
  document.getElementById("sum-tip").textContent = "$" + totals.tip.toFixed(2);
  document.getElementById("sum-total").textContent = "$" + totals.total.toFixed(2);
}

// 48. Create a function named `applyCoupon` that takes an `event`, stops the form from submitting, and reads the coupon code in UPPERCASE.
function applyCoupon(event) {
  event.preventDefault();

  const code = document.getElementById("coupon-code").value.toUpperCase();
  if (code === "") {
    showMessage("Type a coupon code first.", "error");
    return;
  }
  if (coupons[code] === undefined) {
    showMessage(code + " is not a valid coupon.", "error");
    return;
  }
  appliedCoupon = code;
  showMessage(`Coupon ${code} applied: ${coupons[code].percent}% off!`, "ok");
  updateSummary();
}

// 49. Connect the Apply button (id `coupon-btn`) to `applyCoupon`.
document.getElementById("coupon-btn").addEventListener("click", applyCoupon);

// 52. Make the shipping menu (id `shipping-menu`) and the tip box (id `tip-amount`) call `updateSummary` when they change.
document.getElementById("shipping-menu").addEventListener("change", updateSummary);
document.getElementById("tip-amount").addEventListener("input", updateSummary);
