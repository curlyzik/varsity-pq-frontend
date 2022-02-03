import { useEffect, useState } from "react";
import { Select as PQSelect } from "../../../components/index";
import {
  useGetUniSearchQuery,
  useGetUniNewsQuery,
} from "../../../src/services/searchServices/uniDetailApi";

import { SecButton } from "../../../components/index";

const University = ({ pqs, uniData }) => {
  const searchTerm = uniData.name.split(",")[0];
  const { data: searchData, isLoading: dataLoading } =
    useGetUniSearchQuery(searchTerm);
  const { data: searchNews } = useGetUniNewsQuery(searchTerm);
  const [link, setLink] = useState("");

  // get university link
  const getUniLink = () => {
    if (!searchData?.results[0].link) {
      setLink(searchData?.results[1].link);
    } else {
      setLink(searchData?.results[0].link);
    }

    // if (searchData?.results[0].link.includes("wikipedia")) {
    //   setLink(searchData?.results[1].link);
    // } else {
    //   setLink(searchData?.results[0].link);
    // }
  };
  useEffect(() => {
    getUniLink();
  });

  console.log(searchNews);

  return (
    <div className="bg-[#ECF2F5] p-6">
      <div className="flex flex-col gap-x-4 rounded-md bg-white p-7 lg:flex-row">
        <div className="flex flex-col gap-y-7 lg:w-3/5">
          <div className="border-b border-b-gray-300 pb-5">
            <a className="text-lg text-blue-400" href={link} target={"_blank"}>
              {link.split("https://www.")[1].split("/")[0]}
            </a>
            <h2 className="mb-1 text-2xl font-bold lg:mt-1 lg:text-4xl">
              {uniData.name}
            </h2>
            <p className="text-sm text-gray-400 lg:text-base">
              {uniData.address}
            </p>
            <div className="mt-1 flex space-x-2">
              <SecButton link={link}>Visit Website</SecButton>
              <SecButton className={"hidden lg:flex"} link={link}>
                Select Past Question
              </SecButton>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg text-gray-400 lg:text-2xl">
              Frequently Asked Questions
            </h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {searchData?.answers?.slice(0, 4).map((answer) => (
                <a
                  href={`https://www.google.com/search?q=${answer}`}
                  className="w-full border-b py-1 px-3 text-black lg:border"
                  key={answer}
                >
                  {answer}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2 pt-3">
            <h3 className="text-lg text-gray-400 lg:text-2xl">News</h3>
            <div className="grid items-stretch justify-center gap-x-5 gap-y-6 lg:grid-cols-3">
              {searchNews?.entries?.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col rounded-md border px-3 pt-3 pb-4"
                >
                  <h3 className="mb-2 text-base font-semibold">
                    {entry.title.substr(0, 50)}...
                  </h3>
                  <p className="mb-7 italic text-gray-500">{entry.published}</p>
                  <div>
                    <a
                      href={entry.link}
                      target={"_blank"}
                      className="grid place-items-center rounded border py-2 px-3 hover:text-blue-500"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden p-4 lg:block lg:w-2/5">
          <div className="pt-4 text-4xl font-semibold">
            Select Past Question
          </div>
          <div className="items-cnter mt-6 flex flex-col justify-center gap-y-4">
            <PQSelect pqData={pqs} uniData={uniData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default University;

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/past_question/`);
  const uniRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/universities/${params.id}/`
  );

  const data = await res.json();
  const uniData = await uniRes.json();
  return {
    props: {
      pqs: data,
      uniData,
    },
  };
};

export const getStaticPaths = async () => {
  const uniRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/universities/`
  );
  const uniData = await uniRes.json();

  // Get the paths we want to pre-render based on uniData
  const paths = uniData.map((university) => ({
    params: { name: university.name, id: university.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
