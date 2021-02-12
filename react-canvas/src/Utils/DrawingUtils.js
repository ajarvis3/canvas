/**
 * Lines common to all
 * @param {*} ctx 
 * @param {*} path 
 * @param {*} strokeScale 
 */
function drawCommonAll(ctx, path, strokeScale) {
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
}

/**
 * Draws a closed shape
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} path 
 * @param {*} strokeScale 
 */
export function drawPolygon(ctx, width, height, path, strokeScale = 1) {
    drawPathCommon(ctx, width, height, path, strokeScale);
    ctx.closePath();
    ctx.stroke();
}

/**
 * Draws a rectangle
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} path 
 * @param {*} strokeScale 
 */
export function drawRectangle(ctx, width, height, path, strokeScale = 1) {
    drawCommonAll(ctx, path, strokeScale);
    const x = path[3][0] * width;
    const y = path[3][1] * height;
    const w = path[4][0] * width - x;
    const h = path[4][1] * height - y;
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

/**
 * Draws an ellipse
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} path 
 * @param {*} strokeScale 
 */
export function drawEllipse(ctx, width, height, path, strokeScale = 1) {
    drawCommonAll(ctx, path, strokeScale);
    const w = (path[4][0] * width - path[3][0] * width) / 2;
    const h = (path[4][1] * height - path[3][1] * height) / 2;
    const x = path[3][0] * width + w;
    const y = path[3][1] * height + h;
    // always draws an unrotated ellipse
    ctx.ellipse(x, y, Math.abs(w), Math.abs(h), 0, 0, 2 * Math.PI);
    ctx.stroke();
}

/**
 * Draws a single item
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} value 
 * @param {*} strokeScale 
 */
export function drawItem(ctx, width, height, value, strokeScale = 1) {
    if (value.length === 0) return;
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
        case("Ellipse"):
            drawEllipse(ctx, width, height, value, strokeScale);
            break;
        default:
            console.error("undefined thingy");
    }
}

/**
 * Draws all paths of a given layer
 * @param {*} ctx 
 * @param {*} paths 
 * @param {*} width 
 * @param {*} height 
 */
export function drawLayer(ctx, paths, width, height, strokeScale = 1) {
    if (paths.length === 0) return;
    paths.forEach((value) => {
        drawItem(ctx, width, height, value, strokeScale);
    });
}

/**
 * Draws all layers of a canvas
 * @param {*} ctx 
 * @param {*} paths 
 * @param {*} width 
 * @param {*} height 
 * @param {*} strokeScale 
 */
export function drawCanvas(ctx, paths, width, height, strokeScale = 1) {
    paths.forEach((value) => {
        drawLayer(ctx, value, width, height, strokeScale);
    });
}
