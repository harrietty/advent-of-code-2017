const fs = require('fs');
 let sequence = fs.readFileSync(__dirname + '/input.txt', 'utf-8').trim().split('\n').map(Number); 

let index = 0;
let jumpsTaken = 0;
let stillJumping = true;

while (stillJumping) {
  let newOffset = sequence[index];
  if (newOffset === undefined) {
    jumpsTaken++;
    stillJumping = false;
    break;
  }

  if (sequence[index] > 2) sequence[index] = sequence[index] - 1;
  else sequence[index] = sequence[index] + 1;
  
  if (index > 0) jumpsTaken++;
  index += newOffset;
}

console.log(jumpsTaken);