function ShoppingCart() {
  this.items = []
}

var taxes = {
  denmark: 0.20,
  norway:  0.22
}

ShoppingCart.prototype = {
  add(item) {
    this.items.push(item)
  },

  subtotal() {
    return this.items.reduce(function(total, item) {
      return total + item.cost
    }, 0)
  },

  computeTax(country) {
    return (this.subtotal() * taxes[country])
  },

  total(country) {
    var tax = this.computeTax(country)
    return this.subtotal() + tax
  }
}

module.exports = ShoppingCart
