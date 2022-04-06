import { App, Hero } from "../components/index";

export default function Home() {
  return (
    <div className="flex flex-col text-base">
      <Hero />
      <App />
    </div>
  );
}
