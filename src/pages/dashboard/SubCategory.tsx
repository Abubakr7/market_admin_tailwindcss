import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { singleFile } from "../../api/api";
import { useGetBrandsQuery } from "../../api/brands";
import { useGetCategoryQuery } from "../../api/category";
import {
  useAddSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "../../api/subcategory";
import Select from "react-tailwindcss-select";

const SubCategory = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const options = useSelector(({ subcategory }) => subcategory.options);
  const { data = [] } = useGetSubCategoriesQuery(name);
  const { data: categories = [] } = useGetCategoryQuery("");
  const { data: brands = [] } = useGetBrandsQuery("");
  const [addSubCategory] = useAddSubCategoryMutation();
  const [value, setValue] = useState("-1");
  const [value1, setValue1] = useState();
  return (
    <div>
      <h1 className="text-3xl mb-2">Sub Category</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border"
      />
      <input
        type="file"
        onChange={(e: ChangeEvent) => setFile(e.target.files[0])}
      />
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="-1">Choose category</option>
        {categories.length > 0 &&
          categories.map((elem: { id: number; name: string; img: string }) => {
            return (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            );
          })}
      </select>
      {brands.length > 0 && (
        <Select
          value={value1}
          isMultiple={true}
          onChange={(value) => {
            setValue1(value);
          }}
          options={options}
        />
      )}
      <button
        onClick={async () => {
          if (!file) return alert("Please select a file");
          const formData = new FormData();
          formData.append("file", file);
          const avatar = await singleFile(formData);
          const arr = [];
          for (const v of value1) {
            arr.push(v.value);
          }
          addSubCategory({
            name: name,
            img: avatar.img,
            brands: arr,
            categoryId: value,
          });
        }}
      >
        add
      </button>

      {data.length > 0 &&
        data.map((elem: { img: string; name: string; id: number }) => {
          return (
            <div key={elem.id}>
              <img
                src={import.meta.env.VITE_APP_FILES_URL + elem.img}
                width={32}
                height={32}
                alt=""
              />
              {elem.name}
            </div>
          );
        })}
    </div>
  );
};

export default SubCategory;
