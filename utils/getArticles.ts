import { load as cheerioLoad } from "cheerio";

import { IArticleData } from "@/types/articles";

export async function getCybertruckOwnersClubArticles(): Promise<
  IArticleData[]
> {
  const res = await fetch("https://www.cybertruckownersclub.com", {
    cache: "no-cache",
  });
  const data = await res.text();

  const $ = cheerioLoad(data);
  const articles = $('[id^="post-"]');
  const articleData: IArticleData[] = [];

  const validIdRegex = /^post-\d+/i;
  articles.each((_, el) => {
    const id = $(el).attr("id");
    if (!id || !validIdRegex.test(id)) return;

    const $$ = $(el);
    const img = $$.find("img").attr("src");
    if (!img) return;

    const title = $$.find(".entry-title > a").text().trim() ?? "";
    const link = $$.find(".entry-title > a").attr("href") ?? "";
    const postedAt = $$.find("span.screen-reader-text + a").text() ?? "";

    const item = {
      id,
      title,
      img,
      link,
      postedAt,
    };
    articleData.push(item);
  });

  return articleData.slice(0, 6);
}
