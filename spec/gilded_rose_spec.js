// var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("Works for empty array", function() {
    const gildedRose = new Shop([]);
    expect(gildedRose.items.length).toEqual(0);
  });

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

  it("Quality reduces x2 once sell by has passed", function() {
    const gildedRose = new Shop([ new Item("Item", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("Quality can not be negative", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie quality increases each day", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 5, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(7);
  });

  it("Aged Brie quality increases more when past sell in", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("Item quality decreases by 2 more when past sell in", function() {
    const gildedRose = new Shop([ new Item("Item", -1, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });

  it("Quality can't be > 50", function() {
    const gildedRose = new Shop([ new Item("Item", 5, 51) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("Even Brie quality can't be > 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 5, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("Sulfuras quality never drops", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(10);
  });

  it("Sulfuras sell in never drops", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(5);
  });

  it("Backstage passes increase by 3 while sell in <= 5  & > 0", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("Backstage passes quality increase by 2 while sell in <= 10  & > 5", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("Backstage passes quality increase by 1 while sell in > 10", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 13, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("Backstage passes quality drop to 0 when sellin = 0", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Multiple List Test of all above tests", function() {
    i0 = new Item("Item", 5, 6)
    i1 = new Item("Item", 5, 6)
    i2 = new Item("Item", 5, 6)
    i3 = new Item("Item", 5, 6)
    i4 = new Item("Item", 5, 6)
    i5 = new Item("Item", 0, 10)
    i6 = new Item("Item", 5, 0)
    i7 = new Item("Aged Brie", 5, 6)
    i8 = new Item("Item", 5, 51)
    i9 = new Item("Aged Brie", 5, 50)
    i10 = new Item("Sulfuras, Hand of Ragnaros", 5, 10)
    i11 = new Item("Sulfuras, Hand of Ragnaros", 5, 10)
    i12 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
    i13 = new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)
    i14 = new Item("Backstage passes to a TAFKAL80ETC concert", 13, 10)
    i15 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
    const gildedRose = new Shop([i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15]);
    expect(gildedRose.items[0].name).toEqual('Item');
    expect(gildedRose.items[1].sellIn).toEqual(5);
    expect(gildedRose.items[2].quality).toEqual(6);
    const items = gildedRose.updateQuality();
    expect(items[3].sellIn).toEqual(4);
    expect(items[4].quality).toEqual(5);
    expect(items[5].quality).toEqual(8);
    expect(items[6].quality).toEqual(0);
    expect(items[7].quality).toEqual(7);
    expect(items[8].quality).toEqual(50);
    expect(items[9].quality).toEqual(50);
    expect(items[10].quality).toEqual(10);
    expect(items[11].sellIn).toEqual(5);
    expect(items[12].quality).toEqual(13);
    expect(items[13].quality).toEqual(12);
    expect(items[14].quality).toEqual(11);
    expect(items[15].quality).toEqual(0);
  });
});
