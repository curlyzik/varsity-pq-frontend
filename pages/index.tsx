import { NextPage } from "next";
import { App, Hero } from "../components/index";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col text-base">
      <Hero />
      <App />
    </div>
  );
};

export default Home;
