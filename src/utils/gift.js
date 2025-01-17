const puppeteer = require("puppeteer");

async function scrapeGiftData(username, slug) {
  const url = `https://idn.app/${username}/live/${slug}`;
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {waitUntil: "networkidle2"});
    await page.waitForSelector("div[data-rank]", {timeout: 10000});

    const rankData = await page.evaluate(() => {
      const rankElements = document.querySelectorAll("div[data-rank]");
      const results = [];

      rankElements.forEach((element) => {
        if (element.closest(".top-three")) return;

        const rank = element.getAttribute("data-rank");
        const name =
          element
            .querySelector("div.profile > div.name-wrapper > p.name")
            ?.textContent.trim() || "Unknown";
        const gold =
          element.querySelector("div.profile > p.gold")?.textContent.trim() ||
          "0 Gold";

        results.push({rank, name, gold});

        if (results.length >= 10) return results;
      });

      return results.slice(0, 10);
    });

    await browser.close();
    return rankData;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

module.exports = {scrapeGiftData};
