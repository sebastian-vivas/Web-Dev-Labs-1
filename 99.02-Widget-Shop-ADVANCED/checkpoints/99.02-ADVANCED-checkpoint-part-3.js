// Widget Shop (ADVANCED track) - CHECKPOINT: finished code at the end of Part 3
// Project 99.02

// ===== PART 1: The data model =====

// 1. Create four constants: `SHOP_NAME`, `TAX_RATE`, `FREE_SHIPPING_MIN`, and `DEAL_PCT`.
const SHOP_NAME = "Widget Shop";
const TAX_RATE = 0.08;
const FREE_SHIPPING_MIN = 10000; // cents ($100.00)
const DEAL_PCT = 20; // percent off for the deal of the day

// 2. Create `formatMoney(cents)`, which returns an amount in cents as a dollar string like `"$19.99"`.
function formatMoney(cents) {
  return "$" + (cents / 100).toFixed(2);
}

// 3. Create the factory `makeProduct(id, name, price, stock, tags)`, which returns a product object with those five properties plus `onDeal: false`.
function makeProduct(id, name, price, stock, tags) {
  return {
    id: id,
    name: name,
    price: price, // in cents
    stock: stock,
    tags: tags,
    onDeal: false,
    getPrice: function () {
      return this.onDeal ? Math.round((this.price * (100 - DEAL_PCT)) / 100) : this.price;
    },
    getAvailable: function (inCart = 0) {
      return this.stock - inCart;
    },
    isLowStock: function (inCart = 0) {
      const left = this.getAvailable(inCart);
      return left > 0 && left <= 2;
    },
  };
}

// 4. Create the constant `products`, an array of four products made with `makeProduct()`.
const products = [
  makeProduct("widget", "Wonder Widget", 1999, 5, ["tools", "bestseller"]),
  makeProduct("gadget", "Gadget Pro", 3450, 3, ["electronics"]),
  makeProduct("gizmo", "Mini Gizmo", 1200, 10, ["tools", "small"]),
  makeProduct("doodad", "Doo-Dad Deluxe", 7500, 2, ["premium", "limited"]),
];

// 7. Create `findProduct(id)`, which returns the product with that id, or `undefined` if there isn't one.
function findProduct(id) {
  return products.find(function (p) {
    return p.id === id;
  });
}

// 8. Create the constant `TIERS`, an array of three bulk-discount tiers.
const TIERS = [
  { minQty: 1, pctOff: 0 },
  { minQty: 3, pctOff: 5 },
  { minQty: 5, pctOff: 10 },
];

// 9. Create the constant `COUPONS`, an object of three coupons keyed by UPPERCASE code.
const COUPONS = {
  SAVE10: { pct: 10, note: "10% off" },
  BIGSPENDER: { pct: 20, minSubtotal: 15000, note: "20% off orders over $150" },
  WEEKEND: { pct: 15, days: [0, 6], note: "15% off on weekends" },
};

// 10. Create the constant `SHIPPING`, an object that maps each shipping method to its price in cents.
const SHIPPING = { standard: 599, express: 1499, overnight: 2999 };

// ===== PART 2: The pricing engine =====

// 11. Create `getTierPct(qty)`, which returns the bulk-discount percent for a quantity.
function getTierPct(qty) {
  if (qty >= TIERS[2].minQty) return TIERS[2].pctOff;
  if (qty >= TIERS[1].minQty) return TIERS[1].pctOff;
  return TIERS[0].pctOff;
}

// 12. Create `getLineTotal(product, qty)`, which returns one cart line's total in cents, with the deal price and bulk discount applied.
function getLineTotal(product, qty) {
  const gross = product.getPrice() * qty;
  return Math.round((gross * (100 - getTierPct(qty))) / 100);
}

// 13. Create the factory `createCart()`, which returns a cart object with an `items` object and a `getQty(id)` method.
function createCart() {
  return {
    items: {},

    getQty: function (id) {
      return this.items[id] || 0;
    },
    change: function (id, delta) {
      const product = findProduct(id);
      if (!product) {
        return { ok: false, message: "Unknown product." };
      }
      if (!Number.isInteger(delta)) {
        return { ok: false, message: "Quantity must be a whole number." };
      }
      const wanted = this.getQty(id) + delta;
      if (wanted > product.stock) {
        return {
          ok: false,
          message: `Only ${product.stock} ${product.name} in stock (you have ${this.getQty(id)} in your cart).`,
        };
      }
      if (wanted <= 0) {
        delete this.items[id];
        return { ok: true, message: `Removed ${product.name}.` };
      }
      this.items[id] = wanted;
      return { ok: true, message: `${product.name} × ${wanted} in cart.` };
    },
    clear: function () {
      this.items = {};
    },

    getLines: function () {
      const items = this.items; // `this` is not the cart inside the callback below
      return Object.keys(items).map(function (id) {
        const product = findProduct(id);
        const qty = items[id];
        return { product: product, qty: qty, tierPct: getTierPct(qty), lineTotal: getLineTotal(product, qty) };
      });
    },
  };
}

// 16. Create `validateCoupon(code, subtotal, date = new Date())`, which returns `{ ok, pct, message }` for a coupon code.
function validateCoupon(code, subtotal, date = new Date()) {
  const key = code.trim().toUpperCase();
  if (key === "") {
    return { ok: true, pct: 0, message: "" };
  }
  const coupon = COUPONS[key];
  if (!coupon) {
    return { ok: false, pct: 0, message: `${key} is not a valid coupon.` };
  }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return { ok: false, pct: 0, message: `${key} needs a subtotal of at least ${formatMoney(coupon.minSubtotal)}.` };
  }
  if (coupon.days && !coupon.days.includes(date.getDay())) {
    return { ok: false, pct: 0, message: `${key} is only valid on weekends.` };
  }
  return { ok: true, pct: coupon.pct, message: `${key}: ${coupon.note}` };
}

// 17. Create `getShippingCost(method, subtotal)`, which returns the shipping price in cents.
function getShippingCost(method, subtotal) {
  const cost = SHIPPING[method];
  if (cost === undefined) return 0;
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_MIN) return 0;
  return cost;
}

// 18. Create `calcTotals(cart, couponCode, shipMethod, date = new Date())`, which returns every amount the page and the receipt need, in cents.
function calcTotals(cart, couponCode, shipMethod, date = new Date()) {
  const lines = cart.getLines();
  let subtotal = 0;
  lines.forEach(function (line) {
    subtotal += line.lineTotal;
  });
  const coupon = validateCoupon(couponCode, subtotal, date);
  const discount = Math.round((subtotal * coupon.pct) / 100);
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const shipping = getShippingCost(shipMethod, subtotal);
  return {
    lines: lines,
    subtotal: subtotal,
    discount: discount,
    tax: tax,
    shipping: shipping,
    total: subtotal - discount + tax + shipping,
    couponOk: coupon.ok,
    couponMessage: coupon.message,
  };
}

// ===== PART 3: Rendering and events =====

// 19. Create the constant `state`, an object that holds the cart, the applied coupon text, and the shipping method.
const state = {
  cart: createCart(),
  couponCode: "",
  shipMethod: "standard",
};

// 20. Create the constant `els`, an object that holds every page element you will need, so you only call `getElementById` once for each.
const els = {
  catalog: document.getElementById("catalog"),
  cartItems: document.getElementById("cart-items"),
  sumSubtotal: document.getElementById("sum-subtotal"),
  sumDiscount: document.getElementById("sum-discount"),
  sumTax: document.getElementById("sum-tax"),
  sumShipping: document.getElementById("sum-shipping"),
  sumTotal: document.getElementById("sum-total"),
  couponNote: document.getElementById("coupon-note"),
  couponInput: document.getElementById("coupon-code"),
  shipMenu: document.getElementById("shipping-menu"),
  form: document.getElementById("checkout-form"),
  nameInput: document.getElementById("customer-name"),
  emailInput: document.getElementById("customer-email"),
  errors: document.getElementById("errors"),
  message: document.getElementById("message"),
  receipt: document.getElementById("receipt"),
  history: document.getElementById("history"),
  greeting: document.getElementById("greeting"),
  today: document.getElementById("today-date"),
  deal: document.getElementById("deal-banner"),
  shopName: document.getElementById("shop-name"),
};

// 21. Create `showMessage(text, type)`, which puts a message in `els.message`.
function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = "message " + (type || "");
}

// 22. Create `productCardHTML(p)`, which returns the HTML string for one product card.
function productCardHTML(p) {
  const inCart = state.cart.getQty(p.id);
  const available = p.getAvailable(inCart);
  let stockText = `${available} in stock`;
  let stockClass = "stock";
  if (p.stock === 0) {
    stockText = "SOLD OUT";
    stockClass = "stock out";
  } else if (available === 0) {
    stockText = "All of them are in your cart";
  } else if (p.isLowStock(inCart)) {
    stockText = `Only ${available} left!`;
    stockClass = "stock low";
  }
  const oldPrice = p.onDeal ? `<s>${formatMoney(p.price)}</s>` : "";
  return `<article class="item">
    <span class="sticker">${oldPrice}${formatMoney(p.getPrice())}</span>
    <h3>${p.name}</h3>
    <p class="tags">${p.tags.join(", ")}</p>
    <p class="${stockClass}">${stockText}</p>
    <button data-action="add" data-id="${p.id}" ${available <= 0 ? "disabled" : ""}>Add to cart</button>
  </article>`;
}

// 23. Create `renderCatalog()`, which fills `els.catalog` with one card per product.
function renderCatalog() {
  els.catalog.innerHTML = products.map(productCardHTML).join("");
}

// 24. Create `cartLineHTML(line)`, which returns the HTML string for one cart line.
function cartLineHTML(line) {
  const id = line.product.id;
  const note = line.tierPct > 0 ? `<span class="note">Bulk discount: ${line.tierPct}% off</span>` : "";
  return `<div class="tape-line">
    <span>${line.product.name}${note}</span>
    <span class="qty-controls">
      <button class="plain" data-action="dec" data-id="${id}" aria-label="Remove one">-</button>
      ${line.qty}
      <button class="plain" data-action="inc" data-id="${id}" aria-label="Add one">+</button>
      <button class="plain" data-action="remove" data-id="${id}" aria-label="Remove all">x</button>
    </span>
    <span>${formatMoney(line.lineTotal)}</span>
  </div>`;
}

// 25. Create `renderCart()`, which fills `els.cartItems` with the cart lines, or "Your cart is empty." when there are none.
function renderCart() {
  const lines = state.cart.getLines();
  if (lines.length === 0) {
    els.cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  els.cartItems.innerHTML = lines.map(cartLineHTML).join("");
}

// 26. Create `renderSummary()`, which shows the totals and the coupon feedback.
function renderSummary() {
  const t = calcTotals(state.cart, state.couponCode, state.shipMethod);
  els.sumSubtotal.textContent = formatMoney(t.subtotal);
  els.sumDiscount.textContent = "-" + formatMoney(t.discount);
  els.sumTax.textContent = formatMoney(t.tax);
  els.sumShipping.textContent = formatMoney(t.shipping);
  els.sumTotal.textContent = formatMoney(t.total);
  els.couponNote.textContent = t.couponMessage;
  els.couponNote.className = t.couponOk ? "stock" : "stock low";
}

// 27. Create `render()`, which calls the three render functions, and then call `render()` once.
function render() {
  renderCatalog();
  renderCart();
  renderSummary();
}

render();

// 28. Create `handleResult(result)` and the lookup object `actions`.
function handleResult(result) {
  showMessage(result.message, result.ok ? "ok" : "error");
  render();
}

const actions = {
  add: function (id) {
    handleResult(state.cart.change(id, 1));
  },
  inc: function (id) {
    handleResult(state.cart.change(id, 1));
  },
  dec: function (id) {
    handleResult(state.cart.change(id, -1));
  },
  remove: function (id) {
    handleResult(state.cart.change(id, -state.cart.getQty(id)));
  },
  apply: function () {
    state.couponCode = els.couponInput.value;
    render();
  },
};

// 29. Add ONE `click` listener on `document` that finds the clicked button's `data-action` and calls the matching function in `actions`.
document.addEventListener("click", function (event) {
  const action = event.target.dataset.action;
  if (!action || !actions[action]) return;
  actions[action](event.target.dataset.id);
});

// 30. Add a `change` listener on the shipping menu that updates `state.shipMethod` and calls `renderSummary()`.
els.shipMenu.addEventListener("change", function () {
  state.shipMethod = els.shipMenu.value;
  renderSummary();
});
