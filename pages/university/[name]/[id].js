import { useEffect, useState } from "react";
import { Select as PQSelect } from "../../../components/index";
import {
  useGetUniSearchQuery,
  useGetUniNewsQuery,
} from "../../../src/services/searchServices/uniDetailApi";

import { SecButton } from "../../../components/index";

const University = ({ pqs, uniData }) => {
  const searchTerm = uniData.name.split(",")[0];
  const { data: searchData } = useGetUniSearchQuery(searchTerm);
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

  console.log(searchData);

  return (
    <div className="bg-[#ECF2F5] p-10">
      <div className="flex gap-x-4 bg-white p-6">
        <div className="flex w-3/5 flex-col gap-y-7">
          <div className="border-b border-b-gray-300 pb-4">
            <a className="text-lg text-blue-400" href={link} target={"_blank"}>
              {link}
            </a>
            <h2 className="mt-1 mb-1 text-4xl font-bold">{uniData.name}</h2>
            <p className="text-base text-gray-400">{uniData.address}</p>
            <div className="mt-1 flex space-x-2">
              <SecButton link={link}>Visit Website</SecButton>
              <SecButton link={link}>Select Past Question</SecButton>
            </div>
          </div>

          <div className=" flex flex-col gap-y-2">
            <h3 className="text-2xl text-gray-400">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {searchData?.answers?.slice(0, 4).map((answer) => (
                <a
                  href={`https://www.google.com/search?q=${answer}`}
                  className="w-full border py-1 px-3"
                >
                  {answer}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-gray-400">News</h3>
          </div>
        </div>

        <div className="w-2/5 p-4">
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
