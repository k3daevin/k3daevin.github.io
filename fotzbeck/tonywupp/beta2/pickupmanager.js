class PickupManager {
  constructor(options) {
    this.pickups = [];
    this.maxPickups = options.maxPickups || 100;
    this.pickupDefinitions = options.pickups || [];
    this.tiers = options.tiers || [];
  }
  
  takeRandomPickupDefinition(x, y) {
    try {
      const dist = Math.sqrt(x*x+y*y) / TILE_SIZE;
      const filteredTiers = this.tiers.filter(tier => tier.isInRange(dist));
      const tierIndex = Math.floor(Math.random() * filteredTiers.length);
      const tier = filteredTiers.length > 0 ? filteredTiers[tierIndex] : this.tiers[0];
      const defsInTier = this.pickupDefinitions.filter(def => def.tier === tier.number);
      const defIndex = Math.floor(Math.random() * defsInTier.length);
      const def = defsInTier[defIndex];
      return new Pickup(x, y, def);
    } catch (e) {
      console.error('Error taking random pickup definition:', e);
      return new Pickup(x, y, this.pickupDefinitions[0]);
    }
  }

  removeAddPickups(camera, player) {
    //out of bounds or collected pickups
    this.pickups.forEach(pickup => {
      if (!pickup.toRemove && !camera.isVisible(pickup.x, pickup.y, camera.viewWidth)) {
        pickup.toRemove = true;
      }
      if (!pickup.toRemove && pickup.collect(player)) {
        //collected
        pickup.toRemove = true;
      }
    });
    //remove collected pickups
    this.pickups = this.pickups.filter(pickup => !pickup.toRemove);
    //add new pickups if below max
    while (this.pickups.length < this.maxPickups) {
      const x = random(camera.x - camera.viewWidth, camera.x + 2*camera.viewWidth);
      const y = random(camera.y - camera.viewHeight, camera.y + 2*camera.viewHeight);
      //if (camera.isVisible(x, y, camera.viewWidth)) continue;
      const pickup = this.takeRandomPickupDefinition(x, y);
      this.pickups.push(pickup);
    }
  }
  draw(camera) {
    this.pickups.forEach(pickup => {
      pickup.draw(camera);
    });
}
}