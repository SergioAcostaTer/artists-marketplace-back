import { NextFunction, Response, Request } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const authGuard = {
  isAuth: (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = res.locals;

    if (user) {
      return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    });
  },

  isGuest: (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = res.locals;
    if (!user) {
      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    });
  },
};
