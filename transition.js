class TransitionScreen {
    constructor(game, level, x, y, title, gameOver, gameWin) {
        Object.assign(this, { game, level, x, y, title, gameOver, gameWin });

        this.elapsed = 0;
        this.gameOverImage = new Image();
        this.gameOverImage.src = "./sprites/fantasyrealm.png";
        this.gameWinImage = new Image();
        this.gameWinImage.src = "./sprites/fantasyrealm.png";
    };

    update() {
        // this.elapsed += this.game.clockTick;

        // if (this.elapsed > 2) this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver, this.gameWin);
    };

    draw(ctx) {
        ctx.font = "48px Arial";

        if (this.gameOver) {
            // ctx.fillStyle = "Black";
            // ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.drawImage(this.gameOverImage, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.fillStyle = "Red";
            ctx.fillText("GAME OVER", PARAMS.CANVAS_WIDTH / 3, PARAMS.CANVAS_HEIGHT / 2);
        }

        if (this.gameWin) {
            // ctx.fillStyle = "PINK";
            // ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.drawImage(this.gameOverImage, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.fillStyle = "RED";
            ctx.fillText("YOU WIN!", PARAMS.CANVAS_WIDTH / 3, PARAMS.CANVAS_HEIGHT / 2);
        }
    };

    drawMinimap() {

    };
};