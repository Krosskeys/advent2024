"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDataParse = void 0;
const fs_1 = require("fs");
function initialDataParse(file, type, param = 2, fmt = "int") {
    const input = (0, fs_1.readFileSync)(file, "utf-8");
    if (type === "lines") {
        return input.trim().split(`\n`);
    }
    else if (type === "cols") {
        const columns = [];
        const removedNewlines = input.trim().replace("\n", " ").split(" ");
        for (let i = 0; i < param; i++) {
            columns.push([]);
        }
        let colNum = 0;
        for (const k of removedNewlines) {
            if (colNum >= param) {
                colNum = 0;
            }
            columns[colNum].push(fmt == "int" ? Math.abs(Number(k)) : k);
            colNum++;
        }
        return columns;
    }
    return [];
}
exports.initialDataParse = initialDataParse;
