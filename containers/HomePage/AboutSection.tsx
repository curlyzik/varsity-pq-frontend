import React from "react";
import Button from "../../components/Homepage/Button";
import SectionTitle from "../../components/Homepage/SectionTitle";

const AboutSection = () => {
  return (
    <div className="flex flex-col gap-y-6 pb-36">
      <SectionTitle>
        We're making it easy for students to source for past questions across{" "}
        <span className="text-sky-600">Nigeria universities</span>
      </SectionTitle>

      <div className="px-60 pt-3 text-center text-slate-900">
        <p className=" mb-4 text-lg font-light leading-6">
          Varsity PQ is the all in one storehouse where students from various
          universities could find past questions to different courses of their
          discipline online.
        </p>
        <p className=" mb-8 text-lg font-light leading-6">
          Past questions are available to students from federal, state and
          private universities across Nigeria.
        </p>

        <p>
          <Button className="bg-sky-600 px-9 py-3 font-bold tracking-wide text-white hover:bg-sky-700">
            <a href="https://twitter.com/VarsityPq_" target={"_blank"}>
              Visit Twitter
            </a>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
