

export const camelToSnake = (str:string):string => str.replace(/[A-Z]/g, (letter:string):string => `_${letter.toLowerCase()}`);

export const pascalToSnake = (str:string):string => str.replace(/[A-Z]/g, (letter:string):string => `_${letter.toLowerCase()}`).replace(/^_/, '');
