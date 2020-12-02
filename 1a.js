const input1 = require("./1input");

function findBadEntries(entries) {
  const numbers = entries.split("\n").map((entry) => +entry);
  const hash = {};
  for (const number of numbers) {
    if (hash[number]) return number * (2020 - number);
    else {
      hash[2020 - number] = true;
    }
  }
}

console.log(findBadEntries(input1));
