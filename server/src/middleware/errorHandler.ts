/**
 * Error handling middleware
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface ApiError extends Error {
  statusCode?: number;
}

/**
 * Custom error class
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

/**
 * Error handler middleware
 */
export function errorHandler(
  err: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Custom AppError
  if (err instanceof AppError || (err as ApiError).statusCode) {
    const statusCode = (err as ApiError).statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Default error
  console.error('Error:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

