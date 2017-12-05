const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8').trim();

function sumConsecutives (input) {
  input = input.split('').map(Number);
  let iOffset = input.length / 2;
  let initLength = input.length;
  input = input.concat(input)
  let total = 0;

  for (let i = 0; i < initLength; i++) {
    if (input[i] === input[i + iOffset]) total += input[i];
  }

  return total;
}

console.log(sumConsecutives(input));