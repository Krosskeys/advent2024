import { readFileSync } from "fs";

export function initialDataParse(
  file: string,
  type: "lines" | "cols",
  param = 2,
  fmt = "int"
): string[] | (number | string)[][] {
  const input = readFileSync(file, "utf-8");
  if (type === "lines") {
    return input.trim().split(`\n`);
  } else if (type === "cols") {
    const columns: (number | string)[][] = [];
    const removedNewlines = input.trim().replace(/\n/g, " ").split(" ");
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
