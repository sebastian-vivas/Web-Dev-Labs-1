// Widget Shop (ADVANCED track) - CHECKPOINT: finished code at the end of Part 1
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
