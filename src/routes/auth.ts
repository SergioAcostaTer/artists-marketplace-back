import { authController } from "@/controllers";
import { authGuard } from "@/guards";
import { Router } from "express";

export const auth = (router: Router): void => {
  router.post("/auth/sign-up", authGuard.isGuest, authController.signUp);
  router.post("/auth/sign-in", authGuard.isGuest, authController.signIn);
  router.post("/auth/sign-out", authGuard.isAuth, authController.signOut);
  router.post("/auth/login", authGuard.isGuest, authController.logIn);
};
