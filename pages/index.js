import axios from "axios";
import Search from "../components/Search";

export default function Home({ data: universityList }) {
  return (
    <div className="flex flex-col gap-y-7">
      <h1 className="text-4xl">Uni Past Questions</h1>
      <div>
        {universityList.map((university, index) => (
          <h2 key={index}>{university.name}</h2>
        ))}
      </div>
      <Search />
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:8000/universities/");
  const data = res.data;
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
