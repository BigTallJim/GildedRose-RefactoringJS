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
      'Aged Brie'
    ];
    this.ticketItems = [
      'Backstage passes to a TAFKAL80ETC concert'
    ];
    this.dontReduceSellIn = [
      'Sulfuras, Hand of Ragnaros'
    ];
  }
}

Shop.prototype.updateQuality = function() {
  let self = this;

  this.items.forEach(function(item){
    if (self.reduceItemQuality(item)) {self.changeQuality(item, -1)};
    if (self.increaseItemQuality(item)) {self.changeQuality(item, 1)};
    if (self.isTicket(item)) {self.processTicket(item)};
    self.updateSellIn(item);
  });
  return this.items;
}

Shop.prototype.updateSellIn = function(item){
  if (this.dontReduceSellIn.indexOf(item.name)===-1) {
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
  let self = this;
  switch(true){
    case (item.sellIn <= 0):item.quality = 0;break;
    case (item.sellIn < 6):self.changeQuality(item, 3);break;
    case (item.sellIn < 11):self.changeQuality(item, 2);break;
    default:self.changeQuality(item, 1);break;
  }
}

Shop.prototype.changeQuality = function(item, num){
  if (item.sellIn <= 0) {num *= 2}
  item.quality += num;
  if (item.quality > 50){item.quality = 50};
  if (item.quality < 0){item.quality = 0};
}