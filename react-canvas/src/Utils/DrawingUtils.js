/**
 * Draws a single path
 * @param {*} ctx 2d drawing context
 * @param {*} path the path to draw ["path", color, size, start, additional points]
 */
export function drawPath(ctx, width, height, path) {
    ctx.strokeStyle = path[1];
    ctx.lineWidth = path[2];
    ctx.beginPath();
    ctx.moveTo(path[3][0] * width, path[3][1] * height);
    for (let i = 4; i < path.length; i++) {
        ctx.lineTo(path[i][0] * width, path[i][1] * height);
    }
    ctx.stroke();
}
