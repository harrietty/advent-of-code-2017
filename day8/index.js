const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8').trim().split('\n');

const registers = {};

function execInstructions (registers, instructions) {
  let slot, action, incAmount, captures, ifA, ifB, comparison;
  let re = /(inc)|(dec)/;
  instructions.forEach(line => {
    captures = /(\w+)\s(inc|dec)\s(-?\d+)\sif\s(\w+)\s(>|<|>=|<=|==|!=)\s(-?\d+)/.exec(line);
    if (captures === null) console.log(line);
    slot = captures[1];
    action = captures[2];
    incAmount = Number(captures[3]);
    ifA = captures[4];
    ifB = captures[6];
    comparison = captures[5];
    
    if (registers[ifA] === undefined) registers[ifA] = 0;
    if (registers[slot] === undefined) registers[slot] = 0;
    
    if (shouldPerform(ifA, comparison, ifB)) {
      action === 'inc' ? registers[slot] += incAmount : registers[slot] -= incAmount;
    }
  });
  return registers;
}

function findHighestReg (registers) {
  let max;
  for (let key in registers) {
    if (max === undefined || registers[key] > max) {
      max = registers[key];
    }
  }
  return max;
}

execInstructions(registers, input);

console.log(registers);
console.log(findHighestReg(registers));


function shouldPerform(a, comparison, b) {
  switch (comparison) {
    case '==':
      if (registers[a] === Number(b)) return true;
      else return false;
    case '>':
      if (registers[a] > Number(b)) return true;
      else return false;
    case '<':
      if (registers[a] < Number(b)) return true;
      else return false;
    case '>=':
      if (registers[a] >= Number(b)) return true;
      else return false;
  }
}