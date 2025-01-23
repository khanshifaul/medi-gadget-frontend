import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
}

export interface WishlistState {
  wishlistItems: WishlistItem[];
  totalWishlistItems: number;
  isWishlistOpen: boolean; // State to track if wishlist is open
}

const initialState: WishlistState = {
  wishlistItems: [],
  totalWishlistItems: 0,
  isWishlistOpen: false, // Default to closed
};

export const wishlistSlice = createAppSlice({
  name: "wishlist",
  initialState,
  reducers: (create) => ({
    // Add a product to the wishlist
    addProductToWishlist: create.reducer(
      (state, action: PayloadAction<WishlistItem>) => {
        const exists = state.wishlistItems.some(
          (item) => item.id === action.payload.id
        );
        if (!exists) {
          state.wishlistItems.push(action.payload);
          state.totalWishlistItems = state.wishlistItems.length;
        }
      }
    ),
    // Remove a product from the wishlist
    removeProductFromWishlist: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload
        );
        state.totalWishlistItems = state.wishlistItems.length;
      }
    ),
    // Toggle the wishlist open/close state
    toggleWishlist: create.reducer((state) => {
      state.isWishlistOpen = !state.isWishlistOpen;
    }),
    // Open the wishlist
    openWishlist: create.reducer((state) => {
      state.isWishlistOpen = true;
    }),
    // Close the wishlist
    closeWishlist: create.reducer((state) => {
      state.isWishlistOpen = false;
    }),
    // Clear all items in the wishlist
    clearWishlist: create.reducer((state) => {
      state.wishlistItems = [];
      state.totalWishlistItems = 0;
    }),
  }),
  selectors: {
    selectTotalWishlistItems: (wishlist: WishlistState) =>
      wishlist.totalWishlistItems,
    selectWishlistItems: (wishlist: WishlistState) => wishlist.wishlistItems,
    selectWishlistIsOpen: (wishlist: WishlistState) => wishlist.isWishlistOpen, // Selector for the open state
  },
});

export const {
  addProductToWishlist,
  removeProductFromWishlist,
  toggleWishlist,
  openWishlist,
  closeWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const {
  selectTotalWishlistItems,
  selectWishlistItems,
  selectWishlistIsOpen,
} = wishlistSlice.selectors;

export default wishlistSlice.reducer;
