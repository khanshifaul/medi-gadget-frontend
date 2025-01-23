import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

interface CompareState {
  compareItemIds: string[];
}

const initialState: CompareState = {
  compareItemIds: [],
};

export const compareSlice = createAppSlice({
  name: "compare",
  initialState,
  reducers: {
    addProductToCompare(state, action: PayloadAction<string>) {
      // Ensure no more than 3 product IDs are added to the compare list
      if (state.compareItemIds.length < 3) {
        state.compareItemIds.push(action.payload);
      }
    },
    removeProductFromCompare(state, action: PayloadAction<string>) {
      // Remove a product ID from the comparison list
      state.compareItemIds = state.compareItemIds.filter(
        (id) => id !== action.payload
      );
    },
    clearCompareList(state) {
      // Clear all product IDs from the compare list
      state.compareItemIds = [];
    },
  },
  selectors: {
    selectCompareItemIds: (state: CompareState) => state.compareItemIds,
    selectCompareCount: (state: CompareState) => state.compareItemIds.length,
  },
});

export const {
  addProductToCompare,
  removeProductFromCompare,
  clearCompareList,
} = compareSlice.actions;
export const { selectCompareItemIds, selectCompareCount } =
  compareSlice.selectors;
