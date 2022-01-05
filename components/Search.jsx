import { Select } from "antd";

const Search = ({ children, handleChange, description }) => {
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
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChange}
      >
        {children}
      </Select>
    </div>
  );
};

export default Search;
