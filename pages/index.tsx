import { NextPage } from "next";
import HomePage from "../containers/HomePage";

const Home: NextPage = () => {
  return (
    <div className="bg-[#f5f6fa] px-28 pt-36 font-poppins">
      <HomePage />
    </div>
  );
};

export default Home;
