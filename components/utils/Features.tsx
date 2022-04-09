import React from "react";

const Features: React.FC<{
  icon: JSX.Element;
  name: string;
  description: string;
}> = ({ icon, name, description }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div>{icon}</div>
      <div className="text-lg font-medium">{name}</div>
      <div className=" text-base leading-7 text-slate-600">{description}</div>
    </div>
  );
};

export default Features;
