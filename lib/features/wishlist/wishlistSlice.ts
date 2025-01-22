import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  name: string;
  code: string;
  image: string;
  price: number;
}

export interface WishlistState {
  wishlistItems: WishlistItem[];
  totalWishlistItems: number;
}

const initialState: WishlistState = {
  wishlistItems: [],
  totalWishlistItems: 0,
};

export const wishlistSlice = createAppSlice({
  name: "wishlist",
  initialState,
  reducers: (create) => ({
    addProductToWishlist: create.reducer(
      (state, action: PayloadAction<WishlistItem>) => {
        const existingItem = state.wishlistItems.find(
          (item) => item.id === action.payload.id
        );
        if (!existingItem) {
          state.wishlistItems.push(action.payload);
          state.totalWishlistItems++;
        }
      }
    ),
    removeProductFromWishlist: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload
        );
        state.totalWishlistItems = state.wishlistItems.length;
      }
    ),
  }),
  selectors: {
    selectTotalWishlistItems: (wishlist) => wishlist.totalWishlistItems,
    selectWishlistItems: (wishlist) => wishlist.wishlistItems,
  },
});

export const { addProductToWishlist, removeProductFromWishlist } =
  wishlistSlice.actions;
export const { selectTotalWishlistItems, selectWishlistItems } =
  wishlistSlice.selectors;
