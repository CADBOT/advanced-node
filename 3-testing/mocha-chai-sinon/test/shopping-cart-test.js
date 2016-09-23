var expect = require('chai').expect
var ShoppingCart = require('../shoppingCart.js')
var sinon = require('sinon')


describe('shoppingCart', function() {
  it('can add a new item', function() {
    var cart = new ShoppingCart()
    cart.add({item: 'book', cost: 10})
    expect(cart.items).to.eql(
      [{item: 'book', cost: 10}]
    )
  })

  /*
  it('can compute the subTotal', function() {
    var cart = new ShoppingCart()
    cart.add({item: 'book', cost: 10})
    cart.add({item: 'dvd', cost: 15})
    expect(cart.subtotal()).to.eql(25)
  })
  */

  /*
  it('can compute the tax for denmark', function() {
    var cart = new ShoppingCart()
    sinon.stub(cart, add, function(item, done) {
      done([

      })
    }
    cart.add({item: 'tv', cost: 1000})
    expect(cart.computeTax('denmark')).to.equal(200)
  })

  it('can compute the total', function() {
  }
  */
})

describe('shoppingCart total', function() {
  var cart
  beforeEach(function() {
    cart = new ShoppingCart() 
    cart.add({item: 'tv', cost: 1000})
    cart.add({item: 'book', cost: 5})
    sinon.stub(cart, 'subtotal', function(item) {
      return 1005
    })
  })

  afterEach(function() {
    cart.subtotal.restore()
  })

  it('can compute the total for denmark', function() {
    var total = 1206
    sinon.stub(cart, 'computeTax', function(country) {
      return 201
    })
    expect(cart.total('denmark')).to.equal(total)
    expect(cart.subtotal.called).to.eql(true)
    expect(cart.computeTax.called).to.eql(true)
    //expect(cart.computeTax.getCall(0).args[0]).to.eql('denmark')
    expect(cart.computeTax.calledWith('denmark')).to.eql(true)
    cart.computeTax.restore()
  })
})
