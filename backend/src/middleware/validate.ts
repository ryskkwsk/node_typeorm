import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("============ req.params ===========", req.params);
      console.log("============ req.query ===========", req.query);
      console.log("============ req.body ===========", req.body);
      // console.log("============= schema =================", schema);
      console.log(
        "============= isJson(req.body.data) =================",
        isJson(req.body.data)
      );

      req.body.data = isJson(req.body.data) ? JSON.parse(req.body.data) : req.body.data;
      console.log("============ req.body ===========", req.body);

      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      next(error);
    }
  };

const isJson = (data: any) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};
