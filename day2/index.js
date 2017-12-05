// find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

const fs = require('fs');
let tsvstr = fs.readFileSync(__dirname + '/input.tsv', 'utf-8');

tsvstr = tsvstr.split('\n')
  .map(l => l.split('\t'))
  .map(l => {
    let res;
    l.forEach((n1, i1) => {
      l.forEach((n2, i2) => {
        if (i1 !== i2) {
          if (n1 % n2 === 0) res = n1 / n2;
          if (n2 % n1 === 0) res = n2 / n1;
        } 
      })
    })
    return res;
  })
  .reduce((acc, n) => acc + n);

console.log(tsvstr);