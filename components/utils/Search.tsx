import { Select } from "antd";
import { Input, Space } from "antd";

const { Search } = Input;

interface SearchFilterProps {
  handleChange?: (value: any) => void | undefined;
  description?: React.ReactNode;
  disabled?: boolean | undefined;
  value?: any;
  width?: string | number;
  defaultValue?: any;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  children,
  handleChange,
  description,
  disabled,
  value,
  width = "420",
  defaultValue,
}) => {
  return (
    <>
      <Select<string | number, { value: string; children: string }>
        showSearch
        style={{ width: width }}
        placeholder={description}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA &&
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChange}
        disabled={disabled}
        value={value}
        className="text-base"
        defaultValue={defaultValue}
        size="large"
      >
        {children}
      </Select>
    </>
  );
};
