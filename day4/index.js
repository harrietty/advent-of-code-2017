const fs = require('fs');
const txt = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

let totalCorrect = txt.split('\n').map(l => l.split(' '))
  .map(phrase => {
    return phrase.reduce((acc, w) => {
      if (findWordInPhrase(w, phrase) < 2) acc.push(w);
      return acc;
    }, []).length === phrase.length;
  })
  .reduce((acc, bool) => {
    return bool ? ++acc : acc;
  }, 0)

function findWordInPhrase (word, otherWords) {
  word = word.split('').sort().join('');
  otherWords = otherWords.map(w => w.split('').sort().join(''));
  let t = otherWords.reduce((total, w) => {
    if (w === word) return total + 1;
    return total;
  }, 0);
  return t;
}