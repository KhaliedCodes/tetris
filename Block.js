size = { w: 40, h: 40 }
class Block extends PIXI.Graphics {

    constructor(x, y, color) {
        super()

        this.xpos = x
        this.ypos = y
        this.x = x
        this.y = y
        this.pivot.x = x + size.w / 2
        this.pivot.y = y + size.h / 2
        this.color = color
    }

    draw(x = this.xpos, y = this.ypos, color = this.color, lineStyle = 1) {
        this.clear()
        this.lineStyle(2)
        this.beginFill(color)
        this.alpha = lineStyle
        this.drawRect(x, y, size.w, size.h)
            //this.x = x
            //this.y = y
        this.endFill();
        //app.stage.addChild(this);

    }

    moveRight() {
        this.y += 40
    }

    moveLeft() {
        this.x -= 40

    }

    moveDown() {

        this.y += 40
    }
}