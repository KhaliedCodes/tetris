class LShape extends Shape {
    constructor(x, y, color) {
        super(x, y, color)
        this.block1.y -= 40
        this.block2.y += 40
        this.block3.y += 40
        this.block3.x += 40
        this.pivot.x = this.blockr.x
        this.pivot.y = this.blockr.y
    }






}