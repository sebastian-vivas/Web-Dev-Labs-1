// Widget Shop (ADVANCED track) - PROG (type your code here)
// Project 99.02

// ===== PART 1: The data model =====

// 1. Create four constants: `SHOP_NAME` is `"Widget Shop"`, `TAX_RATE` is `0.08` (8%), `FREE_SHIPPING_MIN` is `10000` (that is $100.00, in cents), and `DEAL_PCT` is `20` (percent off for the deal of the day).

// 2. Create `formatMoney(cents)`, which returns an amount in cents as a dollar string like `"$19.99"`.

// 3. Create the factory `makeProduct(id, name, price, stock, tags)`, which returns a product object with those five properties plus `onDeal: false`.

// 4. Create the constant `products`, an array of four products made with `makeProduct(id, name, price, stock, tags)`. Widget: `"widget"`, `"Wonder Widget"`, `1999`, `5`, tags `"tools"` and `"bestseller"`. Gadget: `"gadget"`, `"Gadget Pro"`, `3450`, `3`, tag `"electronics"`. Gizmo: `"gizmo"`, `"Mini Gizmo"`, `1200`, `10`, tags `"tools"` and `"small"`. Doodad: `"doodad"`, `"Doo-Dad Deluxe"`, `7500`, `2`, tags `"premium"` and `"limited"`.

// 5. Add a `getPrice()` method to the object that `makeProduct` returns.

// 6. Add `getAvailable(inCart)` and `isLowStock(inCart)` methods to the same object.

// 7. Create `findProduct(id)`, which returns the product with that id, or `undefined` if there isn't one.

// 8. Create the constant `TIERS`, an array of three tiers, smallest quantity first. Each is an object with a `minQty` and a `pctOff`: `1` and `0`, `3` and `5`, and `5` and `10`.

// 9. Create the constant `COUPONS`, an object keyed by UPPERCASE code. `SAVE10` has `pct` `10` and `note` `"10% off"`. `BIGSPENDER` has `pct` `20`, `minSubtotal` `15000` (cents), and `note` `"20% off orders over $150"`. `WEEKEND` has `pct` `15`, `days` `[0, 6]` (Sunday and Saturday), and `note` `"15% off on weekends"`.

// 10. Create the constant `SHIPPING`, an object that maps each shipping method to its price in cents: `standard` is `599`, `express` is `1499`, and `overnight` is `2999`.

// ===== PART 2: The pricing engine =====

// 11. Create `getTierPct(qty)`, which returns the bulk-discount percent for a quantity.

// 12. Create `getLineTotal(product, qty)`, which returns one cart line's total in cents, with the deal price and bulk discount applied.

// 13. Create the factory `createCart()`, which returns a cart object with an `items` object and a `getQty(id)` method.

// 14. Add a `change(id, delta)` method to the cart that adds `delta` to a product's quantity, and returns a `{ ok, message }` result object.

// 15. Add `clear()` and `getLines()` methods to the cart.

// 16. Create `validateCoupon(code, subtotal, date = new Date())`, which returns `{ ok, pct, message }` for a coupon code.

// 17. Create `getShippingCost(method, subtotal)`, which returns the shipping price in cents.

// 18. Create `calcTotals(cart, couponCode, shipMethod, date = new Date())`, which returns every amount the page and the receipt need, in cents.

// ===== PART 3: Rendering and events =====

// 19. Create the constant `state`, an object with three properties: `cart` (the result of calling `createCart()`), `couponCode` (an empty string `""`), and `shipMethod` (`"standard"`).

// 20. Create the constant `els`, an object that holds every page element you will need. Each property is `document.getElementById(...)`: `catalog`, `cartItems` (id `cart-items`), `sumSubtotal`, `sumDiscount`, `sumTax`, `sumShipping`, `sumTotal` (ids `sum-subtotal` and so on), `couponNote` (`coupon-note`), `couponInput` (`coupon-code`), `shipMenu` (`shipping-menu`), `form` (`checkout-form`), `nameInput` (`customer-name`), `emailInput` (`customer-email`), `errors`, `message`, `receipt`, `history`, `greeting`, `today` (`today-date`), `deal` (`deal-banner`), and `shopName` (`shop-name`).

// 21. Create `showMessage(text, type)`, which puts a message in `els.message`.

// 22. Create `productCardHTML(p)`, which returns the HTML string for one product card.

// 23. Create `renderCatalog()`, which fills `els.catalog` with one card per product.

// 24. Create `cartLineHTML(line)`, which returns the HTML string for one cart line.

// 25. Create `renderCart()`, which fills `els.cartItems` with the cart lines, or "Your cart is empty." when there are none.

// 26. Create `renderSummary()`, which shows the totals and the coupon feedback.

// 27. Create `render()`, which calls the three render functions, and then call `render()` once.

// 28. Create `handleResult(result)` and the lookup object `actions`.

// 29. Add ONE `click` listener on `document` that finds the clicked button's `data-action` and calls the matching function in `actions`.

// 30. Add a `change` listener on the shipping menu that updates `state.shipMethod` and calls `renderSummary()`.

// ===== PART 4: Checkout and orders =====

// 31. Create `escapeHTML(text)`, which makes user-typed text safe to put into `innerHTML`.

// 32. Create `validateCheckout(fields, cart, shipMethod, couponCode)`, which returns an array of error messages (empty when everything is valid).

// 33. Create the factory `makeOrder(customer, totals, shipMethod, date)`, which returns an order object that is a **snapshot** of the data.

// 34. Add a `getSummary()` method to the order.

// 35. Add a `getReceiptHTML()` method to the order.

// 36. Create the constant `orders` (an empty array) and `renderHistory()`, which lists each order's summary in `els.history`.

// 37. Create `placeOrder(event)` and attach it to the form's `submit` event. It validates the form and shows **all** the errors.

// 38. Add to `placeOrder`: when the form is valid, make the order, take the quantities out of stock, and save the order in `orders`.

// 39. Add to `placeOrder`: reset the shop, show the receipt and a message, and redraw.

// ===== PART 5: Polish: greeting, theme, shortcuts =====

// 40. Create `getGreeting(hour)`, which returns `"Still up"` before 5, `"Good morning"` before 12, `"Good afternoon"` before 18, and `"Good evening"` otherwise. Then create `getDateString(date)`, which returns a long date like `"Friday, October 16, 2026"`.

// 41. Show the shop name, the greeting, and today's date in the header.

// 42. Create `readSetting(key)` and `saveSetting(key, value)`, which use `localStorage` but never throw an error.

// 43. Create `setTheme(isDark)` and `toggleTheme()`, and restore the saved theme when the page loads.

// 44. Create the lookup object `shortcuts`, which maps a key name to a function.

// 45. Create a `keydown` listener on `document` that ignores modified keys and keys typed inside a box or menu.

// 46. Add to the `keydown` listener: number keys add a product by position, and every other key looks itself up in `shortcuts`.

// ===== PART 6: Deal of the day and stats =====

// 47. Create `getDayOfYear(date)`, which returns the day number in the year (January 1 is day 1).

// 48. Create `pickDeal(date = new Date())`, which marks one product as the deal and returns it.

// 49. Call `pickDeal()` for today, show the deal banner, and call `render()`.

// 50. Create `getStats()`, which returns `{ count, revenue, average }` for the orders so far.

// 51. Change `renderHistory()` so it shows a stats line above the list of orders.

