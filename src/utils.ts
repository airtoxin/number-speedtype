export const seq = (num: number): number[] => Array.from(Array(num)).map(() => getRandomNumber());

export const getRandomNumber = () => Math.floor(Math.random() * 10)
