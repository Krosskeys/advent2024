import { initialDataParse } from "../tooling";

const reports = initialDataParse("data.txt", "lines") as string[];
console.log(reports);
let safe = 0;
let dampSafe = 0;
let unsafe = 0;
let dampUnsafe = 0;

function isSafeReading(reading: number[]) {
  if (reading[1] > reading[0]) {
    return reading.every(
      (e, i, a) => i === 0 || (a[i] > a[i - 1] && a[i] <= a[i - 1] + 3)
    );
  } else if (reading[1] < reading[0]) {
    return reading.every(
      (e, i, a) => i === 0 || (a[i] < a[i - 1] && a[i] >= a[i - 1] - 3)
    );
  }
  return false;
}

function damper(dampReading: number[], backstep = false): number[] {
  let i = 1;
  if (dampReading[1] > dampReading[0]) {
    while (i < dampReading.length) {
      if (
        !(
          dampReading[i] > dampReading[i - 1] &&
          dampReading[i] <= (dampReading[i - 1] + 3)
        )
      ) {
        return splicer(dampReading, i, backstep);
      }
      i++;
    }
  } else if (dampReading[1] < dampReading[0]) {
    while (i < dampReading.length) {
      if (
        !(
          dampReading[i] < dampReading[i - 1] &&
          dampReading[i] >= (dampReading[i - 1] - 3)
        )
      ) {
        return splicer(dampReading, i, backstep);
      }
      i++;
    }
  }
  return splicer(dampReading, i, backstep);
}

function splicer(dampReading: number[], failure: number, backstep: boolean) {
  if (backstep) {
    dampReading.splice(failure - 1, 1);
  } else {
    dampReading.splice(failure, 1);
  }
  return dampReading;
}

reports.forEach((e) => {
  const readings = e.split(" ").map((e) => Math.abs(Number(e)));
  if (isSafeReading(readings)) {
    safe++;
  } else {
    unsafe++;
  }
});

reports.forEach((e) => {
  const readings = e
    .trim()
    .split(" ")
    .map((e) => Math.abs(Number(e)));
  if (isSafeReading(readings)) {
    dampSafe++;
  } else if (isSafeReading(damper([...readings]))) {
    dampSafe++;
  } else if (isSafeReading(damper([...readings], true))) {
    dampSafe++;
  } else {
    dampUnsafe++;
  }
});

console.log("Raw Safe:" + safe);
console.log("Raw Unsafe: " + unsafe);
console.log("Dampened Safe:" + dampSafe);
console.log("Dampened Unsafe: " + dampUnsafe);
console.log("Total: " + reports.length);
