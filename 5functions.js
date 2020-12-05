const boardingPassList = require('./5input');

const boardingPasses = boardingPassList.split('\n');

const getAxisValue = (passSegment, highChar) =>
  passSegment
    .split('')
    .reduce(
      (acc, cur, index, chars) =>
        cur === highChar ? acc + 2 ** (chars.length - index - 1) : acc,
      0
    );

const getRow = (rowSegment) => getAxisValue(rowSegment, 'B');
const getColumn = (rowSegment) => getAxisValue(rowSegment, 'R');
const getSeatID = (boardingPass) =>
  getRow(boardingPass.slice(0, 7)) * 8 + getColumn(boardingPass.slice(7));

const getSortedSeatIDs = (passes) =>
  passes.map(getSeatID).sort((a, b) => a - b);

const getHighestSeatID = (passes) =>
  getSortedSeatIDs(passes)[passes.length - 1];

const getSantasSeat = (passes) => {
  const sortedSeatIDs = getSortedSeatIDs(passes);
  const lowestSeatID = sortedSeatIDs[0];
  return (
    sortedSeatIDs.find((seatID, index) => seatID !== lowestSeatID + index) - 1
  );
};

console.log(getHighestSeatID(boardingPasses));
console.log(getSantasSeat(boardingPasses));
