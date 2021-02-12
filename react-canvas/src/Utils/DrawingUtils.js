/**
 * Lines common to all
 * @param {*} ctx 
 * @param {*} path 
 * @param {*} strokeScale 
 */
function drawCommonAll(ctx, path, strokeScale) {
    console.log(path);
    ctx.strokeStyle = path[1];
    ctx.lineWidth = path[2] * strokeScale;
    ctx.beginPath();
}

/**
 * Code common to drawPath and drawPolygon
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} path 
 */
function drawPathCommon(ctx, width, height, path, strokeScale) {
    drawCommonAll(ctx, path, strokeScale);
    ctx.moveTo(path[3][0] * width, path[3][1] * height);
    for (let i = 4; i < path.length; i++) {
        ctx.lineTo(path[i][0] * width, path[i][1] * height);
    }
}

/**
 * Draws a single path
 * @param {*} ctx 2d drawing context
 * @param {*} path the path to draw ["path", color, size, start, additional points]
 */
export function drawPath(ctx, width, height, path, strokeScale = 1) {
    drawPathCommon(ctx, width, height, path, strokeScale);
    ctx.stroke();
    console.log('done path');
}

export function drawPolygon(ctx, width, height, path, strokeScale = 1) {
    drawPathCommon(ctx, width, height, path, strokeScale);
    ctx.closePath();
    ctx.stroke();
}

export function drawRectangle(ctx, width, height, path, strokeScale = 1) {
    console.log('start rect');
    drawCommonAll(ctx, path, strokeScale);
    const x = path[3][0] * width;
    const y = path[3][1] * height;
    const w = path[4][0] * width - x;
    const h = path[4][1] * height - y;
    ctx.rect(x, y, w, h);
    ctx.stroke();
    console.log('done rect');
}

/**
 * Draws all paths of a given layer
 * @param {*} ctx 
 * @param {*} paths 
 * @param {*} width 
 * @param {*} height 
 */
export function drawLayer(ctx, paths, width, height, strokeScale = 1) {
    ctx.clearRect(0, 0, width, height);
    paths.forEach((value) => {
        switch (value[0]) {
            case("Brush"):
                drawPath(ctx, width, height, value, strokeScale);
                break;
            case("Polygon"):
                drawPolygon(ctx, width, height, value, strokeScale);
                break;
            case("Rectangle"):
                drawRectangle(ctx, width, height, value, strokeScale);
                break;
            default:
                console.error("undefined thingy");
        }
    });
}
