const SLASH_REGEX = /[\\|\/]/g;

export const splitBySlash = (str: string) => str.split(SLASH_REGEX);

export function stripSlashes(path: string) {
    return path.replace(SLASH_REGEX, "");
}

export function getLastValidElement(arr: string[] | string) {
    if (typeof arr === "string") arr = splitBySlash(arr);
    return arr.reverse().find((e) => e.length > 0) || null;
}

export function compareTwoPaths(path1: string, path2: string) {
    return stripSlashes(path1) === stripSlashes(path2);
}

export function fromHexToRGB(hex: string) {
    let ex = (initial: number) =>
        parseInt(hex.substring(initial, initial + 2), 16);
    return ex(1) + ", " + ex(3) + ", " + ex(5);
}
