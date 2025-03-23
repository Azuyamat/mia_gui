import { Entry, EntryType } from "@/domain/types/Directory.ts";

export function compareEntries(a: Entry, b: Entry, query: string): number {
    const queryLower = query.toLowerCase();
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();

    // Find which is most similar and sort by directory first then files
    const aIndex = aLower.indexOf(queryLower);
    const bIndex = bLower.indexOf(queryLower);

    let aScore = 0;
    let bScore = 0;

    if (aIndex !== -1) {
        aScore += a.name.length - query.length - aIndex;
    }

    if (bIndex !== -1) {
        bScore += b.name.length - query.length - bIndex;
    }

    if (a.entryType === EntryType.DIRECTORY) {
        aScore += 1;
    }

    if (b.entryType === EntryType.DIRECTORY) {
        bScore += 1;
    }

    return bScore - aScore;
}
