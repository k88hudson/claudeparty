/**
 * Reads cat SVGs from resources/cats/ and updates the embedded SVG strings
 * in src/common/character.ts. Run after exporting from Figma:
 *
 *   pnpm tsx scripts/sync-cat-svgs.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATS_DIR = join(ROOT, "resources", "cats");
const CHARACTER_FILE = join(ROOT, "src", "common", "character.ts");

const SVG_FILES: Record<string, string> = {
  SVG_NEUTRAL: "cat-neutral.svg",
  SVG_WAITING_0: "cat-waiting-0.svg",
  SVG_WAITING_1: "cat-waiting-1.svg",
  SVG_WORKING_0: "cat-working-0.svg",
  SVG_WORKING_1: "ca-working-1.svg",
};

function readSvg(filename: string): string {
  return readFileSync(join(CATS_DIR, filename), "utf-8").trim();
}

let source = readFileSync(CHARACTER_FILE, "utf-8");

for (const [varName, filename] of Object.entries(SVG_FILES)) {
  const svg = readSvg(filename);

  // Match: const VAR_NAME = `...`;
  const pattern = new RegExp(
    `const ${varName} = \`[\\s\\S]*?\`;`,
  );

  if (!pattern.test(source)) {
    console.error(`Could not find ${varName} in character.ts`);
    process.exit(1);
  }

  source = source.replace(pattern, `const ${varName} = \`${svg}\`;`);
  console.log(`Updated ${varName} from ${filename}`);
}

writeFileSync(CHARACTER_FILE, source);
console.log("\nDone! character.ts updated.");
