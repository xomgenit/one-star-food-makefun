// Entry program for the make.fun bounty "One Star, Five Stars for the Food".
// An alien tourist leaves planet Earth a one-star review, yet still admits
// the food was excellent. This program emits that single sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review itself: one sentence, well inside the 200-character gate.
const REVIEW =
  "One star: your species invented the queue, the password reset, and meetings that could have been messages, but the taco is the single greatest achievement in this quadrant.";

// The harness points MAKEFUN_OUTPUT_DIR at the folder it collects from;
// when running by hand we fall back to a local "out" folder.
function resolveOutputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  mkdirSync(dir, { recursive: true });
  return dir;
}

// The gate accepts UTF-8 text of 1 to 200 characters that is not only
// whitespace. Check the sentence against that before it ever hits disk,
// so a bad edit to the wording fails loudly here instead of at grading.
function assertGateReady(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`Entry is ${length} characters; the gate allows 1-200.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry is only whitespace; the gate would refuse it.");
  }
}

function writeEntry(): string {
  assertGateReady(REVIEW);
  const target = join(resolveOutputDir(), "entry.txt");
  // No trailing newline: the gate reads the file exactly as written.
  writeFileSync(target, REVIEW, "utf8");
  return target;
}

const writtenTo = writeEntry();
console.log(`Wrote ${REVIEW.length} characters to ${writtenTo}`);
