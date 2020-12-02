const input1 = require("./1input");

function findThreeEntries(entries) {
  const numbers = entries.split("\n").map((entry) => +entry);
  for (const number of numbers) {
    const hash = {};
    for (const secondNumber of numbers) {
      if (hash[secondNumber])
        return number * secondNumber * (2020 - number - secondNumber);
      else {
        hash[2020 - number - secondNumber] = true;
      }
    }
  }
}

console.log(findThreeEntries(input1));
