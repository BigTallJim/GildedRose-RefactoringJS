// var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("Name is set currectly", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 6) ]);
    expect(gildedRose.items[0].name).toEqual('Item');
  });

  it("SellIn is set currectly", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 6) ]);
    expect(gildedRose.items[0].sellIn).toEqual(5);
  });

  it("Quality is set currectly", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 6) ]);
    expect(gildedRose.items[0].quality).toEqual(6);
  });

  it("Sellin reduces each time update is run", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(4);
  });

  it("Quality reduces each time update is run", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(5);
  });

});
