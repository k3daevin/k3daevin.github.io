const TILE_SIZE = 20;


function updateCamera() {
  const dzLeft   = camera.x + (VIEWPORT.width  - DEADZONE.width)  / 2;
  const dzRight  = dzLeft + DEADZONE.width;
  const dzTop    = camera.y + (VIEWPORT.height - DEADZONE.height) / 2;
  const dzBottom = dzTop + DEADZONE.height;

  if (player.x < dzLeft) {
    camera.x = player.x - (VIEWPORT.width  - DEADZONE.width) / 2;
  } else if (player.x > dzRight) {
    camera.x = player.x - (VIEWPORT.width  + DEADZONE.width) / 2;
  }

  if (player.y < dzTop) {
    camera.y = player.y - (VIEWPORT.height - DEADZONE.height) / 2;
  } else if (player.y > dzBottom) {
    camera.y = player.y - (VIEWPORT.height + DEADZONE.height) / 2;
  }
}

// sehr einfache Noise-Funktion (deterministisch)
function pseudoNoise(x, y) {
  // Basis-Noise (low frequency)
  const base =
    Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;

  // Diagonaler High-Frequency-Noise
  const diagonal =
    Math.sin((x + y) * 90.123) * 15731.743;

  // Kombinieren
  const combined = base + diagonal * 0.25;

  return combined - Math.floor(combined); // sauber auf [0..1)
}


function tileColor(worldX, worldY) {
  const n = pseudoNoise(worldX * 0.1, worldY * 0.1);

  if (n < 0.3) return "#2ecc71"; // grass
  if (n < 0.5) return "#27ae60"; // dark grass
  if (n < 0.7) return "#f1c40f"; // sand
  return "#95a5a6";              // stone
}

function drawTiles(camera) {
  const startX = Math.floor(camera.x / TILE_SIZE);
  const startY = Math.floor(camera.y / TILE_SIZE);

  const endX = startX + Math.ceil(camera.viewWidth / TILE_SIZE) + 1;
  const endY = startY + Math.ceil(camera.viewHeight / TILE_SIZE) + 1;

  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const worldX = tx * TILE_SIZE;
      const worldY = ty * TILE_SIZE;
      const { x, y } = camera.worldToScreen(worldX, worldY);
        push()
        fill(tileColor(tx, ty))
        noStroke()  
        rect(
            x,
            y,
            TILE_SIZE,
            TILE_SIZE
        );
        pop()
    }
  }
}

