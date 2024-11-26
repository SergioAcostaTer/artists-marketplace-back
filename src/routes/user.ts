import { userController } from "../controllers/userController";
import { authGuard } from "../guards";
import { Router } from "express";

export const user = (router: Router): void => {
  router.get("/me", authGuard.isAuth, userController.me);
};
