import { ArticleGrid } from "@/components/article-grid";
import { VinNumberForm } from "@/components/vin-number";
import { getCybertruckOwnersClubArticles } from "@/utils/getArticles";
import { Divider } from "@nextui-org/divider";

export default async function Home() {
  const articleData = await getCybertruckOwnersClubArticles();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-5 md:py-10">
      <div className="w-full">
        <Divider />
        <br />
        <p className="my-3">Latest Articles - Cybertruck Owners Club</p>
        <ArticleGrid articleData={articleData} />
        <br />
        <Divider />
        <br />
        <p className="my-3">VIN Number Validator</p>
        <VinNumberForm />
      </div>
    </section>
  );
}
