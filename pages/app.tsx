import { NextPage } from "next";
import React from "react";
import { App, MainHeader } from "../components";

const Container: NextPage = () => {
  return (
    <div>
      <MainHeader />
      <App />
    </div>
  );
};

export default Container;
