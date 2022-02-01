import { useEffect, useState } from "react";
import { Select as PQSelect } from "../../../components/index";
import { useGetUniSearchQuery } from "../../../src/services/searchServices/uniSearchApi";

const University = ({ pqs, uniData }) => {
  const searchTerm = uniData.name.split(",")[0];
  const { data: searchData } = useGetUniSearchQuery(searchTerm);
  const [link, setLink] = useState("");

  // get university link
  const getUniLink = () => {
    if (!searchData?.results[0].link) {
      setLink(searchData?.results[1].link);
    } else {
      setLink(searchData?.results[0].link);
    }

    if (searchData?.results[0].link.includes("wikipedia")) {
      setLink(searchData?.results[1].link);
    } else {
      setLink(searchData?.results[0].link);
    }
  };
  useEffect(() => {
    getUniLink();
  });

  // get university description
  const description = !searchData?.results[0].description
    ? searchData?.results[1].description
    : searchData?.results[0].description;
  
  console.log(searchData)

  return (
    <div className="bg-[#ECF2F5] p-10">
      <div className="flex bg-white p-6">
        <div className="w-3/4">
          <div>
            <a className="text-lg text-blue-400" href={link} target={"_blank"}>
              {link}
            </a>
            <h2 className="text-4xl font-bold">{uniData.name}</h2>
            <p className="text-base text-gray-400">{uniData.address}</p>
            <a
              href={link}
              target={"_blank"}
              className="mt-4 inline-block border border-blue-400 px-4 py-2 text-lg font-bold text-blue-600 transition-all duration-300 hover:bg-blue-400 hover:text-white"
            >
              Visit Website
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-2">
            <PQSelect pqData={pqs} uniData={uniData} />
          </div>
        </div>
        <div className="w-1/4">Data</div>
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
