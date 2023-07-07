// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Add your code here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const canvas = document.createElement("canvas");
document.body.append(canvas)
const ctx = canvas.getContext("2d");
ctx.font = "11px serif";
ctx.fillText(seed, 10, 50);

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Add your code here ↑↑↑↑↑↑↑↑↑↑↑↑↑↑