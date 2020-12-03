const passwordList = require("./2input");
const entries = passwordList.split("\n");

function parseEntry(entry) {
  const [range, char, password] = entry.split(" ");
  const [low, high] = range.split("-");
  const requiredLetter = char[0];
  return { low, high, password, requiredLetter };
}

function isValidPasswordA(entry) {
  const { low, high, password, requiredLetter } = parseEntry(entry);
  const occurrances = password
    .split("")
    .reduce((total, current) => (current === requiredLetter ? total + 1 : total), 0);
  return low <= occurrances && occurrances <= high;
}

function isValidPasswordB(entry) {
  const { low, high, password, requiredLetter } = parseEntry(entry);
  const [index1, index2] = [low - 1, high - 1];
  // !a != !b provides XOR
  return !(password[index1] === requiredLetter) !== !(password[index2] === requiredLetter);
}

function getValidPasswordCount(entries, isValidPassword) {
  const count = entries.reduce((acc, cur) => (isValidPassword(cur) ? acc + 1 : acc), 0);
  return count;
}

console.log("2a", getValidPasswordCount(entries, isValidPasswordA));
console.log("2b", getValidPasswordCount(entries, isValidPasswordB));
