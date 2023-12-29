export function easeInOut(x:number) :number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

}


export const animation = {
  duration: 500,
  easing: easeInOut
};