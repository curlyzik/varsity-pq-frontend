import React from "react";
import { Features } from "../../components";
import { features } from "../../components/features";
import SectionTitle from "../../components/Homepage/SectionTitle";

const WhySection = () => {
  return (
    <div className="flex flex-col gap-y-20 pb-36">
      <SectionTitle>
        Why students choose <span className="text-sky-600">Varsity PQ</span> to
        source for past questions{" "}
      </SectionTitle>

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
