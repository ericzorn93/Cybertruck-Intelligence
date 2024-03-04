import React, { FC } from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { IArticleData } from "@/types/articles";
import { Link } from "@nextui-org/link";

interface IArticleGridProps {
  articleData: IArticleData[];
}

export const ArticleGrid: FC<IArticleGridProps> = ({ articleData }) => {
  return (
    <>
      <div className="max-w-[900px] mx-auto gap-4 grid grid-cols-12 grid-rows-2 px-8">
        {articleData.map((article) => (
          <>
            <Card
              className="col-span-12 sm:col-span-4 h-[300px]"
              key={article.id}
            >
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-black dark:text-white/90 uppercase font-bold">
                  {article.title}
                </p>
              </CardHeader>
              <Image
                removeWrapper
                isBlurred
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                style={{ opacity: 0.8 }}
                src={article.img}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black dark:text-white text-tiny">
                    Posted - {article.postedAt}
                  </p>
                </div>
                <Link href={article.link} target="_blank" color="foreground">
                  <Button
                    className="text-tiny "
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </>
        ))}
      </div>
    </>
  );
};
