class IShape extends Shape {
    constructor(x, y, color) {
        super(x, y, color)
        this.block1.y -= 80
        this.block2.y -= 40
        this.block3.y += 40
        this.pivot.x = this.blockr.x + 20
        this.pivot.y = this.blockr.y - 20
        this.x += 20
        this.y += 20

    }






}