import { Router } from "express";
import { base } from "./base";
import { user } from "./user";
import { auth } from "./auth";

const router: Router = Router();

const routes: {
  [key: string]: (router: Router) => void;
} = { user, base, auth };

for (const route in routes) {
  routes[route](router);
}

export { router };
