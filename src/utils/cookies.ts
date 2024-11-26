import { IAccessToken } from "../contracts/jwt";
import { Request, Response } from "express";

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

/**
 * Set a secure, HTTP-only cookie for the access token.
 * @param token - The access token to set.
 * @param res - Express response object.
 */
export const setToken = (token: IAccessToken, res: Response): void => {
  res.cookie("token", token.token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_MONTH,
    sameSite: "strict",
  });
};

/**
 * Clear the access token cookie.
 * @param res - Express response object.
 */
export const clearToken = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

/**
 * Set a secure, HTTP-only cookie for the user data.
 * Only store non-sensitive information.
 * @param user - Object containing non-sensitive user data.
 * @param res - Express response object.
 */
export const setUser = (
  user: { id: string; name: string },
  res: Response
): void => {
  res.cookie("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_MONTH,
    sameSite: "strict",
  });
};

/**
 * Clear the user cookie.
 * @param res - Express response object.
 */
export const clearUser = (res: Response): void => {
  res.clearCookie("user", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

/**
 * Retrieve the access token from cookies.
 * @param req - Express request object.
 * @returns The access token, or undefined if not found.
 */
export const getToken = (req: Request): string | undefined => {
  return req.cookies?.token;
};
