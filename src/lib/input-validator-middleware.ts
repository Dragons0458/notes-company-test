import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * Represents the types of the request body, params and query.
 */
export interface ValidationTypes<T, W, Z> {
  body?: ClassConstructor<T>;
  params?: ClassConstructor<W>;
  query?: ClassConstructor<Z>;
}

/**
 * Validates the request body, params and query and transforms them to the given types or returns a 400 error.
 * @param validationTypes The types of the request body, params and query.
 */
export function validateAndTransform<T, W, Z>(
  validationTypes: ValidationTypes<T, W, Z>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = Object.entries(validationTypes) as [
        keyof ValidationTypes<T, W, Z>,
        ClassConstructor<T>,
      ][];

      for (const [type, toValidate] of types) {
        const transformedObject = plainToInstance(toValidate, req[type], {
          strategy: 'exposeAll',
          enableImplicitConversion: true,
        });

        await validateOrReject(transformedObject as object, {
          forbidNonWhitelisted: true,
          whitelist: true,
        });

        req[type] = transformedObject;
      }

      next();
    } catch (e) {
      const errors = e as ValidationError[];
      const mappedErrors = errors.map(({ property, constraints }) => ({
        property,
        constraints: Object.keys(constraints ?? {}),
      }));

      res.status(400).json({ errors: mappedErrors });
    }
  };
}
