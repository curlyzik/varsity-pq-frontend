import React from "react";
import { SpinProps, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface TableComponentProps {
  columns: ColumnsType<any> | undefined;
  data: readonly any[] | undefined;
  scroll:
    | ({
        x?: string | number | true | undefined;
        y?: string | number | undefined;
      } & {
        scrollToFirstRowOnChange?: boolean | undefined;
      })
    | undefined;
  loading: boolean | SpinProps | undefined;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  scroll,
  loading,
}) => {
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
