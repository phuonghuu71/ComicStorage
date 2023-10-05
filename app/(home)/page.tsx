import { COMIC_TEMPLATES, TOP_COMIC_TEMPLATES } from "@assets/home";
import { Container, Title } from "@ui/atoms";
import { ComicCard, TabList, Comment } from "@ui/molecules";
import { HeroSwiperList } from "@ui/templates";

import { Metadata } from "next";
import {
  FlagIcon,
  ChartBarIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Comic Storage",
  description: "A place to store your comics",
};

export default function Page() {
  return (
    <>
      <Container className="mb-4 border border-blue-gray-100">
        <Title
          title={
            <>
              <SparklesIcon className="w-5 h-5 animate-bounce" />
              Top of the day
            </>
          }
        />

        <HeroSwiperList comics={COMIC_TEMPLATES} />
      </Container>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <Container className="border border-blue-gray-100 col-span-12 lg:col-span-8 flex flex-col items-center">
          <Title
            containerClass="self-start"
            title={
              <>
                <StarIcon
                  className="w-5 h-5 animate-bounce"
                  strokeWidth={2.5}
                />
                Just Uploaded
              </>
            }
          />

          {COMIC_TEMPLATES.map((comic, index) => (
            <ComicCard
              key={index}
              title={comic.title}
              imgUrl={comic.imgUrl}
              desc={comic.desc}
              uploader={comic.uploader}
              commentCount={comic.commentCount}
              chapterCount={comic.chapterCount}
              lastUpdated={comic.lastUpdated}
            />
          ))}
        </Container>

        <aside className="col-span-12 lg:col-span-4 order-first lg:order-last">
          <Container className="border border-blue-gray-100 h-fit mb-4">
            <Title
              title={
                <>
                  <FlagIcon className="w-5 h-5" strokeWidth={2.5} />
                  Top Comic
                </>
              }
            />

            <TabList data={TOP_COMIC_TEMPLATES} />
          </Container>

          <Container className="border border-blue-gray-100">
            <Title
              title={
                <>
                  <ChartBarIcon className="w-5 h-5" strokeWidth={2.5} />
                  Latest Conmment
                </>
              }
            />

            <Comment />
          </Container>
        </aside>
      </div>
    </>
  );
}
