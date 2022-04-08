import Script from "next/script";
import { DefaultSeo } from "next-seo";

const MetaTags: React.FC = () => {
  return (
    <>
      <DefaultSeo
        title="Varsity PQ - Store House of 300+ curated past questions from 160
          universites in Nigeria."
        defaultTitle="Varsity PQ - Store House of 300+ curated past questions from 160
          universites in Nigeria."
        description="Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria."
        canonical="https://varsitypq.com/"
        openGraph={{
          url: "https://varsitypq.com/",
          title:
            "Varsity PQ - Store House of 300+ curated past questions from 160 universites in Nigeria.",
          description:
            "Varsity PQ is the all in one storehouse where students from various universities could find past questions to different courses of their discipline online. Varsity PQ is made up of 300+ curated past questions from 170 universites in Nigeria.",
          images: [
            {
              url: "https://varsitypq.com/varsity-pq-banner.png",
              width: 689,
              height: 325,
              alt: "Isaac Nzekwe (curlyzik) avatar",
              type: "image/jpeg",
            },
          ],
          site_name:
            "Varsity PQ - Store House of 300+ curated past questions from 160 universites in Nigeria.",
        }}
        twitter={{
          handle: "@VarsityPQ_",
          site: "@VarsityPQ_",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            name: "keywords",
            content:
              "past questions, past questions in nigeria, nigerian universities, jamb, university, past questions, admission, universities, varsity pq by Isaac Nzekwe, varsitypq.com, varsity pq, exam past questions, past-questions, materials, varsitypq, varsity, varsities",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/favicon.png",
          },
        ]}
      />

      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
    </>
  );
};

export default MetaTags;
