import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content="#00044e" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>
        Varsity PQ - Store House of 300+ curated past questions from 160
        universites in Nigeria.
      </title>
      <meta
        name="description"
        content="Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        name="keywords"
        content="past questions, jamb, university, past questions, admission, universities, varsity pq by Isaac Nzekwe, varsitypq.com, varsity pq, exam past questions, past-questions, materials"
      />
      <link rel="canonical" href="http://varsitypq.com/" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />

      {/* Primary Meta Tags */}
      <meta
        name="title"
        content="Varsity PQ - Store House of 300+ Past Questions"
      />
      <meta
        name="description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://varsitypq.com/" />
      <meta
        property="og:title"
        content="Varsity PQ - Store House of 300+ Past Questions"
      />
      <meta
        property="og:description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        property="og:image"
        content="https://varsitypq.com/varsity-pq-banner.png"
      />

      {/* Twitter */}
      <meta property="twitter:site" content="@VarsityPQ_" />
      <meta property="twitter:creator" content="@curlyzik" />
      <meta property="twitter:url" content="http://varsitypq.com/" />
      <meta
        property="twitter:title"
        content="Varsity PQ - Store House of 300+ Past Questions"
      />
      <meta
        property="twitter:description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        property="twitter:image"
        content="https://varsitypq.com/varsity-pq-banner.png"
      />
      <meta
        property="twitter:card"
        content="summary_large_image"
      />
    </Head>
  );
};

export default MetaTags;
