import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../src/app/store";
import "../styles/globals.css";

// for cropper js
import "cropperjs/dist/cropper.css";

import { Header, MetaTags } from "../components/index";

import AOS from "aos";
import "aos/dist/aos.css";

// for smooth animation
import "animate.css";

function MyApp({ Component, pageProps, ...appProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("darkMode")) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    } else {
      setDarkMode(false);
      window.localStorage.setItem("darkMode", false);
    }
  }, []);

  useEffect(() => {
    AOS.init();
  });

  // exclude navbar from dashboard
  const getContent = () => {
    if (
      [
        "/dashboard",
        "/dashboard/create-course",
        "/dashboard/create-pastquestion",
        "/dashboard/courses",
        "/dashboard/settings",
        "/dashboard/pastquestions",
      ].includes(appProps.router.pathname)
    ) {
      return <Component {...pageProps} />;
    }

    return (
      <>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Component {...pageProps} />
      </>
    );
  };

  return (
    <div className={`font-body ${darkMode ? "dark" : "light"}`}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MetaTags />
          {getContent()}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
