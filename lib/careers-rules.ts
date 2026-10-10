export const GHANA_TZ = "Africa/Accra";

/** Calendar day (YYYY-MM-DD) of an instant in Ghana time. */
export function accraDay(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-CA", { timeZone: GHANA_TZ });
}

export interface ListingCandidate {
  status: string;
  publishedDate?: string | null;
  applicationDeadline?: string | null;
}

/** Whether a vacancy belongs in the public listing at `now`. */
export function isListed(job: ListingCandidate, now: Date): boolean {
  if (job.status !== "open") return false;
  if (job.publishedDate && new Date(job.publishedDate) > now) return false;
  if (job.applicationDeadline && accraDay(job.applicationDeadline) < accraDay(now)) return false;
  return true;
}
