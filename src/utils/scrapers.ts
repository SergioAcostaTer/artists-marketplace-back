import puppeteer from "puppeteer";

/**
 * Scrape Spotify artist details using Puppeteer and htmlparser2
 * @param url - The Spotify artist URL.
 * @returns An object with detailed Spotify artist data.
 */
export const scrapSpotify = async (url: string): Promise<any> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();

    await browser.close();

    const matches = [
      ...content.matchAll(
        /url\(&quot;(https:\/\/i\.scdn\.co\/image\/[^&]+)&quot;\)/g
      ),
    ];

    const images = matches.map((match) => match[1]);
    const name = content.match(/<title>(.*?)\s\|\sSpotify<\/title>/)?.[1] || "";

    const listeners = content.match(/(\d+)\smonthly listeners/)?.[1] || "";

    const profilePicture = images[1];
    const banner = images[0];

    const artistDetails = {
      name,
      listeners,
      profilePicture,
      banner,
    };

    return artistDetails;
  } catch (error) {
    console.error("Error scraping Spotify artist:", error);
    throw new Error("Failed to scrape Spotify data");
  }
};
