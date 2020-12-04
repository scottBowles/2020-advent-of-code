const rowList = require("./3input");
const rows = rowList.split("\n");

// Contrary to usual convention, slope here is right / down
const slopes = [1, 3, 5, 7, 0.5];

const indexTraversedInRow = (row, rowIndex, slope) => (rowIndex * slope) % row.length;

const hitsTree = (row, locationIndex) =>
  Number.isInteger(locationIndex) && row[locationIndex] === "#";

const treeCountOnSlope = (rows, slope) =>
  rows.reduce((total, row, rowIndex) => {
    const locationIndex = indexTraversedInRow(row, rowIndex, slope);
    return hitsTree(row, locationIndex) ? total + 1 : total;
  }, 0);

const answer3a = treeCountOnSlope(rows, 3);
const answer3b = slopes.reduce((product, slope) => product * treeCountOnSlope(rows, slope), 1);

console.log("3a: " + answer3a);
console.log("3b: " + answer3b);
