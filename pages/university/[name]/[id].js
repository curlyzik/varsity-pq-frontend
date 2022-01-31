
import { Select as PQSelect } from "../../../components/index";



import { useRouter } from "next/router";

const University = ({ pqs }) => {
  const router = useRouter();

  return (
    <div>
      <PQSelect pqData={pqs} />
    </div>
  );
};

export default University;

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/past_question/`);
  const data = await res.json();
  return {
    props: {
      pqs: data,
    },
  };
};
