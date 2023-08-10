import { useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../../api/product";
import { useGetCategoryQuery } from "../../api/category";
import { useGetSubCategoriesQuery } from "../../api/subcategory";
import { useGetBrandsQuery } from "../../api/brands";
import FormBuilder from "../../components/Formbuilder";
import { multiFiles } from "../../api/api";
// type Inputs = {
//   name: string;
//   categoryId: string;
//   subCategoryId: string;
//   brandId: string;
//   price: number;
// };
const Products = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [subCategoryId, setSubCategoryId] = useState<number>(-1);
  const [brandId, setBrandId] = useState<number>(-1);
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [modal, setModal] = useState<boolean>(false);
  const [properties, setProperties] = useState([]);
  const { data = [] } = useGetProductsQuery("");
  const { data: category = [] } = useGetCategoryQuery("");
  const { data: subcategory = [] } = useGetSubCategoriesQuery("");
  const { data: brands = [] } = useGetBrandsQuery("");
  const [addProduct] = useAddProductMutation();

  console.log(data);

  const onSubmit = async () => {
    if (file.length == 0) return alert("Please select file");
    const formData = new FormData();
    for (const f of file) {
      formData.append("files", f);
    }
    const data = await multiFiles(formData);
    const arr = [];
    for (const img of data.img) {
      const obj = {
        type: img.mimetype,
        src: img.path,
      };
      arr.push(obj);
    }
    addProduct({
      name,
      categoryId: Number(categoryId),
      subCategoryId: Number(subCategoryId),
      brandId: Number(brandId),
      price: Number(price),
      media: arr,
      properties,
    });
  };
  return (
    <div>
      <h1 className="text-3xl mb-2">Product</h1>

      <button
        onClick={() => setModal(true)}
        // onClick={async () => {
        //   if (!file) return alert("Please select a file");
        //   const formData = new FormData();
        //   formData.append("file", file);
        //   const avatar = await singleFile(formData);

        //   addCategory({
        //     name: name,
        //     img: avatar.img,
        //   });
        // }}
      >
        add
      </button>

      <table className="border-separate w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Category</td>
            <td>SubCategory</td>
            <td>Brands</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((elem: { img: string; name: string; id: number }) => {
              return (
                <tr key={elem.id}>
                  <td>{elem.name}</td>
                  <td>{category.find((e) => e.id == elem.categoryId)?.name}</td>
                  <td>
                    {subcategory.find((e) => e.id == elem.subCategoryId)?.name}
                  </td>
                  <td>{brands.find((e) => e.id == elem.brandId)?.name}</td>
                  <td className="flex gap-x-4">
                    <button className="py-1 bg-[#fa6e6e] px-5 rounded-[20px] text-white text-[15px]">
                      delete
                    </button>
                    <button className="py-1 bg-[#a9e270] px-5 rounded-[20px] text-white text-[15px]">
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* modallAdd */}
      {modal && (
        <div
          id=""
          className=" w-full bg-[#00000078] h-screen fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
        >
          <div className="w-full h-screen transition-all max-w-full">
            <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Modal title
                </h3>
                <button
                  onClick={() => setModal(false)}
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  // data-hs-overlay="#hs-full-screen-modal"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3.5 h-3.5"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent) => setName(e.target.value)}
                    className="border"
                  />
                  <input
                    type="file"
                    multiple
                    onChange={(e: ChangeEvent) => setFile(e.target.files)}
                  />
                </div>
                <div>
                  <div className="flex py-5 items-center gap-x-10">
                    <select
                      onChange={(e: ChangeEvent) =>
                        setCategoryId(e.target.value)
                      }
                    >
                      {category.length > 0 &&
                        category.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      onChange={(e: ChangeEvent) =>
                        setSubCategoryId(e.target.value)
                      }
                    >
                      {subcategory.length > 0 &&
                        subcategory.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      onChange={(e: ChangeEvent) => setBrandId(e.target.value)}
                    >
                      {brands.length > 0 &&
                        brands.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    <input
                      type="number"
                      placeholder="Price"
                      className="border"
                      value={price}
                      onChange={(e: ChangeEvent) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  {properties.map((elem) => {
                    return (
                      <div
                        key={elem.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <div style={{ display: "flex", gap: 5 }}>
                          <input
                            className="border-2 px-1"
                            value={elem.name}
                            onChange={(e) => {
                              const copy = [
                                ...properties.map((item) => {
                                  if (item.id === elem.id) {
                                    item.name = e.target.value;
                                  }
                                  return item;
                                }),
                              ];
                              setProperties(copy);
                            }}
                          />
                          <button
                            className="border p-2"
                            color="error"
                            onClick={() => {
                              const copy = [
                                ...properties.filter(
                                  (item) => item.id !== elem.id
                                ),
                              ];
                              setProperties(copy);
                            }}
                          >
                            delete
                          </button>
                        </div>
                        <FormBuilder
                          key={elem.id}
                          setDisable={setDisabled}
                          fieldChange={(values) => {
                            setProperties((prev) => [
                              ...prev.map((item) => {
                                if (item.id === elem.id) {
                                  item.properties = values;
                                }
                                return item;
                              }),
                            ]);
                          }}
                        />
                      </div>
                    );
                  })}
                  <div className="flex">
                    <button
                      className="border px-3 bg-green-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        let obj = {
                          id: new Date().getTime(),
                          name: "",
                          properties: [],
                        };
                        const copy = [...properties, obj];
                        setProperties(copy);
                      }}
                    >
                      Add field
                    </button>
                  </div>
                </div>
                <div className="flex absolute bottom-0 w-full justify-end gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                  <button
                    onClick={() => setModal(false)}
                    className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-full-screen-modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={onSubmit}
                    style={
                      disabled
                        ? { backgroundColor: "gray" }
                        : { backgroundColor: "blue" }
                    }
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
