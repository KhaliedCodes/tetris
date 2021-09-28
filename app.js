const width = 400
const height = 800
let gameover = false
const shapes = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape]
let grid = new Array(width / 40).fill(false).map(() => new Array(height / 40).fill(false));


const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xffffff,
    resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);
//console.log(app.view)



let liner = new PIXI.Graphics()
app.stage.addChild(liner);

function line(x1, y1, x2, y2, width = 5, color = 0x000000, opacity = 1) {


    liner.lineStyle(width, color, opacity)
    liner.moveTo(x1, y1)
    liner.lineTo(x2, y2)

}

function gridDraw() {

    for (i = 0; i <= width; i += 40) {

        line(i, 0, i, height, 5, 0x888888, 0.5)
            //line.moveTo(i, 0)
            //line.lineTo(i, height)

        for (j = 0; j <= height; j += 40) {
            line(0, j, width, j, 5, 0x888888, 0.1)

            //line.moveTo(0, j)
            //line.lineTo(width, j)
        }
    }
    line(0, 0, width, 0, 7)
    line(0, 0, 0, height, 7)
    line(0, height, width, height, 7)
    line(width, 0, width, height, 7)

}


gridDraw()



//let block = new Block(200, 400, 0x00ff00);



let shape = new shapes[Math.floor(Math.random(shapes.length) * shapes.length)](180, -20, Math.random() * 16777215)
let clone = new shape.constructor(shape.x, -20, 0x888888)
app.stage.swapChildren(shape, clone)
    //shape.mask = clone
    // for (let b of shape.blocks) {
    //     blocks.push(b)
    // }
    //blocks.push(shape)


function linesCheck() {
    counter = 0
    lines = []
        //console.log(grid)
    for (let c = 19; c >= 0; c--) {
        for (let r = 9; r >= 0; r--) {
            if (grid[r][c]) {
                counter++
            }
            //console.log(counter)
        }
        //console.log(counter)
        if (counter == 0)
            break
        else if (counter == 10) {
            lines.push(c * 40)

        }
        counter = 0
    }
    //console.log(lines)
    return lines
}

function linesClear(lines) {


    for (let clear of lines.reverse()) {
        gridDrawer.clear()
        for (let r = 0; r < 10; r++) {
            grid[r][clear / 40] = false

        }


        for (let r = 0; r < 10; r++) {
            for (let c = (clear / 40) - 1; c >= 0; c--) {
                if (grid[r][c]) {
                    // b = new Block((r + 20) * 40, (c + 1 + 20) * 40, 0x00ff00)
                    // blocks = []
                    // blocks.push(b)
                    // b.draw()
                    // app.stage.addChild(b)

                    grid[r][c] = false
                    grid[r][c + 1] = true
                        //console.log(c)
                        //console.log(b.y)



                }
            }
        }
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 20; c++) {
                if (grid[r][c]) {
                    // b = new Block((r + 20) * 40, (c + 1 + 20) * 40, 0x00ff00)
                    // blocks = []
                    // blocks.push(b)
                    // b.draw()
                    // app.stage.addChild(b)


                    rectDraw((r * 40), (c * 40))
                        //console.log(c)
                        //console.log(b.y)



                }
            }
        }



    }
}

function leftWall(Lshape = shape) {
    for (let b of Lshape.children) {
        if (b.getGlobalPosition().x <= 20) {
            return false
        }
    }
    return true
}

function rightWall(Lshape = shape) {
    for (let b of Lshape.children) {
        if (b.getGlobalPosition().x >= width - 40) {
            return false
        }
    }
    return true
}

function grounded(Lshape = shape) {
    for (let b of Lshape.children) {
        //console.log()
        if (b.getGlobalPosition().y >= height - 20) {

            return true
        }
    }
    return false
}

function land(Lshape = shape) {

    for (let b of Lshape.children) {

        try {
            if (grid[Math.round((b.getGlobalPosition().x - 20) / 40)][Math.round((b.getGlobalPosition().y - 20 + 40) / 40)]) {
                //
                return true
            }
        } catch {
            return false
        }
    }
    return false
}

function ghost() {
    clone.x = shape.x
    clone.y = shape.y
        //console.log(clone)
    for (let y = 0; y < 800; y++) {
        if (land(clone) || grounded(clone)) {
            //clone.drawGhost(clone.x, clone.y)
            clone.drawGhost()
            break
        } else {
            clone.moveDown()
        }
    }
}

function rightSide(Lshape = shape) {
    for (let b of Lshape.children) {

        try {
            if (grid[(b.getGlobalPosition().x - 20) / 40][(b.getGlobalPosition().y - 20) / 40] &&
                b.getGlobalPosition().x > Lshape.blockr.x) {
                Lshape.moveLeft()
                    //console.log("I was pushed to the left")
            }
            if (grid[(b.getGlobalPosition().x - 20 + 40) / 40][(b.getGlobalPosition().y - 20) / 40]) {
                return false
            }

        } catch {
            return true
        }

    }
    return true
}

function leftSide(Lshape = shape) {
    for (let b of Lshape.children) {

        try {
            if (grid[(b.getGlobalPosition().x - 20) / 40][(b.getGlobalPosition().y - 20) / 40] &&
                b.getGlobalPosition().x < Lshape.blockr.x) {
                Lshape.moveRight()
                    //console.log("I was pushed to the right")
            }
            if (grid[(b.getGlobalPosition().x - 20 - 40) / 40][(b.getGlobalPosition().y - 20) / 40]) {
                return false
            }

        } catch {
            return true
        }

    }
    return true
}

function outsideRightWall(Lshape = shape) {
    for (let b of Lshape.children) {
        if (b.getGlobalPosition().x > width - 40) {
            Lshape.moveLeft()
            clone.moveLeft()
        }
    }
}

function outsideLeftWall(Lshape = shape) {
    for (let b of Lshape.children) {
        if (b.getGlobalPosition().x < 0) {
            Lshape.moveRight()
            clone.moveRight()
        }
    }
}

shape.hitArea = app.screen
shape.interactive = true
    //console.log(shape.interactive)


var ongoingTouches = [];

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1; // not found
}

function copyTouch({
    identifier,
    pageX,
    pageY
}) {
    return {
        identifier,
        pageX,
        pageY
    };
}

let prevPageX
let prevPageY
let touchCounterX = 0
let touchCounterY = 0

function handleStart(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        prevPageX = touches[i].pageX
        prevPageY = touches[i].pageY
        ongoingTouches.push(copyTouch(touches[i]));
    }
}


function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            //console.log(ongoingTouches)
            //TODO INSERT MOVE

            console.log(ongoingTouches[idx].pageX, prevPageX + 30)
            if (touchCounterX > 100 && rightWall() && rightSide()) {
                shape.moveRight()
                clone.moveRight()
                ghost()
                touchCounterX = 0

            } else if (touchCounterX < -100 && leftWall() && leftSide()) {
                shape.moveLeft()
                clone.moveLeft()

                ghost()
                touchCounterX = 0
            }
            if (touchCounterY > 100 && !land() && !grounded()) {
                shape.moveDown()
                touchCounterY = 0
            }
            touchCounterX += ongoingTouches[idx].pageX - prevPageX
            touchCounterY += ongoingTouches[idx].pageY - prevPageY
            prevPageX = ongoingTouches[idx].pageX
            prevPageY = ongoingTouches[idx].pageY
            ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
            //console.log(".");
        } else {
            console.log("can't figure out which touch to continue");
        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            //TOTO INSERT MOVE
            ongoingTouches.splice(idx, 1); // remove it; we're done
        } else {
            console.log("can't figure out which touch to end");
        }
    }
}



document.addEventListener("touchstart", handleStart, false);
document.addEventListener("touchend", handleEnd, false);
//el.addEventListener("touchcancel", handleCancel, false);
document.addEventListener("touchmove", handleMove, false);



document.addEventListener('keydown', function(event) {
    event.preventDefault();
    switch (event.keyCode) {
        case (37):
            if (leftWall() && leftSide()) {
                shape.moveLeft()
                clone.moveLeft()

                ghost()
            }

            break;
        case (39):
            if (rightWall() && rightSide()) {
                shape.moveRight()
                clone.moveRight()
                ghost()
            }

            break;
        case (38):
            shape.rotateRight()
            clone.rotateRight()
            outsideLeftWall()
            outsideRightWall()
            leftSide()
            rightSide()
            ghost()

            break;
        case (40):
            if (!land() && !grounded())
                shape.moveDown()

            break;
        case (32):
            shape.x = clone.x;
            shape.y = clone.y;
            break;
        default:
            return;


    }

});

let gridDrawer = new PIXI.Graphics()
app.stage.addChild(gridDrawer)

function rectDraw(x, y) {
    gridDrawer.lineStyle(2)
    gridDrawer.beginFill(shape.color)
    gridDrawer.drawRect(x, y, 40, 40)
    gridDrawer.endFill();
}




let counter = 0
app.ticker.add((delta) => {
    counter += delta
        //console.log(delta)
    if (!gameover && counter > 30) {
        ghost()
        shape.draw()


        if (!grounded() && !land()) {
            shape.moveDown()
        } else {
            //console.log(shape.children)
            for (let b of shape.children) {
                //console.log(b.x)
                if ((b.getGlobalPosition().y + 20) <= 0) {
                    gameover = true
                }
                grid[Math.round((b.getGlobalPosition().x - 20)) / 40][Math.round((b.getGlobalPosition().y - 20)) / 40] = true
                rectDraw(b.getGlobalPosition().x - 20, b.getGlobalPosition().y - 20)
                    //console.log("how many?")
                    //console.log(b.getGlobalPosition().x)
                    //nb = new Block(b.getGlobalPosition().x, b.getGlobalPosition().y, shape.color)
                    //console.log(nb.x)
                    //nb.draw()
                    //app.stage.addChild(nb)



                // gridDrawer.draw(b.getGlobalPosition().x, b.getGlobalPosition().y, shape.color)
                // app.stage.addChild(gridDrawer)
                // console.log(gridDrawer.x)
                //blocks.push(nb)
                //console.log(blocks[0].x)
            }
            // for (let x = 0; x < 10; x++) {
            //     for (let y = 0; y < 20; y++) {
            //         if (grid[x][y]) {

            //             console.log(blocks.length)
            //         }
            //     }
            // }


            //linesClear(linesCheck())

            clone.destroy()
            shape.destroy()
            linesClear(linesCheck())
            shape = new shapes[Math.floor(Math.random(shapes.length) * shapes.length)](180, -20, Math.random() * 16777215)
            clone = new shape.constructor(shape.x, -20, 0x888888)

            // for (let b of shape.blocks) {
            //     blocks.push(b)
            // }
            //blocks.push(shape)
            app.stage.swapChildren(shape, clone)
                //land = true
        }
        counter = 0
    }

    //tshape.rotateRight()
    //block.draw()

});