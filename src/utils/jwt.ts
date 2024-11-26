import jwt from "jsonwebtoken";
import { IAccessToken, IJwtUser } from "../contracts/jwt";
import { logger } from "../infrastructure/logger";

/**
 * Sign a JWT for the user.
 * @param id - User ID to encode in the JWT.
 * @returns The signed access token.
 */
export const jwtSign = (id: string): IAccessToken | null => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_EXPIRATION || "30d",
    });

    console.log(token);

    return { token };
  } catch (error) {
    logger.error("Error signing JWT:", error);
    return null;
  }
};

/**
 * Verify a JWT and decode the user ID.
 * @param token - The token to verify.
 * @returns The decoded JWT payload containing the user ID.
 */
export const jwtVerify = (token: string): IJwtUser | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as IJwtUser;
    return decoded;
  } catch (error) {
    logger.error("Error verifying JWT:", error);
    return null;
  }
};
