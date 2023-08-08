import { createSlice } from "@reduxjs/toolkit";

type TOption = {
  label: string;
  value: number;
};

export const slice = createSlice({
  name: "subcategory",
  initialState: {
    options: [],
  },
  reducers: {
    setOptions(state, action) {
      const brands = action.payload;
      for (const brand of brands) {
        const obj: TOption = {
          label: brand.name,
          value: brand.id,
        };
        state.options.push(obj);
      }
    },
  },
});

export const { setOptions } = slice.actions;

export default slice.reducer;
