function preloadAssetsAndStuff() {

    loadJSON('/assets/json/tier.json', (tiersData) => {
        options.tiers = tiersData.tiers.map(tierData => new Tier(tierData.number, tierData.rank, tierData.range));
    });


    loadJSON('/assets/json/tony.json', (tonydata) => {
        options.tonydata = tonydata;

        function loadAndRtl(path) {
            const img = loadImage(path);
            const rtl = path.replace('.png', '_rtl.png');
            return {ltr: img, rtl: loadImage(rtl)};
        }

        img.tony = {}
        img.tony.still = loadAndRtl(options.tonydata.images.still);
        img.tony.wupp = loadAndRtl(options.tonydata.images.wupp);
        img.tony.crash = loadAndRtl(options.tonydata.images.crash);
    });

    loadJSON('/assets/json/pickups.json', (pickupDefinitionsData) => {
        options.pickup_max_extent = pickupDefinitionsData.max_extent;
        options.pickups = pickupDefinitionsData.pickups.map(defData => {
            const image = loadImage(defData.image);
            return new PickupDefinition(image, defData);
        });
    });
}