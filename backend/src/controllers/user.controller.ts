import { NextFunction, Request, Response } from 'express';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
console.log("============ res.locals ==============", res.locals);

    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
