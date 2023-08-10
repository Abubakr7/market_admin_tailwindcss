import { useState } from "react";

type TProp = {
  key: string;
  value: string;
};

type TProperties = {
  id: number;
  name: string;
  properties?: TProp[];
};

type TFromBuilderProps = {
  fieldChange: () => void;
  setDisable?: () => void;
  properties?: TProperties[];
};

const FormBuilder = (props: TFromBuilderProps) => {
  const { setDisable } = props;
  const [properties, setProperties] = useState(props.properties || []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      {properties.length > 0 &&
        properties.map((elem) => {
          return (
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <input
                placeholder="key"
                value={elem.key}
                onChange={(e) => {
                  const prop = {
                    ...properties.find((el) => el.id === elem.id),
                  };
                  prop.key = e.target.value;

                  const copy = [
                    ...properties.map((el) => {
                      if (el.id === prop.id) {
                        return prop;
                      }
                      return el;
                    }),
                  ];
                  setProperties(copy);
                }}
              />
              <input
                value={elem.value}
                placeholder="value"
                onChange={(e) => {
                  const prop = {
                    ...properties.find((el) => el.id === elem.id),
                  };
                  prop.value = e.target.value;

                  const copy = [
                    ...properties.map((el) => {
                      if (el.id === prop.id) {
                        return prop;
                      }
                      return el;
                    }),
                  ];
                  setProperties(copy);
                }}
              />

              <button
                color="error"
                onClick={() => {
                  const copy = [
                    ...properties.filter((item) => item.id !== elem.id),
                  ];
                  setProperties(copy);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      <div style={{ display: "flex", gap: 5 }}>
        <button
          className="border px-3 bg-green-500"
          onClick={(e) => {
            e.stopPropagation();
            let obj = {
              id: new Date().getTime(),
              key: "",
              value: "",
            };
            const copy = [...properties, obj];
            setProperties(copy);
            setDisable(true);
          }}
        >
          Add
        </button>
        <button
          className="border px-3 bg-green-500"
          onClick={() => {
            // fieldChange(properties);
            setDisable(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
