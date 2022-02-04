import { App, Hero } from "../components/index";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-7 text-base">
      <Hero />
      <App />
    </div>
  );
}
