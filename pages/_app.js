import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../src/app/store";
import "../styles/globals.css";

import { Header, MetaTags } from "../components/index";

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
        <PersistGate loading={null} persistor={persistor}>
          <MetaTags />
          <Header />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
