/**
 * The shape of the JWT payload.
 */
export interface IJwtUser {
  id: string; // User ID encoded in the JWT
}

/**
 * The structure of the access token returned by `jwtSign`.
 */
export interface IAccessToken {
  token: string;
}
