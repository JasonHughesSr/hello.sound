function draw_canvas() {
    debugger;
    var canvas = document.getElementById("staff-canvas");
    var context = canvas.getContext("2d");

    for (var y = 50; y < 175; y += 25) {
        context.moveTo(100, y);
        context.lineTo(600, y);
    }

    context.stroke();

    context.font = "bold 28px sans-serif";
    context.fillText("\u266a", 250, 50);
    context.fillText("\u266b", 300, 150);
}

function clear_canvas() {
    var canvas = document.getElementById("staff-canvas");
    canvas.width = canvas.width;
}