import { portfolioController } from "@/controllers";
import { Router } from "express";

export const portfolio = (router: Router): void => {
  router.get("/portfolio", portfolioController.getPortfolio);
};
