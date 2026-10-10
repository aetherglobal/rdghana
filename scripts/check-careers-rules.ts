import assert from "node:assert/strict";
import { accraDay, isListed } from "../lib/careers-rules";

// Payload stores day-only dates at 12:00 UTC.
const deadline = "2026-10-31T12:00:00.000Z";
const open = { status: "open", publishedDate: "2026-10-01T09:00:00.000Z", applicationDeadline: deadline };

assert.equal(accraDay("2026-10-31T23:59:59Z"), "2026-10-31");
assert.ok(isListed(open, new Date("2026-10-31T23:59:00Z")), "listed through the deadline day");
assert.ok(!isListed(open, new Date("2026-11-01T00:00:01Z")), "expired the next day");
assert.ok(!isListed({ ...open, status: "draft" }, new Date("2026-10-10T00:00:00Z")));
assert.ok(!isListed({ ...open, status: "closed" }, new Date("2026-10-10T00:00:00Z")));
assert.ok(!isListed({ ...open, status: "archived" }, new Date("2026-10-10T00:00:00Z")));
assert.ok(!isListed(open, new Date("2026-09-30T00:00:00Z")), "scheduled, not yet published");
assert.ok(isListed({ status: "open" }, new Date()), "no dates = listed");

console.log("careers rules ok");
