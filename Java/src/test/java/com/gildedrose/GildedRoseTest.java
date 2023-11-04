package com.gildedrose;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GildedRoseTest {

    @Test
    void randomArticleLowersBy1() {
        Item[] items = new Item[] { new Item("foo", 1, 4) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("foo", item.name);
        assertEquals(3, item.quality);
        assertEquals(0, item.sellIn);
    }

    @Test
    void randomArticleLowersBy2AfterOverdue() {
        Item[] items = new Item[] { new Item("foo", 0, 4) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("foo", item.name);
        assertEquals(2, item.quality);
        assertEquals(-1, item.sellIn);
    }

    @Test
    void aritcleQualityNotNegative() {
        Item[] items = new Item[] { new Item("foo", 0, 0) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("foo", item.name);
        assertEquals(0, item.quality);
        assertEquals(-1, item.sellIn);
    }

    @Test
    void agedBrieIncreasesQuality() {
        Item[] items = new Item[] { new Item("Aged Brie", 1, 0) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("Aged Brie", item.name);
        assertEquals(1, item.quality);
        assertEquals(0, item.sellIn);
    }

    @Test
    void agedBrieIncreasesQualityBy2() {
        Item[] items = new Item[] { new Item("Aged Brie", 0, 0) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("Aged Brie", item.name);
        assertEquals(2, item.quality);
        assertEquals(-1, item.sellIn);
    }

    @Test
    void articleQualityNotAbove50() {
        Item[] items = new Item[] { new Item("Aged Brie", 0, 50) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("Aged Brie", item.name);
        assertEquals(50, item.quality);
        assertEquals(-1, item.sellIn);
    }

    @Test
    void sulfurasNoChange() {
        Item[] items = new Item[] { new Item("Sulfuras, Hand of Ragnaros", 0, 80) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("Sulfuras, Hand of Ragnaros", item.name);
        assertEquals(80, item.quality);
        assertEquals(0, item.sellIn);
    }

    @Test
    void backstagePasses() {
        Item[] items = new Item[] { new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();

        Item item = app.items[0];

        assertEquals("Backstage passes to a TAFKAL80ETC concert", item.name);
        assertEquals(31, item.quality);
        assertEquals(10, item.sellIn);

        app.updateQuality();

        assertEquals("Backstage passes to a TAFKAL80ETC concert", item.name);
        assertEquals(33, item.quality);
        assertEquals(9, item.sellIn);

        items[0].sellIn = 5;
        app.updateQuality();

        assertEquals("Backstage passes to a TAFKAL80ETC concert", item.name);
        assertEquals(36, item.quality);
        assertEquals(4, item.sellIn);

        items[0].sellIn = 0;
        app.updateQuality();

        assertEquals("Backstage passes to a TAFKAL80ETC concert", item.name);
        assertEquals(0, item.quality);
        assertEquals(-1, item.sellIn);
    }
}
