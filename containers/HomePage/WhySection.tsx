import React from "react";
import { Features } from "../../components";
import { features } from "../../components/features";

const WhySection = () => {
  return (
    <div className="flex flex-col gap-y-20 pb-36">
      <div className="mx-auto max-w-[890px] pt-20 text-center">
        <h3 className="text-5xl font-bold text-slate-900 md:leading-[3.60rem]">
          Why students choose <span className="text-sky-600">Varsity PQ</span>{" "}
          to source for past questions{" "}
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-x-9 gap-y-16">
        {features.map((feature) => (
          <Features
            icon={feature.icon}
            name={feature.name}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhySection;
