import { RequestHandler } from 'express';

type DelayParams = {
  rangeUpper: number;
  rangeLower: number;
};

export function delay({rangeUpper, rangeLower}: DelayParams): RequestHandler {
  return (_req, _res, next) => {
    const randomWaitMs = Math.floor(
      rangeUpper + Math.random() * (rangeUpper - rangeLower)
    );
    setTimeout(next, randomWaitMs);
  }
}
