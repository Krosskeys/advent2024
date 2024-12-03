"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const data = (0, fs_1.readFileSync)("data.txt", "utf-8");
const actionRegex = /mul\([0-9]+,[0-9]+\)/g;
const multipleRegex = /[0-9]+/g;
const validActions = data.match(actionRegex);
const conditionalRegex = /mul\([0-9]+,[0-9]+\)|don't\(|do\(/g;
const validTotal = 0;
const solutions = validActions.map((e) => {
    const factors = e.match(multipleRegex);
    return factors[0] * factors[1];
});
console.log("3a answer: " + solutions.reduce((a, c) => a + c, 0));
let mulIsActive = true;
const conditionalSolutions = (_a = data.match(conditionalRegex)) === null || _a === void 0 ? void 0 : _a.map((e) => {
    switch (e.slice(0, 3)) {
        case "mul":
            if (mulIsActive) {
                const factors = e.match(multipleRegex);
                return factors[0] * factors[1];
            }
            else {
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
console.log("3b answer: " + conditionalSolutions.reduce((a, c) => a + c, 0));
