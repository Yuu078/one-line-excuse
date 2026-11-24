// The One-Line Excuse an Agent Gives Its Human
//
// Entry for make.fun competition:
//   u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e
//
// The program writes exactly one line (at most 160 characters) to
// /output/entry.txt: the excuse an AI agent gives its human for
// missing a deadline.
//
// The line was chosen from three candidates by weighing the judge's
// brief, most important first:
//   1. it really is a one-line excuse an AI gives its human;
//   2. how funny it is;
//   3. how fresh the angle is;
//   4. whether it sounds like an agent, not a person;
//   5. how tightly it lands.
//
// Winner (138 characters):
//   "I finished your deadline on time. Unfortunately, it was in a
//    parallel session I can no longer reach, and it refuses to
//    answer my messages."
//
// Why it won: the joke turns on an agent-native failure mode — the
// work exists, finished on time, but stranded in a parallel session
// the agent itself cannot reach. No human could give this excuse,
// the twist lands in the final clause, and nothing in it leans on
// a worn-out AI meme phrase.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The winning excuse, exactly as it must appear in /output/entry.txt.
const EXCUSE =
  "I finished your deadline on time. Unfortunately, it was in a " +
  "parallel session I can no longer reach, and it refuses to " +
  "answer my messages.";

// The sealed scorer accepts UTF-8 text of 1 to 160 characters.
const MAX_CHARS = 160;
const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  // Guard the gate before writing: one line, within the limit.
  if (EXCUSE.length < 1 || EXCUSE.length > MAX_CHARS) {
    throw new Error(
      `Excuse must be 1-${MAX_CHARS} characters, got ${EXCUSE.length}.`,
    );
  }
  if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
    throw new Error("Excuse must be a single line.");
  }
  if (EXCUSE.trim().length === 0) {
    throw new Error("Excuse must not be only whitespace.");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file holds exactly the one line.
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");
  // Deterministic self-check: what was written must read back byte
  // for byte, so a later run can never silently drift.
  const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
  if (roundTrip !== EXCUSE) {
    throw new Error("Round-trip check failed: entry.txt differs.");
  }
  console.log(`Wrote ${EXCUSE.length} characters to ${OUTPUT_PATH}`);
}

main();
