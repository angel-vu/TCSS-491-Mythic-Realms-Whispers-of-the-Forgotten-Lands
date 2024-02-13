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
    this.map = this.level.formMap();
    this.tileWidth = 16; // Width of each tile
    this.tileHeight = 16; // Height of each tile
    this.scale = 3;
  }

  update() {
    // Update logic goes here if needed
  }

  draw(ctx) {
    // Loop through each row and column in the map
    for (let i = 0; i < this.map.length; i++) {// y's rows
      for (let j = 0; j < this.map[i].length; j++) { // x's columns
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
  };
}

class loadBackground {
  constructor(game, x, y, level) {
    Object.assign(this, { game, x, y, level });

    this.belowData = this.level.grass[0].below;
    this.rowWidth = 80;
    this.numCol = Math.ceil(this.belowData.length / this.rowWidth);
    //this.map = Array.from({length: this.rowWidth}, () => Array(this.numCol).fill(null));
  }

  formMap() {
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

    // Populate the 2D array from the 1D array
    for (let i = 0; i < numRows; i++) { // y
      let row = [];
      for (let j = 0; j < numCols; j++) {//x
        // Calculate the index in the 1D array corresponding to the current row and column
        let index = i * numCols + j;

        // Add the element from the 1D array to the current row
        row.push(this.belowData[index]);
        //index++;
      }

      // Add the row to the 2D array
      twoDArray.push(row);
    }
    return twoDArray;
  }
}
