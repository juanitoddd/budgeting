import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputState {
  income: number,
  currency: string
}

const initialState: InputState =
{
  income: 0,
  currency: '€'
}

export const inputSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
      state.income = action.payload      
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload      
    },   
  },
});

export const { setIncome, setCurrency } = inputSlice.actions;

export default inputSlice.reducer;