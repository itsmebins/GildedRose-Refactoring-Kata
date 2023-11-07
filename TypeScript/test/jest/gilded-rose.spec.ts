import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {

    it('should degrade quality and sellIn for regular items', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(19);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('should degrade quality twice as fast once the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item('regular', 0, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
    });

    it('should not degrade quality below 0', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it('should increase quality for "Aged Brie"', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(21);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    });

    it('"Sulfuras" should never decrease in quality or sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras', 10, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(80);
      expect(gildedRose.items[0].sellIn).toBe(10);
    });

    it('should increase quality for "Backstage passes" as sellIn approaches', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes', 11, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(21);
    });

    it('should increase quality for "Backstage passes" by 2 when 10 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes', 10, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(22);
    });

    it('should increase quality for "Backstage passes" by 3 when 5 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes', 5, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(23);
    });

    it('should drop quality for "Backstage passes" to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes', 0, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it('should degrade "Conjured" items twice as fast as regular items', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(16); // Decreases by 2 since sellIn > 0
    });

    it('should degrade "Conjured" items four times as fast after sell by date', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(16); // Decreases by 4 since sellIn <= 0
    });

  });
});
