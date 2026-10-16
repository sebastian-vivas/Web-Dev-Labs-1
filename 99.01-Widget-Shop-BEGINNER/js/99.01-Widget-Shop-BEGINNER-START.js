// Widget Shop (BEGINNER track) - START (do not type here; copy of the steps)
// Project 99.01

// ===== PART 1: The shop's data =====

// 1. Create the constant `SHOP_NAME` and set it to the text `"Widget Shop"`.

const SHOP_NAME = "Widget Shop";

// 2. Create two constants: `TAX_RATE` set to `0.08`, and `FREE_SHIPPING_MIN` set to `100`.

const TAX_RATE = 0.08; // 8% as a decimal
const FREE_SHIPPING_MIN = 100; // orders of $100 or more ship free

// 3. Create the constant `products` as an object that holds one product, `widget`.

// 4. Add the three other products, `gadget`, `gizmo`, and `doodad`, to `products`.

// 5. Create the constant `cart` as an object with the four product ids, each set to `0`.

// 6. Create the constant `coupons` with three coupons: `SAVE10`, `SAVE20`, and `WELCOME`.

// 7. Create the variable `appliedCoupon` with `let` and set it to an empty string, `""`.

// 8. Test your data: add these four `console.log` lines to your file.

// 9. Create a function named `getPrice` that takes an `id` and returns that product's `price`.

// 10. Create a function named `showProduct` that takes an `id` and shows that product's name on its card.

// 11. Show `SHOP_NAME` in the page heading, and call `showProduct("widget")`.

// 12. Add a second line to `showProduct` that shows the product's price.

// 13. Add a third line to `showProduct` that shows how many are in stock.

// 14. Call `showProduct` for the other three products: `"gadget"`, `"gizmo"`, and `"doodad"`.

// ===== PART 2: Greeting, date, and dark mode =====

// 15. Create the constant `DAYS`, an array of the seven day names, starting with `"Sunday"`.

// 16. Create the constant `MONTHS`, an array of the twelve month names, starting with `"January"`.

// 17. Create a function named `getGreeting` that takes an `hour` (0 to 23) and returns the greeting text.

// 18. Create a function named `getDateString` that takes a `date` and returns text like `"Friday, October 16, 2026"`.

// 19. Create the constant `now` with a new `Date()`, and show the greeting in the element with the id `greeting`.

// 20. Show today's date in the element with the id `today-date`.

// 21. Create the variable `darkMode` with `let` and set it to `false`.

// 22. Create a function named `toggleDarkMode` that switches dark mode on or off.

// 23. Add a `keydown` listener on `document` that stops (returns) when the user is typing in a box or menu.

// 24. Add a `switch` on `event.key` with one case: when the key is `"d"`, call `toggleDarkMode()`.

// ===== PART 3: The cart =====

// 25. Create a function named `showCartLine` that takes an `id` and shows that product's name and quantity in the cart.

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

// 28. Add one more line to `updateCart` that shows the subtotal in the element with the id `sum-subtotal`.

// 29. Create a function named `showStock` that takes an `id` and shows a **SOLD OUT** message when that product's stock is `0`.

// 30. Add an `else if` to `showStock` for **low stock**: 1 or 2 left.

// 31. Add an `else` to `showStock` for **plenty in stock**.

// 32. In `showProduct`, replace the stock line with a call to `showStock(id)`.

// 33. Create a function named `showMessage` that takes `text` and a `type` (`"ok"` or `"error"`) and shows the message to the customer.

// 34. Create a function named `addToCart` that takes an `id`, and stops with a "sold out" message if that product's stock is `0`.

// 35. Add two lines to `addToCart` that take one from the stock and add one to the cart.

// 36. Add three lines to the end of `addToCart` that redraw the page and show a message.

// 37. Make the Wonder Widget's "Add to cart" button call `addToCart("widget")` when it is clicked.

// 38. Do the same for the other three products' buttons: `add-gadget`, `add-gizmo`, and `add-doodad`.

// 39. Create a function named `returnToStock` that takes an `id`, puts that product's cart quantity back into stock, and resets the cart quantity to `0`.

// 40. Create a function named `emptyCart` that calls `returnToStock` for all four products and redraws, and connect it to the "Empty cart" button.

// ===== PART 4: Totals, coupons, and shipping =====

// 41. Read this: `roundMoney()` rounds a money amount to whole cents. It is already in your PROG.js.

function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

// 42. Create a function named `getShippingCost` that takes a `method` and a `subtotal`, and returns the shipping price.

// 43. Create a function named `getDiscountRate` that returns the applied coupon's `rate`, or `0` when there is no coupon.

// 44. Create a function named `getTip` that reads the tip box and returns the tip as a number, or `0` if it isn't usable.

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

// 47. In `updateCart`, replace the subtotal line with a call to `updateSummary()`.

// 48. Create a function named `applyCoupon` that takes an `event`, stops the form from submitting, and reads the coupon code in UPPERCASE.

// 49. Connect the Apply button (id `coupon-btn`) to `applyCoupon`.

// 50. Add two guard clauses to `applyCoupon`: one for an empty code, and one for a code that is not in `coupons`.

// 51. Add the last three lines to `applyCoupon`: save the code in `appliedCoupon`, show a success message, and call `updateSummary()`.

// 52. Make the shipping menu (id `shipping-menu`) and the tip box (id `tip-amount`) call `updateSummary` when they change.

// ===== PART 5: Checkout and the receipt =====

// 53. Read this: `receiptLine(id)` builds one line of the receipt. It is already in your PROG.js.

function receiptLine(id) {
  return cart[id] > 0
    ? `${products[id].name} × ${cart[id]} @ $${getPrice(id).toFixed(2)} = $${roundMoney(getPrice(id) * cart[id]).toFixed(2)}<br>`
    : "";
}

// 54. Create the variable `orderNumber` set to `1000`, and a function named `placeOrder` that takes an `event`, stops the form from submitting, and reads the name and email.

// 55. Connect the Place Order button (id `order-btn`) to `placeOrder`.

// 56. Add guard clause 1 to `placeOrder`: if there is no name, show an error and stop.

// 57. Add guard clause 2: if the email has no `@`, show an error and stop.

// 58. Add guard clause 3: if the cart is empty, show an error and stop.

// 59. Add four lines that get the totals, count up the order number, and make the discount line and the tip line.

// 60. Add the line that fills the receipt (id `receipt`) with `innerHTML`.

// 61. Add four lines that hide the shop, so only the receipt is left.

// 62. Add a click listener to the "Start a new order" button (id `new-order-btn`) that reloads the page.

// ===== PART 6: Deal of the day and shortcuts =====

// 63. Create the constant `productIds`, an array of the four product ids.

// 64. In `getPrice`, make a product on deal return its `dealPrice`.

// 65. In `showProduct`, show the old price crossed out next to the deal price when the product is on deal.

// 66. Read this: `pickDeal()` picks a random product for the deal of the day. It is already in your PROG.js.

function pickDeal() {
  const randomIndex = Math.floor(Math.random() * productIds.length);
  const dealId = productIds[randomIndex];
  products[dealId].onDeal = true;
  showProduct(dealId);
  document.getElementById("deal-banner").textContent = `Deal of the day: ${products[dealId].name} is 20% off!`;
}

pickDeal();

// 67. In the keyboard `switch`, add four more cases: the keys `"1"`, `"2"`, `"3"`, and `"4"` add the widget, gadget, gizmo, and doodad.

