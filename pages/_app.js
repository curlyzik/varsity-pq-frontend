import { useEffect } from "react";
import { Provider } from "react-redux";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { store } from "../src/app/store";
import 'antd/dist/antd.css';
import "../styles/globals.css";

import AOS from "aos";
import "aos/dist/aos.css";

// for smooth animation
import "animate.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <Provider store={store}>
        <Header />
        <Hero />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
