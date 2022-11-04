const TOTAL_SIZE = 100;
const FAILURE_PROBABILITY = 0.1;
const VALID_SIDE_NUM = (TOTAL_SIZE - FAILURE_PROBABILITY * TOTAL_SIZE) / 2;

export enum CoinSide {
  HEAD,
  TAIL,
  SIDE,
}

export function flip(): CoinSide {
  const slots = Array.from({ length: TOTAL_SIZE }).map((_, i) => {
    if (i < VALID_SIDE_NUM) {
      return CoinSide.HEAD;
    }

    if (i > TOTAL_SIZE - VALID_SIDE_NUM) {
      return CoinSide.TAIL;
    }

    return CoinSide.SIDE;
  });

  const idx = Math.round(slots.length * Math.random());
  return slots[idx];
}
