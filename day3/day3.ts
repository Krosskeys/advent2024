import { readFileSync } from "fs";
const data = readFileSync("data.txt", "utf-8");

const actionRegex = /mul\([0-9]+,[0-9]+\)/g;
const multipleRegex = /[0-9]+/g;
const conditionalRegex = /mul\([0-9]+,[0-9]+\)|don't\(|do\(/g;

const validActions = data.match(actionRegex)!;

const validTotal = 0;

const solutions = validActions.map((e) => {
  const factors = e.match(multipleRegex);
  if (factors && factors.length > 1) {
    return Number(factors[0]) * Number(factors[1]);
  }
});
if (solutions.length) {
  console.log("3a answer: " + solutions.reduce((a, c) => {
    if (a && c) {
      return a + c;
    }
  }, 0));
}

let mulIsActive = true;
const conditionalSolutions = data.match(conditionalRegex)!.map((e) => {
  switch (e.slice(0, 3)) {
    case "mul":
      if (mulIsActive) {
        const factors = e.match(multipleRegex);
        if (factors && factors.length > 1) {
          return Number(factors[0]) * Number(factors[1]);
        }
      } else {
        return 0;
      }
      break;
    case "do(":
      mulIsActive = true;
      return 0;
    case "don":
      mulIsActive = false;
      return 0;
    default:
      return 0;
  }
});
if (conditionalSolutions.length) {
  console.log(
    "3b answer: " +
      conditionalSolutions.reduce((a, c) => {
        if (a && c) {
          return a + c;
        }
      }, 0)
  );
}
