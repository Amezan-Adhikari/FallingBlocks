let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let ArrayOfBlocks = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
//events and debug feature;
canvas.addEventListener("mousedown", (e) => {
  drawBlock(e);
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Shift") {
    console.log(
      (debug = {
        ArrayOfBlocks,
      })
    );
  }
});

function drawBlock(e) {
  let X = Math.trunc(
    (e.clientX - Math.round((window.innerWidth - 400) / 2)) / 20
  );
  let Y = Math.trunc(
    (e.clientY - Math.round((window.innerHeight - 400) / 2)) / 20
  );
  if (ArrayValue(X, Y, "") != 1) {
    ArrayValue(X, Y, "set");
    render();
  }
}

function render() {
  ArrayOfBlocks.forEach((j, Yindex) => {
    let filledSquares = 0;
    j.forEach((i, Xindex) => {
      if (i == 1) {
        filledSquares = filledSquares + 1;
        if (filledSquares == 20 && !falling(Xindex,Yindex)) {
          j.forEach((block, index) => {
            ArrayValue(index, Yindex, "reset");
          });
        }
        context.fillRect(Xindex * 20, Yindex * 20, 20, 20);
        context.fillStyle = "black";
        setTimeout(() => {
          gravity(Xindex, Yindex);
        }, 100);
      } else if (i == 0) {
        context.clearRect(Xindex * 20, Yindex * 20, 20, 20);
      }
    });
  });
}

function falling(x,y){
    let falling= false;
   if(y < 19 && ArrayValue(x, y+1, "")==1){
    falling = true;
   }
   else{
    falling=false;
   }

    return falling;
}

function gravity(x, y) {
  if (y < 19 && ArrayValue(x, y + 1, "") != 1) {
    ArrayValue(x, y, "reset");
    ArrayValue(x, y + 1, "set");
    render();
  }
}

function ArrayValue(x, y, set) {
  if (set == "set") {
    ArrayOfBlocks[y][x] = 1;
  } else if (set == "reset") {
    ArrayOfBlocks[y][x] = 0;
  } else {
    return ArrayOfBlocks[y][x];
  }
}

// function slideBlock(X,Y){
//     //if the block is not falling
//     if(ArrayValue(X,Y+1,"")!=0){
//         ArrayValue(X,Y,"reset");
//         let rand = Math.floor(Math.random()*2);
//         switch (rand) {
//             case 1:
//                 ArrayValue(X+1,Y,"set");
//                 break;
//             case 0:
//                 ArrayValue(X-1,Y,"set");
//             default:
//                 break;
//         }
//         render();
//     }
// }
