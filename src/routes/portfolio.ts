import { portfolioController } from "@/controllers";
import { Router } from "express";

export const user = (router: Router): void => {
  router.get("/portfolio", portfolioController.getPortfolio);
};
