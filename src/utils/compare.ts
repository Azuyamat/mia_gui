export function compare(a: string, b: string): number {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    if (aLower === bLower) {
        return 1;
    }

    if (aLower.startsWith(bLower) || bLower.startsWith(aLower)) {
        return 0.5;
    }

    if (aLower.includes(bLower) || bLower.includes(aLower)) {
        return 0.25;
    }

    return 0;
}
