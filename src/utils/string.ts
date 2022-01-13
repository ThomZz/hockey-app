export function getInitial(value: string, separator: string = " "): string {
    const splitted = value.split(" ");
    let buffer = "";
    for (const word of splitted) {
        buffer = `${buffer}${word[0].toUpperCase()}`; 
    }
    return buffer;
}