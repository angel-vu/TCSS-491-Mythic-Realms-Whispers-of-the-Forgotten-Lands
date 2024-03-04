// class Coin {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.coin = this;

//         this.x = Math.random() * 1024; // randoom initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coins.png")
//         this.animation = new Animator(this.spritesheet, 0, 0, 195, 195, 6, 1, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the coin at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
//     };
// }

// class HealthPotion {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.healthPotion = this;

//         this.x = Math.random() * 1024; // randoom initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/potions.png")
//         this.animation = new Animator(this.spritesheet, 20, 620, 240, 260, 4, 1, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the potion at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
//     };
// }

class HealthPotion {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        
        this.game.healthPotion = this;

        this.scale = 0.2;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/potions.png");
        this.animation = new Animator(this.spritesheet, 743, 620, 240, 260, 1, 0.5, 0, false, true);

        // Define bounding box for collision detection
        this.BB = new BoundingBox(x, y, this.animation.width * this.scale, this.animation.height * this.scale);
    }

    // Function to check collision with another entity (e.g., Link)
    collidesWith(entity) {
        return this.BB.collide(entity.BB);
    }

    update() {
        
    }

    draw(ctx) {
        // Draw the potion at its current position
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            // Draw bounding box 
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}


// class Potion2 {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.potion = this;

//         this.x = Math.random() * 1024; // randoom initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset("./potion.png")
//         this.animation = new Animator(this.spritesheet, 0, 275, 250, 485, 4, 0.3, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the coin at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
//     };
// }
// class PowerPotion {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.powerPotion = this;

//         this.x = Math.random() * 1024; // randoom initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/potion.png")
//         this.animation = new Animator(this.spritesheet, 20, 65, 238, 700, 4, 1, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the potion at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
//     };
// }

// class InvisiblePotion {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.invisiblePotion = this;

//         this.x = Math.random() * 1024; // random initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/potions.png")
//         this.animation = new Animator(this.spritesheet, 0, 45, 250, 290, 4, 1, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the potion at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
//     };
// }

// class Treasure {
//     constructor(game) {
//         Object.assign(this, { game });
        
//         this.game.treasure = this;

//         this.x = Math.random() * 1024; // random initial x position
//         this.y = Math.random() * 768; // random initial y position

//         this.spritesheet = ASSET_MANAGER.getAsset(".sprites/treasure.png")
//         this.animation = new Animator(this.spritesheet, 15, 0, 110, 125, 10, 1, 0, false, true);
//     };

//     update() {
//         // reappear in random locations
//         if (Math.random() < 0.05) {
//             this.x = Math.random() * 1024;
//             this.y = Math.random() * 768;
//         }
//     };

//     draw(ctx) {
//         // Draw the potion at its current position
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
//     };
// }

