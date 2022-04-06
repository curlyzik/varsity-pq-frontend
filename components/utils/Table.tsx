import React from "react";
import { Table } from "antd";

const TableComponent = ({ columns, data, scroll, loading }) => {
  return (
    <div>
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        scroll={scroll}
      />
    </div>
  );
};

export default TableComponent;
