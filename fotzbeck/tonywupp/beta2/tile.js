const TILE_SIZE = 40;

const VIEWPORT = {
  width: 800,
  height: 800
};

const DEADZONE = {
  width: VIEWPORT.width * 0.7,
  height: VIEWPORT.height * 0.7
};

const player = {
  x: 0,
  y: 0,
  speed: 200 // world units / second
};

const camera = {
  x: 0,
  y: 0
};

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
  return (
    Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  ) % 1;
}

function tileColor(worldX, worldY) {
  const n = pseudoNoise(worldX * 0.1, worldY * 0.1);

  if (n < 0.3) return "#2ecc71"; // grass
  if (n < 0.5) return "#27ae60"; // dark grass
  if (n < 0.7) return "#f1c40f"; // sand
  return "#95a5a6";              // stone
}

function drawTiles() {
  const startX = Math.floor(camera.x / TILE_SIZE);
  const startY = Math.floor(camera.y / TILE_SIZE);

  const endX = startX + Math.ceil(VIEWPORT.width / TILE_SIZE) + 1;
  const endY = startY + Math.ceil(VIEWPORT.height / TILE_SIZE) + 1;

  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const worldX = tx * TILE_SIZE;
      const worldY = ty * TILE_SIZE;
        push()
        fill(tileColor(tx, ty))
        noStroke()  
        rect(
            worldX - camera.x,
            worldY - camera.y,
            TILE_SIZE,
            TILE_SIZE
        );
        pop()
    }
  }
}

function drawPlayer() {
  push();
    fill(255, 0, 0);
  rect(
    player.x - camera.x - 8,
    player.y - camera.y - 8,
    16,
    16
  );
    pop();
}
