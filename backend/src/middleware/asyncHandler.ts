import type { NextFunction, Request, Response } from 'express'

// Envuelve handlers async para que los errores caigan en el errorHandler
// sin tener que escribir try/catch en cada controller.
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
