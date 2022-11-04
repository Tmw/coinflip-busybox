import { Request, Response, NextFunction } from 'express'

export function errorCatcher(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack)
    res.status(500).json({ failed: true, error: err.message });
}