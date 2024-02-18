class HealthBar {
    constructor(agent) {
        Object.assign(this, { agent });
        this.xOffset = this.agent.maxHealth * 10;
    };

    update() {
       
    };

    draw(ctx) {
            var ratio = this.agent.currentHealth / this.agent.maxHealth;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            ctx.fillRect(this.agent.x - this.agent.game.camera.x, this.agent.y - this.agent.game.camera.y, this.xOffset * ratio, 4);
            ctx.strokeRect(this.agent.x - this.agent.game.camera.x, this.agent.y - this.agent.game.camera.y, this.xOffset, 4);
    };
};

class Score {
    constructor(game, x, y, score) {
        Object.assign(this, { game, x, y, score });

        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;

        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        var offset = this.score < 10 ? 6 : 12;
        ctx.font = '12px "Press Start 2P"';
        ctx.fillStyle = "Black";
        ctx.fillText(this.score, this.x - offset + 1 - this.agent.game.camera.x, this.y + 1 - this.agent.game.camera.y);
        ctx.fillStyle = rgb(183, 3, 3);
        ctx.fillText(this.score, this.x - offset - this.agent.game.camera.x, this.y - this.agent.game.camera.y);
    };
};