import { IAccessToken } from "../contracts/jwt";
import { Response } from "express";

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

/**
 * Set a secure, HTTP-only cookie for the access token.
 * @param token - The access token to set.
 * @param res - Express response object.
 */
export const setToken = (token: IAccessToken, res: Response): void => {
  res.cookie("token", token.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_MONTH,
    sameSite: "strict",
    path: "/",
  });
};

/**
 * Clear the access token cookie.
 * @param res - Express response object.
 */
export const clearToken = (res: Response): void => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "strict",
    maxAge: 0,
  });
};
