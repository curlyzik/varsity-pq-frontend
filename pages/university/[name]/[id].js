import { useEffect, useState } from "react";
import Head from "next/head";

import {
  Btn,
  Loader,
  Select as PQSelect,
  InfiniteScrolling,
  SecButton,
  Modal,
  NewsCard,
} from "../../../components/index";

import {
  useGetUniSearchQuery,
  useGetUniNewsQuery,
} from "../../../src/services/searchServices/uniDetailApi";
import { useGetUniversityQuery } from "../../../src/services/university";
import { useRouter } from "next/router";
import { Spin } from "antd";

const University = () => {
  const router = useRouter();
  const { query } = router;

  const { data, isLoading } = useGetUniversityQuery(query.id);

  const searchTerm = data?.name.split(",")[0];
  const { data: searchData, isLoading: dataLoading } =
    useGetUniSearchQuery(searchTerm);
  const { data: searchNews, isLoading: newsLoading } =
    useGetUniNewsQuery(searchTerm);
  const [link, setLink] = useState("");

  const [count, setCount] = useState(12);

  // get university link
  const getUniLink = () => {
    if (!searchData?.results[0].link) {
      setLink(searchData?.results[1].link);
    } else {
      setLink(searchData?.results[0].link);
    }
  };
  useEffect(() => {
    getUniLink();
  });

  return (
    <div className="h-full bg-black">
      <div className="bg-[#00044e] bg-opacity-60 p-6 dark:bg-[#111] lg:px-12">
        <Head>
          <title>{data?.name} - Varsity PQ</title>
        </Head>

        {isLoading ? (
          <Spin />
        ) : (
          <div className="flex flex-col gap-y-7 rounded-md bg-white p-7 dark:bg-black">
            <>
              <div className="border-b border-b-gray-300 pb-5">
                <a
                  className="text-lg text-blue-400"
                  href={data?.website}
                  target={"_blank"}
                >
                  {data?.website?.split("https://www.")[1]?.split("/")[0] ||
                    data?.website?.split("https://www.")[1] ||
                    data?.website?.split("http://www.")[1] ||
                    data?.webiste?.split("http://www.")[1]?.split("/")[0] ||
                    data?.webiste?.split("https://")[1]?.split("/")[0] ||
                    data?.webiste?.split("http://")[1]?.split("/")[0] ||
                    data?.webiste}
                </a>
                <h2 className="animate__animated animate__fadeInUp mb-1 text-3xl font-bold dark:text-white lg:mt-1 lg:text-4xl">
                  {data?.name}
                </h2>
                <p className="animate__animated animate__fadeInUp text-base text-gray-400">
                  {data?.address}
                </p>
                <div className="animate__animated animate__fadeInUp mt-1 flex space-x-2">
                  <SecButton link={data?.website}>Visit Website</SecButton>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <h3 className="text-2xl font-bold text-gray-400 dark:text-white">
                  Frequently Asked Questions
                </h3>{" "}
                {dataLoading ? (
                  <div className="grid place-items-center pt-4">
                    <Loader />
                  </div>
                ) : (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {searchData?.answers?.slice(0, 4).map((answer) => (
                      <a
                        href={`https://www.google.com/search?q=${answer}`}
                        className="w-full rounded-md border-b py-1 px-3 text-lg text-black transition-all duration-200 hover:opacity-40 dark:border-gray-500 dark:text-white lg:border lg:text-base"
                        key={answer}
                        target={"_blank"}
                      >
                        {answer}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-y-2 pt-3">
                <h3 className="text-2xl font-bold text-gray-400 dark:text-white">
                  News
                </h3>
                {newsLoading ? (
                  <div className="grid place-items-center pt-4">
                    <Loader />
                  </div>
                ) : count <= 12 ? (
                  <div>
                    <div className="grid items-stretch justify-center gap-x-5 gap-y-6 md:grid-cols-4">
                      {searchNews?.entries?.slice(0, count).map((entry) => (
                        <NewsCard data={entry} key={entry.id} />
                      ))}
                    </div>

                    <div className="grid place-items-center pt-6">
                      <Btn classNames={"my-12 cursor-pointer"}>
                        <div
                          onClick={() => setCount(count + 12)}
                          className="bg-blue-400 px-5 py-[10px] text-base font-semibold capitalize text-black lg:text-lg "
                        >
                          Load More
                        </div>
                      </Btn>
                    </div>
                  </div>
                ) : (
                  <InfiniteScrolling
                    count={count}
                    next={() => {
                      setCount(count + 12);
                    }}
                    data={searchNews}
                  >
                    <div className="grid items-stretch justify-center gap-x-5 gap-y-6 md:grid-cols-4">
                      {searchNews?.entries?.map((entry) => (
                        <NewsCard data={entry} />
                      ))}
                    </div>
                  </InfiniteScrolling>
                )}
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default University;
