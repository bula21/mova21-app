export default function chooseRandom(array: any[]): any {
    return array[Math.floor(Math.random()*array.length)];
  }