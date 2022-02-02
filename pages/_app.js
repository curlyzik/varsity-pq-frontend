import { useEffect } from "react";
import { Provider } from "react-redux";
import Header from "../components/Header";
import { store } from "../src/app/store";
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
    <div className="font-body">
      <Provider store={store}>
          <Header />
          <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
