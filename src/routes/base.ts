import { Request, Response, Router } from "express";

export const base = (router: Router) => {
  router.get("/", async (_: Request, res: Response) => {
    try {
      res.send(process.env.APP_URL);
    } catch (error: any) {
      res.status(500).send("Error");
    }
  });
};
