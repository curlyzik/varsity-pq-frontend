import React from "react";
import { FiTwitter } from "react-icons/fi";
import { Btn } from "..";

const TwitterBtn = () => {
  const twitterLink =
    "https://twitter.com/intent/tweet?url=http://varsity-pq-frontend.vercel.app/&text=Check%20out%20Varsity%20PQ,%20the%20all%20in%20one%20storehouse%20of%20past%20questions%20for%20universities%20across%20Nigeria";
  return (
    <Btn>
      <a
        href={twitterLink}
        target={"_blank"}
        className="flex text-base items-center justify-center rounded-md bg-[#1A91DA] px-3 py-2 font-semibold capitalize text-white hover:bg-[#0F84B4]"
      >
        Share to Twitter
        <FiTwitter className="ml-1" />
      </a>
    </Btn>
  );
};

export default TwitterBtn;
