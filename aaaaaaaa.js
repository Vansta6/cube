let count = 0;
let fov = (6 * document.getElementById("size").value) / 100;
let rotationx = 0;
let rotationy = 0;

let points = [
  [1, -1, -1], //1 = 0
  [-1, -1, -1], //2 = 1
  [1, 1, -1], //3 = 2
  [-1, 1, -1], //4 = 3
  [1, -1, 1], //5 = 4
  [-1, -1, 1], //6 = 5
  [1, 1, 1], //7 = 6
  [-1, 1, 1], //8 = 7
];
let temp_points = [
  [1, -1, -1], //1 = 0
  [-1, -1, -1], //2 = 1
  [1, 1, -1], //3 = 2
  [-1, 1, -1], //4 = 3
  [1, -1, 1], //5 = 4
  [-1, -1, 1], //6 = 5
  [1, 1, 1], //7 = 6
  [-1, 1, 1], //8 = 7
];

let lines = [
  [1, 0],
  [0, 4],
  [4, 5],
  [5, 1],

  [2, 3],
  [3, 7],
  [7, 6],
  [6, 2],

  [2, 0],
  [3, 1],
  [7, 5],
  [6, 4],
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setInterval(() => {
  fov = 7 - document.getElementById("size").value / 40;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let count = 0;
  rotationy += (100 - document.getElementById("slidery").value) / 5000;
  rotationx += (100 - document.getElementById("sliderx").value) / 5000;

  for (let i of points) {
    let x = i[0];
    let y = i[1];
    let z = i[2];

    // x rotate
    let y_temp = y;
    let z_temp = z;
    y = Math.cos(rotationx) * y_temp - Math.sin(rotationx) * z_temp;
    z = Math.sin(rotationx) * y_temp + Math.cos(rotationx) * z_temp;

    // y rotate
    let x_temp = x;
    z_temp = z;
    x = Math.cos(rotationy) * x_temp - Math.sin(rotationy) * z_temp;
    z = Math.sin(rotationy) * x_temp + Math.cos(rotationy) * z_temp;

    x =
      (((x * fov) / (fov + z)) * 130 * document.getElementById("size").value) /
        100 +
      200 +
      (document.getElementById("x-add").value - 100) * 2;

    y =
      (((y * fov) / (fov + z)) * 130 * document.getElementById("size").value) /
        100 +
      230 +
      (document.getElementById("y-add").value - 100) * 2;

    let dot = document.getElementById("dot" + count);
    dot.style.marginLeft = x + "px";
    dot.style.marginTop = y + "px";
    temp_points[count] = [x, y, z];

    count++;
    for (let i of lines) {
      let startdot = document.getElementById("dot" + i[0]);
      let enddot = document.getElementById("dot" + i[1]);

      ctx.beginPath();
      ctx.lineWidth = 0.1 + document.getElementById("size").value / 30;
      ctx.moveTo(temp_points[i[0]][0], temp_points[i[0]][1]);
      ctx.lineTo(temp_points[i[1]][0], temp_points[i[1]][1]);
      ctx.closePath();
      ctx.stroke();
    }
  }
}, 10);
