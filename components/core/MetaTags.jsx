import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content="#00044e" />

      <title>
        Varsity PQ - Store House of 300+ curated past questions from 160
        universites in Nigeria.
      </title>
      <meta
        name="description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        name="keywords"
        content="past questions, jamb, university, past question, admission, universities, Varsity PQ by Isaac Nzekwe, varsitypq, VARSITYPQ, exam past questions"
      />
      <link rel="canonical" href="http://varsity-pq-frontend.vercel.app/" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />

      {/* Primary Meta Tags */}
      <meta
        name="title"
        content="Varsity PQ - Store House of 300+ Developer Cheatsheets"
      />
      <meta
        name="description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="http://varsity-pq-frontend.vercel.app/"
      />
      <meta
        property="og:title"
        content="Varsity PQ - Store House of 300+ Developer Cheatsheets"
      />
      <meta
        property="og:description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        property="og:image"
        content="https://varsity-pq-frontend.vercel.app/varsity-pq-banner.png"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="http://varsity-pq-frontend.vercel.app/"
      />
      <meta
        property="twitter:title"
        content="Varsity PQ - Store House of 300+ Developer Cheatsheets"
      />
      <meta
        property="twitter:description"
        content="Varsity PQ Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
      />
      <meta
        property="twitter:image"
        content="https://varsity-pq-frontend.vercel.app/varsity-pq-banner.png"
      />

      {/* Buy Me A Coffee
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="Isaac Nzekwe"
        data-description="Support me on Buy me a coffee!"
        data-message="If you're enjoying my app, consider supporting me with a coffee ☕️"
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></script> */}
    </Head>
  );
};

export default MetaTags;
