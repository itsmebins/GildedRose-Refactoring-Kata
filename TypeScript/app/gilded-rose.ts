export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private static isLegendary(item: Item): boolean {
    return (item.name || "").toLowerCase() === "sulfuras";
  }

  private static isAgedBrie(item: Item): boolean {
    return (item.name || "").toLowerCase() === "aged brie";
  }

  private static isBackstagePass(item: Item): boolean {
    return (item.name || "").toLowerCase() === "backstage passes";
  }

  private static isConjured(item: Item): boolean {
    return  (item.name || "").toLowerCase().indexOf('conjured') === 0;
  }

  private static updateQualityForAgedBrie(item: Item): void {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private static updateQualityForBackstagePass(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      item.quality += 3;
    } else if (item.sellIn < 10) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.quality = Math.min(item.quality, 50);
  }

  private static updateQualityForConjured(item: Item): void {
    item.quality -= item.sellIn < 0 ? 4 : 2;
    item.quality = Math.max(item.quality, 0);
  }

  private static updateQualityForRegularItem(item: Item): void {
    item.quality -= item.sellIn < 0 ? 2 : 1;
    item.quality = Math.max(item.quality, 0);
  }

  updateQuality() {
    for (let item of this.items) {
      if (GildedRose.isLegendary(item)) continue;

      item.sellIn -= 1;

      if (GildedRose.isAgedBrie(item)) {
        GildedRose.updateQualityForAgedBrie(item);
      } else if (GildedRose.isBackstagePass(item)) {
        GildedRose.updateQualityForBackstagePass(item);
      } else if (GildedRose.isConjured(item)) {
        GildedRose.updateQualityForConjured(item);
      } else {
        GildedRose.updateQualityForRegularItem(item);
      }
    }
  }
/* Old method
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }  */
}
