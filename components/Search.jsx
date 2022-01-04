import { Select } from "antd";

const Search = ({ children, handleChange }) => {
  return (
    <div>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder="Search University to Select"
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
