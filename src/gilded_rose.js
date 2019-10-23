class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.dontReduceItems = [
      'Aged Brie',
      'Backstage passes to a TAFKAL80ETC concert',
      'Sulfuras, Hand of Ragnaros'
    ];
    this.increaseItems = [
      'Aged Brie',
      'Backstage passes to a TAFKAL80ETC concert'
    ]
    this.ticketItems = [
      'Backstage passes to a TAFKAL80ETC concert'
    ]
  }
}

Shop.prototype.updateQuality = function() {
  let self = this;

  this.items.forEach(function(item){
    if (self.reduceItemQuality(item)) { item.quality -= 1 };
    if (self.increaseItemQuality(item)) {item.quality = item.quality + 1};
    self.updateSellIn(item);
    if (self.isTicket(item)) {self.processTicket(item)};
 
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  });

  return this.items;
}

Shop.prototype.updateSellIn = function(item){
  if (item.name != 'Sulfuras, Hand of Ragnaros') {
    item.sellIn = item.sellIn - 1;
  }
}

Shop.prototype.reduceItemQuality = function(item){
  return (this.dontReduceItems.indexOf(item.name)===-1 && item.quality > 0);
}

Shop.prototype.increaseItemQuality = function(item){
  return (this.increaseItems.indexOf(item.name)!==-1 && item.quality < 50)
}

Shop.prototype.isTicket = function(item){
  return (this.ticketItems.indexOf(item.name)!==-1)
}

Shop.prototype.processTicket = function(item){
  switch(true){
    case (item.sellIn < 6):if (item.quality < 50) {item.quality += 2};break;
    case (item.sellIn < 11):if (item.quality < 50) {item.quality += 1};break;
  }
}
// module.exports = {
//   Item,
//   Shop
// }
