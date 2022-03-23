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

  // const searchTerm = uniData.name.split(",")[0];
  // const { data: searchData, isLoading: dataLoading } =
  //   useGetUniSearchQuery(searchTerm);
  // const { data: searchNews, isLoading: newsLoading } =
  //   useGetUniNewsQuery(searchTerm);
  // const [link, setLink] = useState("");

  // const [count, setCount] = useState(12);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // get university link
  // const getUniLink = () => {
  //   if (!searchData?.results[0].link) {
  //     setLink(searchData?.results[1].link);
  //   } else {
  //     setLink(searchData?.results[0].link);
  //   }
  // };
  // useEffect(() => {
  //   getUniLink();
  // });

  return (
    <div className="overflow-hidden">
      <div className="bg-[#00044e] bg-opacity-60 p-6 dark:bg-[#111]">
        <Head>
          <title>{data?.name} - Varsity PQ</title>
        </Head>
        {/* modal to select past question for moblie view */}
        <div className="lg:hidden">
          <Modal
            isModalVisible={isModalVisible}
            handleOk={() => setIsModalVisible(false)}
            handleCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <div className="mt-3 flex flex-col justify-center gap-y-4">
              <PQSelect uniData={data} width={326} />
            </div>
          </Modal>
        </div>

        <div className="flex flex-col gap-x-4 lg:flex-row">
          <div className="flex flex-col gap-y-7 rounded-md bg-white p-7 dark:bg-black lg:w-3/5">
            {isLoading ? (
              <Spin />
            ) : (
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
                    <button
                      onClick={() => setIsModalVisible(true)}
                      className="mt-4 inline-block rounded-md border border-blue-400 px-2 py-2 text-base font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white lg:hidden lg:px-4 lg:text-lg"
                    >
                      Select Past Question
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <h3 className="text-2xl font-semibold text-gray-400">
                    Frequently Asked Questions
                  </h3>
                  <p className="dark:text-white">Coming Soon</p>

                  {/* {dataLoading ? (
              <div className="grid place-items-center pt-4">
                <Loader />
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {searchData?.answers?.slice(0, 4).map((answer) => (
                  <a
                    href={`https://www.google.com/search?q=${answer}`}
                    className="w-full rounded-md border-b py-1 px-3 text-lg text-black lg:border lg:text-base"
                    key={answer}
                    target={"_blank"}
                    data-aos="fade-left"
                  >
                    {answer}
                  </a>
                ))}
              </div>
            )} */}
                </div>

                <div className="mt-3 flex flex-col gap-y-2 pt-3">
                  <h3 className="text-2xl font-semibold text-gray-400">News</h3>
                  <p className="dark:text-white">Coming Soon</p>
                  {/* {newsLoading ? (
              <div className="grid place-items-center pt-4">
                <Loader />
              </div>
            ) : count <= 12 ? (
              <div>
                <div className="grid items-stretch justify-center gap-x-5 gap-y-6 lg:grid-cols-3">
                  {searchNews?.entries?.slice(0, count).map((entry) => (
                    <NewsCard data={entry} key={entry.id} />
                  ))}
                </div>

                <div className="grid place-items-center">
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
                <div className="grid items-stretch justify-center gap-x-5 gap-y-6 lg:grid-cols-3">
                  {searchNews?.entries?.map((entry) => (
                    <NewsCard data={entry} />
                  ))}
                </div>
              </InfiniteScrolling>
            )} */}
                </div>
              </>
            )}
          </div>

          <div className="hidden self-start rounded-md bg-white p-7 pt-9 dark:bg-black lg:block lg:w-2/5">
            <div className="pt-4 text-4xl font-semibold dark:text-white">
              Select Past Question
            </div>
            <div className="mt-6 flex flex-col justify-center gap-y-4">
              <PQSelect uniData={data} width={450} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default University;
