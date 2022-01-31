import { Select as PQSelect } from "../../../components/index";

const University = ({ pqs, uniData }) => {
  return (
    <div>
      <PQSelect pqData={pqs} uniData={uniData} />
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
