import { portfolioController } from "@/controllers";
import { authGuard } from "@/guards";
import { Router } from "express";

export const portfolio = (router: Router): void => {
  router.get("/portfolio", portfolioController.getPortfolio);
  router.get("/portfolio/me", authGuard.isAuth, portfolioController.getMyPortfolio);
};
