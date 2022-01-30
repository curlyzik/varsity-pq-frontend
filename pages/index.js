import App from "../components/App";
import Hero from "../components/Hero";

export default function Home({ pqs }) {
  return (
    <div className="flex flex-col gap-y-7 text-base">
      <Hero />
      <App />
    </div>
  );
}
