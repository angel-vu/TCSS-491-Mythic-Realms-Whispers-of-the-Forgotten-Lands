// globalThis.level = new loadBackground(
//   this.game,
//   this.x - this.game.camera.x,
//   this.y - this.game.camera.y,
//   levelOne
// );
// const map = this.level.formMap();

class Grass {
  // This is the layer that Link can walk on
  constructor(game, x, y, levelOne) {
    Object.assign(this, { game, x, y, levelOne });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");
    this.level = new loadBackground(
      this.game,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.levelOne
    );
    this.map = this.level.formMap("Grass");
    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
  }

  update() {
    // Update logic goes here if needed
  }

  draw(ctx) {
    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        // If the current cell contains grass (value is 1), draw the grass tile
        if (this.map[i][j] === 1) {
          ctx.drawImage(
            this.spritesheet,
            0,
            0,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          // Adjust the destination x and y coordinates based on tile width and height
        }
      }
    }
  }
}

class Concrete {
  constructor(game, x, y, levelOne) {
    Object.assign(this, { game, x, y, levelOne });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");

    this.level = new loadBackground(
      this.game,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.levelOne
    );
    this.map = this.level.formMap("Grass");
    this.concreteFiller = [
      { x: 80, y: 208 },
      { x: 32, y: 192 },
      { x: 224, y: 144 },
    ];
    this.randomStone = this.getRandomTuple();

    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
  }

  update() {
    // Update logic goes here if needed
  }

  getRandomTuple() {
    // Generate a random index within the range of the array's length
    const randomIndex = Math.floor(Math.random() * this.concreteFiller.length);

    // Retrieve the object at the random index
    const randomObject = this.concreteFiller[randomIndex];

    // Return the x and y values from the random object as a tuple
    return { x: randomObject.x, y: randomObject.y };
  }

  draw(ctx) {
    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        // If the current cell contains grass (value is 1), draw the grass tile
        if (this.map[i][j] > 125 && this.map[i][j] < 248) {
          ctx.drawImage(
            this.spritesheet,
            this.randomStone.x,
            this.randomStone.y,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          // Adjust the destination x and y coordinates based on tile width and height
        }
      }
    }
  }
}

class Stairs {
  constructor(game, x, y, levelOne) {
    Object.assign(this, { game, x, y, levelOne });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stairs.png");
    this.level = new loadBackground(
      this.game,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.levelOne
    );
    this.map = this.level.formMap("Grass");
    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
  }

  update() {
    // Update logic goes here if needed
  }

  draw(ctx) {
    // Define tile mappings
    const tileMappings = {
      2633: { sourceX: 128, sourceY: 160 },
      2634: { sourceX: 144, sourceY: 160 },
      2635: { sourceX: 160, sourceY: 160 },
      2636: { sourceX: 176, sourceY: 160 },
      2665: { sourceX: 128, sourceY: 176 },
      2666: { sourceX: 144, sourceY: 176 },
      2667: { sourceX: 160, sourceY: 176 },
      2668: { sourceX: 176, sourceY: 176 },
      2697: { sourceX: 128, sourceY: 192 },
      2698: { sourceX: 144, sourceY: 192 },
      2699: { sourceX: 160, sourceY: 192 },
      2700: { sourceX: 176, sourceY: 192 },
      2729: { sourceX: 128, sourceY: 208 },
      2730: { sourceX: 144, sourceY: 208 },
      2731: { sourceX: 160, sourceY: 208 },
      2732: { sourceX: 176, sourceY: 208 },
      2761: { sourceX: 128, sourceY: 224 },
      2762: { sourceX: 144, sourceY: 224 },
      2763: { sourceX: 160, sourceY: 224 },
      2764: { sourceX: 176, sourceY: 224 },
      2793: { sourceX: 128, sourceY: 240 },
      2794: { sourceX: 144, sourceY: 240 },
      2795: { sourceX: 160, sourceY: 240 },
      2796: { sourceX: 176, sourceY: 240 },
      2371: { sourceX: 32, sourceY: 32 },
      2372: { sourceX: 48, sourceY: 32 },
      2373: { sourceX: 64, sourceY: 32 },
      2374: { sourceX: 80, sourceY: 32 },
      2403: { sourceX: 32, sourceY: 48 },
      2404: { sourceX: 48, sourceY: 48 },
      2405: { sourceX: 64, sourceY: 48 },
      2406: { sourceX: 80, sourceY: 48 },
      2435: { sourceX: 32, sourceY: 64 },
      2436: { sourceX: 48, sourceY: 64 },
      2437: { sourceX: 64, sourceY: 64 },
      2438: { sourceX: 80, sourceY: 64 },
      2467: { sourceX: 32, sourceY: 80 },
      2468: { sourceX: 48, sourceY: 80 },
      2469: { sourceX: 64, sourceY: 80 },
      2470: { sourceX: 80, sourceY: 80 },
      2499: { sourceX: 32, sourceY: 80 },
      2500: { sourceX: 48, sourceY: 80 },
      2501: { sourceX: 64, sourceY: 80 },
      2502: { sourceX: 80, sourceY: 80 },
      2531: { sourceX: 32, sourceY: 80 },
      2532: { sourceX: 48, sourceY: 80 },
      2533: { sourceX: 64, sourceY: 80 },
      2534: { sourceX: 80, sourceY: 80 },
    };

    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        const tileNumber = this.map[i][j];
        // Check if the tile number exists in tileMappings
        if (tileMappings.hasOwnProperty(tileNumber)) {
          const { sourceX, sourceY } = tileMappings[tileNumber];
          ctx.drawImage(
            this.spritesheet,
            sourceX,
            sourceY,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        }
      }
    }
  }
}

class LevelOneWalls {
  constructor(game, x, y, levelOne) {
    Object.assign(this, { game, x, y, levelOne });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/wall.png");
    this.level = new loadBackground(
      this.game,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.levelOne
    );
    this.map = this.level.formMap("Collision");
    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
    this.collisionBox = null;

    //this.collisionBox = { x: 0, y: 0, width: 0, height: 0 };
    this.tileMappings = {};
    this.loadTileMappings();
    this.updateBoundingBox(this.tileMappings);
  }

  update() {}

  updateBoundingBox(tileMappings) {
    // Clear the existing array of collision boxes
    this.collisionBoxes = [];

    // Iterate through the map to find positions of walls and create corresponding bounding boxes
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const tileNumber = this.map[i][j];
        if (tileMappings.hasOwnProperty(tileNumber)) {
          // Calculate the position of the wall
          const wallX = this.x + j * this.tileWidth * this.scale;
          const wallY = this.y + i * this.tileHeight * this.scale;
          // Create a new bounding box for the wall and add it to the array
          this.collisionBoxes.push(
            (this.collisionBox = new CollisionBox(
              this.game,
              wallX,
              wallY,
              this.tileWidth,
              this.tileHeight,
              this.scale
            ))
          );
          this.game.addEntity(this.collisionBox);
        }
      }
    }
  }

  loadTileMappings() {
    // Define tile mappings
    this.tileMappings = {
      // right side down corners
      328: { sourceX: 112, sourceY: 32 },
      360: { sourceX: 112, sourceY: 48 },
      392: { sourceX: 112, sourceY: 64 },
      424: { sourceX: 112, sourceY: 80 },
      456: { sourceX: 112, sourceY: 96 },

      // left side corners
      330: { sourceX: 144, sourceY: 32 },
      331: { sourceX: 160, sourceY: 32 },
      332: { sourceX: 176, sourceY: 32 },
      333: { sourceX: 192, sourceY: 32 },
      334: { sourceX: 208, sourceY: 32 },
      335: { sourceX: 80, sourceY: 96 },
      336: { sourceX: 96, sourceY: 96 },

      // wall pieces
      363: { sourceX: 160, sourceY: 48 },
      364: { sourceX: 176, sourceY: 48 },
      365: { sourceX: 192, sourceY: 48 },
      366: { sourceX: 202, sourceY: 48 },

      395: { sourceX: 160, sourceY: 64 },
      396: { sourceX: 176, sourceY: 64 },
      397: { sourceX: 192, sourceY: 64 },
      398: { sourceX: 202, sourceY: 64 },

      427: { sourceX: 160, sourceY: 80 },
      428: { sourceX: 176, sourceY: 80 },
      429: { sourceX: 192, sourceY: 80 },
      430: { sourceX: 202, sourceY: 80 },

      323: { sourceX: 32, sourceY: 32 },
      324: { sourceX: 48, sourceY: 32 },
      325: { sourceX: 48, sourceY: 32 },
      326: { sourceX: 48, sourceY: 32 },
      327: { sourceX: 48, sourceY: 32 },
      337: { sourceX: 256, sourceY: 32 },
      355: { sourceX: 32, sourceY: 48 },
      387: { sourceX: 32, sourceY: 48 },
      401: { sourceX: 256, sourceY: 48 },
      419: { sourceX: 32, sourceY: 48 },
      451: { sourceX: 32, sourceY: 96 },
      452: { sourceX: 48, sourceY: 96 },
      453: { sourceX: 64, sourceY: 96 },
      454: { sourceX: 80, sourceY: 96 },
      455: { sourceX: 96, sourceY: 96 },
      483: { sourceX: 32, sourceY: 112 },
      484: { sourceX: 48, sourceY: 112 },
      485: { sourceX: 64, sourceY: 112 },
      486: { sourceX: 80, sourceY: 112 },
      487: { sourceX: 96, sourceY: 112 },

      515: { sourceX: 32, sourceY: 128 },
      516: { sourceX: 48, sourceY: 128 },
      517: { sourceX: 64, sourceY: 128 },
      518: { sourceX: 80, sourceY: 128 },
      519: { sourceX: 96, sourceY: 128 },
      522: { sourceX: 144, sourceY: 128 },
      529: { sourceX: 256, sourceY: 128 },
      547: { sourceX: 32, sourceY: 144 },
      548: { sourceX: 48, sourceY: 144 },
      549: { sourceX: 64, sourceY: 144 },
      550: { sourceX: 80, sourceY: 144 },
      551: { sourceX: 96, sourceY: 144 },

      488: { sourceX: 112, sourceY: 112 },
      520: { sourceX: 112, sourceY: 128 },
      552: { sourceX: 112, sourceY: 144 },

      643: { sourceX: 46, sourceY: 96 },
      644: { sourceX: 64, sourceY: 96 },
      645: { sourceX: 80, sourceY: 96 },
      646: { sourceX: 96, sourceY: 96 },
      647: { sourceX: 96, sourceY: 96 },
      648: { sourceX: 64, sourceY: 96 },
      649: { sourceX: 80, sourceY: 96 },

      681: { sourceX: 64, sourceY: 112 },
      682: { sourceX: 80, sourceY: 112 },
      713: { sourceX: 64, sourceY: 128 },
      714: { sourceX: 80, sourceY: 128 },
      745: { sourceX: 64, sourceY: 144 },
      746: { sourceX: 80, sourceY: 144 },

      675: { sourceX: 48, sourceY: 112 },
      676: { sourceX: 64, sourceY: 112 },
      677: { sourceX: 80, sourceY: 112 },
      678: { sourceX: 96, sourceY: 112 },

      707: { sourceX: 48, sourceY: 128 },
      708: { sourceX: 64, sourceY: 128 },
      709: { sourceX: 80, sourceY: 128 },
      710: { sourceX: 96, sourceY: 128 },

      739: { sourceX: 48, sourceY: 144 },
      740: { sourceX: 64, sourceY: 144 },
      741: { sourceX: 80, sourceY: 144 },
      742: { sourceX: 96, sourceY: 144 },

      // windows
      653: { sourceX: 192, sourceY: 192 },
      654: { sourceX: 208, sourceY: 192 },
      650: { sourceX: 64, sourceY: 96 },
      679: { sourceX: 192, sourceY: 208 },
      680: { sourceX: 208, sourceY: 208 },

      711: { sourceX: 192, sourceY: 224 },
      712: { sourceX: 208, sourceY: 224 },

      743: { sourceX: 192, sourceY: 240 },
      744: { sourceX: 208, sourceY: 240 },
    };
  }

  draw(ctx) {
    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        const tileNumber = this.map[i][j];
        // Check if the tile number exists in tileMappings
        if (this.tileMappings.hasOwnProperty(tileNumber)) {
          const { sourceX, sourceY } = this.tileMappings[tileNumber];
          ctx.drawImage(
            this.spritesheet,
            sourceX,
            sourceY,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        }
      }
    }
  }
}

class LevelOneProps {
  constructor(game, x, y, levelOne) {
    Object.assign(this, { game, x, y, levelOne });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/props.png");
    this.treesSheet = ASSET_MANAGER.getAsset("./sprites/trees.png");
    this.level = new loadBackground(
      this.game,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.levelOne
    );
    this.map = this.level.formMap("Props");
    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
  }

  update() {
    // Update logic goes here if needed
  }

  draw(ctx) {
    const tileMappings = {
      // this set of 6 numbers is the 3x2 box
      1451: { sourceX: 160, sourceY: 80, theSheet: this.spritesheet },
      1452: { sourceX: 176, sourceY: 80, theSheet: this.spritesheet },
      1483: { sourceX: 160, sourceY: 96, theSheet: this.spritesheet },
      1484: { sourceX: 176, sourceY: 96, theSheet: this.spritesheet },
      1515: { sourceX: 160, sourceY: 112, theSheet: this.spritesheet },
      1516: { sourceX: 176, sourceY: 112, theSheet: this.spritesheet },
      1533: { sourceX: 448, sourceY: 112, theSheet: this.spritesheet },

      // this is the pillars around the statue
      1534: { sourceX: 464, sourceY: 112, theSheet: this.spritesheet },
      1565: { sourceX: 448, sourceY: 128, theSheet: this.spritesheet },
      1566: { sourceX: 464, sourceY: 128, theSheet: this.spritesheet },
      1597: { sourceX: 448, sourceY: 144, theSheet: this.spritesheet },
      1598: { sourceX: 464, sourceY: 144, theSheet: this.spritesheet },

      // statue
      1341: { sourceX: 448, sourceY: 16, theSheet: this.spritesheet },
      1342: { sourceX: 464, sourceY: 16, theSheet: this.spritesheet },
      1373: { sourceX: 448, sourceY: 32, theSheet: this.spritesheet },
      1374: { sourceX: 464, sourceY: 32, theSheet: this.spritesheet },
      1405: { sourceX: 448, sourceY: 48, theSheet: this.spritesheet },
      1406: { sourceX: 464, sourceY: 48, theSheet: this.spritesheet },
      1436: { sourceX: 432, sourceY: 64, theSheet: this.spritesheet },
      1437: { sourceX: 448, sourceY: 64, theSheet: this.spritesheet },
      1438: { sourceX: 464, sourceY: 64, theSheet: this.spritesheet },
      1439: { sourceX: 480, sourceY: 64, theSheet: this.spritesheet },
      1468: { sourceX: 432, sourceY: 80, theSheet: this.spritesheet },
      1469: { sourceX: 448, sourceY: 80, theSheet: this.spritesheet },
      1470: { sourceX: 464, sourceY: 80, theSheet: this.spritesheet },
      171: { sourceX: 480, sourceY: 80, theSheet: this.spritesheet },

      // stone brick
      2255: { sourceX: 224, sourceY: 480, theSheet: this.spritesheet },
      2256: { sourceX: 240, sourceY: 480, theSheet: this.spritesheet },
      2287: { sourceX: 224, sourceY: 496, theSheet: this.spritesheet },
      2288: { sourceX: 240, sourceY: 496, theSheet: this.spritesheet },

      // broken well
      2011: { sourceX: 416, sourceY: 352, theSheet: this.spritesheet },
      2012: { sourceX: 432, sourceY: 352, theSheet: this.spritesheet },
      2013: { sourceX: 448, sourceY: 352, theSheet: this.spritesheet },
      2014: { sourceX: 464, sourceY: 352, theSheet: this.spritesheet },
      2043: { sourceX: 416, sourceY: 368, theSheet: this.spritesheet },
      2044: { sourceX: 432, sourceY: 368, theSheet: this.spritesheet },
      2045: { sourceX: 448, sourceY: 368, theSheet: this.spritesheet },
      2046: { sourceX: 464, sourceY: 368, theSheet: this.spritesheet },
      2075: { sourceX: 416, sourceY: 384, theSheet: this.spritesheet },
      2076: { sourceX: 432, sourceY: 384, theSheet: this.spritesheet },
      2077: { sourceX: 448, sourceY: 384, theSheet: this.spritesheet },
      2078: { sourceX: 464, sourceY: 384, theSheet: this.spritesheet },
      2107: { sourceX: 416, sourceY: 400, theSheet: this.spritesheet },
      2108: { sourceX: 432, sourceY: 400, theSheet: this.spritesheet },
      2109: { sourceX: 448, sourceY: 400, theSheet: this.spritesheet },
      2110: { sourceX: 464, sourceY: 400, theSheet: this.spritesheet },

      // 2x4 stone pillar

      // fuller 2x2 bush
      3719: { sourceX: 96, sourceY: 192, theSheet: this.treesSheet },
      3720: { sourceX: 112, sourceY: 192, theSheet: this.treesSheet },
      3751: { sourceX: 96, sourceY: 208, theSheet: this.treesSheet },
      3752: { sourceX: 112, sourceY: 208, theSheet: this.treesSheet },

      // ---------------------------------------------------------------
      // 3rd tree from png (drawing from the bottom up)
      3637: { sourceX: 320, sourceY: 144, theSheet: this.treesSheet },
      3605: { sourceX: 320, sourceY: 128, theSheet: this.treesSheet },
      3606: { sourceX: 336, sourceY: 128, theSheet: this.treesSheet },

      //3720: {sourceX: 304, sourceY: 112, theSheet: this.treesSheet},
      3573: { sourceX: 320, sourceY: 112, theSheet: this.treesSheet },
      3574: { sourceX: 336, sourceY: 112, theSheet: this.treesSheet },
      3575: { sourceX: 352, sourceY: 112, theSheet: this.treesSheet },

      3539: { sourceX: 288, sourceY: 96, theSheet: this.treesSheet },
      3540: { sourceX: 304, sourceY: 96, theSheet: this.treesSheet },
      3541: { sourceX: 320, sourceY: 96, theSheet: this.treesSheet },
      3542: { sourceX: 336, sourceY: 96, theSheet: this.treesSheet },
      3543: { sourceX: 352, sourceY: 96, theSheet: this.treesSheet },
      3544: { sourceX: 368, sourceY: 96, theSheet: this.treesSheet },

      3507: { sourceX: 288, sourceY: 80, theSheet: this.treesSheet },
      3508: { sourceX: 304, sourceY: 80, theSheet: this.treesSheet },
      3509: { sourceX: 320, sourceY: 80, theSheet: this.treesSheet },
      3510: { sourceX: 336, sourceY: 80, theSheet: this.treesSheet },
      3511: { sourceX: 352, sourceY: 80, theSheet: this.treesSheet },
      3512: { sourceX: 368, sourceY: 80, theSheet: this.treesSheet },

      3475: { sourceX: 288, sourceY: 64, theSheet: this.treesSheet },
      3476: { sourceX: 304, sourceY: 64, theSheet: this.treesSheet },
      3477: { sourceX: 320, sourceY: 64, theSheet: this.treesSheet },
      3478: { sourceX: 336, sourceY: 64, theSheet: this.treesSheet },
      3479: { sourceX: 352, sourceY: 64, theSheet: this.treesSheet },
      3480: { sourceX: 368, sourceY: 64, theSheet: this.treesSheet },

      3444: { sourceX: 304, sourceY: 48, theSheet: this.treesSheet },
      3445: { sourceX: 320, sourceY: 48, theSheet: this.treesSheet },
      3446: { sourceX: 336, sourceY: 48, theSheet: this.treesSheet },
      3447: { sourceX: 352, sourceY: 48, theSheet: this.treesSheet },

      3412: { sourceX: 304, sourceY: 32, theSheet: this.treesSheet },
      3413: { sourceX: 320, sourceY: 32, theSheet: this.treesSheet },
      3414: { sourceX: 336, sourceY: 32, theSheet: this.treesSheet },
      3415: { sourceX: 352, sourceY: 32, theSheet: this.treesSheet },
      3381: { sourceX: 320, sourceY: 16, theSheet: this.treesSheet },
      //------------------------------------------------------------------
    };

    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        const tileNumber = this.map[i][j];
        // Check if the tile number exists in tileMappings
        if (tileMappings.hasOwnProperty(tileNumber)) {
          const { sourceX, sourceY, theSheet } = tileMappings[tileNumber];
          ctx.drawImage(
            theSheet,
            sourceX,
            sourceY,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        }
      }
    }
  }
}

class loadBackground {
  constructor(game, x, y, level) {
    Object.assign(this, { game, x, y, level });

    this.belowData = this.level.world[0].below;
    this.collisionData = this.level.world[1].collision;
    this.props = this.level.world[2].props;
    this.rowWidth = 80;
    this.numCol = Math.ceil(this.belowData.length / this.rowWidth);
    //this.map = Array.from({length: this.rowWidth}, () => Array(this.numCol).fill(null));
  }

  formMap(stringDet) {
    // // Clear the map array if needed
    // this.map = [];

    // // Calculate the number of rows
    // const numRows = 80; //Math.ceil(this.belowData.length / this.rowWidth);

    // // Populate the map array with the elements from belowData
    // let dataIndex = 0;
    // for (let i = 0; i < numRows; i++) {
    //     this.map.push([]);
    //     for (let j = 0; j < this.rowWidth; j++) {
    //         if (dataIndex < this.belowData.length) {
    //             this.map[i].push([this.belowData[dataIndex]]);
    //             dataIndex++;
    //         } else {
    //             // If dataIndex exceeds belowData.length, break out of the loop
    //             break;
    //         }
    //     }
    // }

    // return this.map;
    // Your 1D array of size 80x80

    // Dimensions of the desired 2D array
    let numRows = 80;
    let numCols = 80;
    //let index =  i * numCols + j;

    // Initialize an empty 2D array
    let twoDArray = [];

    for (let i = 0; i < numRows; i++) {
      // y
      let row = [];
      for (let j = 0; j < numCols; j++) {
        //x
        // Calculate the index in the 1D array corresponding to the current row and column
        let index = i * numCols + j;

        if (stringDet == "Grass") {
          // Add the element from the 1D array to the current row
          row.push(this.belowData[index]);
        } else if (stringDet == "Collision") {
          // Add the element from the 1D array to the current row using the collision data
          row.push(this.collisionData[index]);
        } else {
          row.push(this.props[index]);
        }
      }

      // Add the row to the 2D array
      twoDArray.push(row);
    }

    // Populate the 2D array from the 1D array

    return twoDArray;
  }
}

class CollisionBox {
  constructor(game, x, y, width, height, scale) {
    Object.assign(this, { game, x, y, width, height, scale });
    this.BoundingBox = new BoundingBox(
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale
    );
  }

  update() {}

  draw(ctx) {
    if (PARAMS.DEBUG) {
      // Draw the bounding box
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.BoundingBox.x - this.game.camera.x - this.game.camera.midpointX,
        this.BoundingBox.y - this.game.camera.y - this.game.camera.midpointY,
        this.BoundingBox.width,
        this.BoundingBox.height
      );
    }
  }
}
