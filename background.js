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
    this.scale = 1;
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
    this.scale = 1;
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
    this.scale = 1;
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
    this.scale = 1;
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
        if (this.map[i][j] > 322 && this.map[i][j] < 326) {
          ctx.drawImage(
            this.spritesheet,
            64,
            32,
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

class levelOneProps {
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
    this.scale = 1;
  }

  update() {
    // Update logic goes here if needed
  }

  draw(ctx) {
    const tileMappings = {
      1451: { sourceX: 160, sourceY: 80 },
      1452: { sourceX: 176, sourceY: 80 },
      1483: { sourceX: 160, sourceY: 96},
      1484: { sourceX: 176, sourceY: 96},
      1515: { sourceX: 160, sourceY: 112},
      1516: {sourceX: 176, sourceY: 112}, // this set of 6 numbers is the 3x2 box
      1533: {sourceX:448, sourceY: 112},
      1534: {sourceX: 464, sourceY: 112},
      1565: {sourceX: 448, sourceY: 128},
      1566: {sourceX: 464, sourceY: 128},
      1597: {sourceX: 448, sourceY: 144},
      1598: {sourceX: 464, sourceY: 144}, // this is the pillars around the statue
    };
    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {
      // y's rows
      for (let j = 0; j < this.map[i].length; j++) {
        // x's columns
        const drawX = this.x + j * this.tileWidth * this.scale; // column
        const drawY = this.y + i * this.tileWidth * this.scale; // row
        // If the current cell contains grass (value is 1), draw the grass tile
        if (this.map[i][j] === 1813) {
          ctx.drawImage(
            this.spritesheet,
            384,
            288,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          ctx.drawImage(
            this.spritesheet,
            320,
            256,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        } else if (this.map[i][j] === 1814) {
          ctx.drawImage(
            this.spritesheet,
            400,
            288,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          ctx.drawImage(
            this.spritesheet,
            336,
            256,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        } else if (this.map[i][j] === 1845) {
          ctx.drawImage(
            this.spritesheet,
            384,
            304,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          ctx.drawImage(
            this.spritesheet,
            320,
            272,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        } else if (this.map[i][j] === 1846) {
          ctx.drawImage(
            this.spritesheet,
            400,
            304,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
          ctx.drawImage(
            this.spritesheet,
            336,
            272,
            this.tileWidth,
            this.tileHeight,
            drawX - this.game.camera.x - this.game.camera.midpointX,
            drawY - this.game.camera.y - this.game.camera.midpointY,
            this.tileWidth * this.scale,
            this.tileHeight * this.scale
          );
        } else {
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
