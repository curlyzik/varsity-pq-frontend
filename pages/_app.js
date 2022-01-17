import { Provider } from "react-redux";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { store } from "../src/app/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
