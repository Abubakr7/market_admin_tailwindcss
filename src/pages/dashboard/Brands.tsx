import { ChangeEvent, useState } from "react";
import { singleFile } from "../../api/api";
import { useAddBrandMutation, useGetBrandsQuery } from "../../api/brands";

const Brands = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const { data = [] } = useGetBrandsQuery(name);
  const [addBrand] = useAddBrandMutation();

  return (
    <div>
      <h1 className="text-3xl mb-2">Brands</h1>
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
      <button
        onClick={async () => {
          if (!file) return alert("Please select a file");
          const formData = new FormData();
          formData.append("file", file);
          const avatar = await singleFile(formData);

          addBrand({
            name: name,
            img: avatar.img,
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

export default Brands;
