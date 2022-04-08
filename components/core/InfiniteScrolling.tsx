import { Spin } from "antd";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollingProps {
  next: () => void;
  count: number;
  data: any;
}

const InfiniteScrolling: React.FC<InfiniteScrollingProps> = ({
  next,
  count,
  data,
  children,
}) => {
  return (
    <InfiniteScroll
      dataLength={count}
      next={next}
      hasMore={count >= data?.length ? false : true}
      loader={<Spin />}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrolling;
