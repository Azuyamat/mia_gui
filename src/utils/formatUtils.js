export const splitBySlash = (str) => str.split(/[\\|\/]/g)
export function stripSlashes(path){
    if (typeof path !== 'string') return path
    return path.replaceAll(/[\\|\/]/g, "")
}

export function getLastValidElement(arr) {
    if (typeof arr === 'string') arr = splitBySlash(arr)
    return arr.reverse().find((e) => e.length > 0) || null
}

export function compareTwoPaths(path1, path2) {
    if (typeof path1 !== 'string' || typeof path2 !== 'string') return
    return stripSlashes(path1) === stripSlashes(path2);
}
