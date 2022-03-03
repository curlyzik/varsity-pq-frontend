import React from "react";
import { Table, Tag, Space } from "antd";

const TableComponent = ({ columns, data, scroll }) => {
  return (
    <div>
      <Table dataSource={data} columns={columns} scroll={scroll} />
    </div>
  );
};

export default TableComponent;
