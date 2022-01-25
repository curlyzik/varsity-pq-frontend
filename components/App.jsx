import React from "react";
import { useGetUniversitiesQuery } from "../src/services/university";
import AppHeader from "./utils/AppHeader";

const App = () => {
  const { data: universities, isLoading } = useGetUniversitiesQuery();

  return (
    <div className="bg-[#ECF2F5] pt-6">
      <AppHeader />
      {isLoading
        ? "Loading"
        : universities?.map((university) => <div>{university.name}</div>)}
    </div>
  );
};

export default App;
