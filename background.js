class Ground {
    constructor(game, x, y, levelOne) {
        Object.assign(this, {game, x, y, levelOne});

        // Load the grass tile image from the tileset
        this.spritesheet = ASSET_MANAGER.getAsset(levelOne.tilesetImage);


    };

    update() {
        
    };

    draw(ctx) {
        const tileSize = 16; // 16x16 pixels

        for (let i = 0; i < this.levelOne.ground[0].data.length; i++) {
            const tile = this.levelOne.ground[0].data[i];

            if (tile === 1) { // 1 represents grass tile
                const row = Math.floor(i / 80); // Calculate row index
                const col = i % 80; // Calculate column index

                const drawX = this.x + col * tileSize; // Calculate x position to draw
                const drawY = this.y + row * tileSize; // Calculate y position to draw

                ctx.drawImage(this.spritesheet, 0, 0, tileSize, tileSize, drawX - this.game.camera.x, drawY - this.game.camera.y , tileSize, tileSize);
            }
        }
    };  
}













