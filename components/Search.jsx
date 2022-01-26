import { Select } from "antd";
import { Input, Space } from "antd";

const { Search } = Input;

export const SearchFilter = ({
  children,
  handleChange,
  description,
  disabled,
  value,
}) => {
  return (
    <div>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder={description}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA &&
          optionA.toLowerCase &&
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChange}
        disabled={disabled}
        value={value}
      >
        {children}
      </Select>
    </div>
  );
};

export const HideSelectedSearch = ({
  options,
  handleChange,
  selectedItems,
}) => {
  const OPTIONS = options;

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  console.log(filteredOptions);
  console.log(selectedItems);

  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={handleChange}
      style={{ width: "50%" }}
    >
      {filteredOptions.map((item) => (
        <Select.Option key={item.id} value={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export const SearchBar = () => {
  const onSearch = (value) => console.log(value.target.value);
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        onChange={onSearch}
        style={{ width: 350 }}
        size="large"
      />
    </div>
  );
};
