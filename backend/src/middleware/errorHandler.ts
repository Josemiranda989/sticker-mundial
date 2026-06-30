import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

// Error de dominio con status HTTP explicito.
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Ruta no encontrada' })
}

// Handler central de errores. Traduce errores conocidos a respuestas
// limpias para el frontend; cualquier otra cosa es un 500.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Datos invalidos',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    })
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message })
  }

  console.error('Error no manejado:', err)
  return res.status(500).json({ error: 'Error interno del servidor' })
}
