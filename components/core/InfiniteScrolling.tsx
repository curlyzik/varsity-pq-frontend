import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrolling = ({ next, count, data, children }) => {
  return (
    <InfiniteScroll
      dataLength={count}
      next={next}
      hasMore={count >= data?.length ? false : true}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrolling;
