import { scrapSpotify } from "@/utils/scrapers";
import { Request, Response, Router } from "express";

export const base = (router: Router) => {
  router.get("/", async (_: Request, res: Response) => {
    try {
      const data = await scrapSpotify(
        "https://open.spotify.com/artist/3IfsgBb93KlSIBNVQOIsHH"
      );

      res.json({
        success: true,
        data,
      });
    } catch (error:any) {
      console.error("Error in scrapSpotify:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch Spotify data.",
      });
    }
  });
};
