import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const FILE = fileURLToPath(new URL("../payload-types.ts", import.meta.url));

let src = readFileSync(FILE, "utf8");

src = src.replace(/^[ \t]*\/\*\*[\s\S]*?\*\/\n/gm, "");
src = src.replace(/\n{3,}/g, "\n\n");

writeFileSync(FILE, src);
console.log("Stripped JSDoc comments from payload-types.ts");
