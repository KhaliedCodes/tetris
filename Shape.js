class Shape extends PIXI.Container {

    constructor(x, y, color) {
        super()
        this.color = color
        this.x = x
        this.y = y
        this.blockr = new Block(0, 0, this.color)
        this.block1 = new Block(0, 0, this.color)
        this.block2 = new Block(0, 0, this.color)
        this.block3 = new Block(0, 0, this.color)
        this.addChild(this.block1, this.block2, this.block3, this.blockr)
        app.stage.addChild(this)
    }

    draw() {
        this.blockr.draw()
        this.block1.draw()
        this.block2.draw()
        this.block3.draw()


    }

    drawGhost(x, y, color = 0x888888, linestyle = 0.69) {
        this.blockr.draw(x, y, color, linestyle)
        this.block1.draw(x, y, color, linestyle)
        this.block2.draw(x, y, color, linestyle)
        this.block3.draw(x, y, color, linestyle)
    }
    rotateRight() {
        this.angle += 90
    }

    rotateLeft() {
        this.angle -= 90
    }


    moveRight() {
        this.x += 40
    }

    moveLeft() {
        this.x -= 40

    }
    moveDown() {
        this.y += 40
    }
}