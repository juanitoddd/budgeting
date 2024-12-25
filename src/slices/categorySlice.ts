import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cyan, magenta, gold, volcano } from '@ant-design/colors';

export interface Category {
    id: string,
    label: string,
    color: string[],
    value: number[]
  }

const initialState: Category[] =
[
  {id:'fixed', label:'Fixed costs', color: cyan, value:[0,50]}, 
  {id:'savings', label:'Savings', color: magenta, value:[50,60]}, 
  {id:'investment', label:'Investment', color: gold, value:[60,70]}, 
  {id:'free', label:'Free guilt spending', color: volcano, value:[70,100]}
];

export const categorySlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setValues: (state, action: PayloadAction<Category[]>) => {
      return action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      return state.concat(action.payload)
    },
  },
});

export const { setValues } = categorySlice.actions;

export default categorySlice.reducer;