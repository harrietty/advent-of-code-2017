const targetNum = 361527;

// 1   3    5   7    9     11
// 1   8   15   34   47    75

// Find which ring of the spiral the number appears in

function getRing () {
  let found = false;
  let i = 3;
  
  while (!found) {
    if (Math.pow(i, 2) >= targetNum) {
      found = i - 2;
      break;
    }
    i += 2;
  }
  return i - 2;
}

const ring = getRing();
const nearestSquare = Math.pow(ring, 2);
const dist =  targetNum - nearestSquare;
console.log(dist);
