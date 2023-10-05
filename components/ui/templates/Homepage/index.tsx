"use client";

import React from "react";

import { COMIC_TEMPLATES, TOP_COMIC_TEMPLATES } from "@assets/home";

import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import ComicCard from "../../molecules/ComicCard";
import SkeletonComic from "../../atoms/SkeletonComic";
import TabList from "../../molecules/TabList";
import Comment from "../../molecules/Comment";
import Pagination from "../../molecules/Pagination";
import HeroSwiperList from "../../templates/HeroSwiperList";
import useFetchSingle from "@hooks/useFetchSingle";
import { ComicType, TotalComicType } from "@validators/Comic";

import {
  FlagIcon,
  ChartBarIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { DateTime } from "luxon";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

export function Homepage() {
  const router = useRouter();
  const limit = 6;
  const [currPage, setCurrPage] = React.useState<number>(1);
  const [comics, setComics] = React.useState<ComicType[] | []>([]);
  const { data: fetchComics, isLoading } = useFetchSingle<TotalComicType>({
    url: `/api/comic?page=${currPage}&limit=${limit}`,
  });
  const numberOfPages = (fetchComics?.numberOfPages || 0) as number;

  React.useEffect(() => {
    if (fetchComics) setComics(fetchComics.comics);
  }, [fetchComics]);

  const redirectChapterHandler = React.useCallback(
    (comic: ComicType) => {
      router.push(`/${comic._id}?name=${comic.name}`);
    },
    [router]
  );

  return (
    <>
      {/* <Container className="mb-4 border border-blue-gray-100">
        <Title
          title={
            <>
              <SparklesIcon className="w-5 h-5 animate-bounce" />
              Top of the day
            </>
          }
        />

        <HeroSwiperList comics={COMIC_TEMPLATES} />
      </Container> */}

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

          {isLoading || comics.length === 0 ? (
            <SkeletonComic />
          ) : (
            <>
              {comics.map((comic) => {
                const uploader = JSON.parse(
                  JSON.stringify(comic.uploader)
                ) as User;

                return (
                  <ComicCard
                    onClick={() => redirectChapterHandler(comic || "")}
                    key={comic._id}
                    title={comic.name}
                    imgUrl={comic.cover}
                    desc={parse(comic.description)}
                    uploader={uploader.name}
                    commentCount={0}
                    chapterCount={comic.chapters?.length || 0}
                    lastUpdated={DateTime.fromISO(
                      comic.last_update.toString()
                    ).toLocaleString(DateTime.DATETIME_SHORT)}
                  />
                );
              })}

              <Pagination
                limit={5}
                active={currPage}
                setActive={setCurrPage}
                pageCount={numberOfPages}
              />
            </>
          )}
        </Container>

        {/* <aside className="col-span-12 lg:col-span-4 order-first lg:order-last">
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
        </aside> */}
      </div>
    </>
  );
}

export default Homepage;
