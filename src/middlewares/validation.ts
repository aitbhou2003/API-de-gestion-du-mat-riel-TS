
import { type Request, type Response, type NextFunction } from "express";
import { type ObjectSchema } from "joi";

interface ValidationSchemas {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { field: string; message: string }[] = [];

    for (const [source, schema] of Object.entries(schemas)) {
      if (!schema) continue;

      const { error, value } = schema.validate(req[source as keyof Request], {
        abortEarly: false,
      });

      if (error) {
        errors.push(
          ...error.details.map((detail : any) => ({
            field: `${source}.${detail.path.join(".")}`,
            message: detail.message,
          }))
        );
      } else {
        if (source === "body") req.body = value;
        // query and params are handled separately below
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    next();
  };
};
