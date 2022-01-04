import Search from "../components/Search";
import { Select } from "antd";
import { useState } from "react";
import { useGetUniversitiesQuery } from "../src/services/university";
const { Option } = Select;

export default function Home() {
  const { data, error, isLoading } = useGetUniversitiesQuery();
  const [value, setValue] = useState("")

  console.log(data);

  const handleChange = (value) => {
    console.log(value);
    setValue(value)
    console.log(value)
  };
  return (
    <div className="flex flex-col gap-y-7">
      <h1 className="text-4xl">Select Past Question</h1>
      <div className="flex gap-3">
        <Search handleChange={handleChange}>
          {isLoading
            ? "loading"
            : data.map((university) => (
                <Option key={university.id} value={university.name}>
                  {university.name}
                </Option>
              ))}
        </Search>
      </div>
    </div>
  );
}
