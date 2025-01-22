import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the interface for CartItem
export interface CartItem {
  id: string;
  name: string;
  sku: string | null;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalCartItems: number;
  totalPrice: number;
  isOpen: boolean;
}

// Export the function so it can be used in other modules
export const loadCartItemsFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const serializedCartItems = localStorage.getItem("cartItems");
      return serializedCartItems ? JSON.parse(serializedCartItems) : [];
    } catch (e) {
      console.error("Could not load cart items from local storage", e);
    }
  }
  return [];
};

const initialState: CartState = {
  cartItems: loadCartItemsFromLocalStorage(),
  totalCartItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Create the cart slice
export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    openCart: create.reducer((state) => {
      state.isOpen = true;
    }),
    closeCart: create.reducer((state) => {
      state.isOpen = false;
    }),
    addProductToCart: create.reducer(
      (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.cartItems.find(
          (item) => item.id === action.payload.id
        );

        if (existingItem) {
          existingItem.quantity++;
          existingItem.subtotal = existingItem.price * existingItem.quantity;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }

        state.totalPrice = state.cartItems.reduce(
          (acc, item) => acc + item.subtotal,
          0
        );
        state.totalCartItems = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    ),
    removeProductFromCart: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        state.totalPrice = state.cartItems.reduce(
          (acc, item) => acc + item.subtotal,
          0
        );
        state.totalCartItems = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    ),
    incrementProductQuantity: create.reducer(
      (state, action: PayloadAction<string>) => {
        const item = state.cartItems.find((item) => item.id === action.payload);
        if (item) {
          item.quantity++;
          item.subtotal = item.price * item.quantity;
        }
        state.totalPrice = state.cartItems.reduce(
          (acc, item) => acc + item.subtotal,
          0
        );
        state.totalCartItems = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    ),
    decrementProductQuantity: create.reducer(
      (state, action: PayloadAction<string>) => {
        const item = state.cartItems.find((item) => item.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity--;
          item.subtotal = item.price * item.quantity;
        }
        state.totalPrice = state.cartItems.reduce(
          (acc, item) => acc + item.subtotal,
          0
        );
        state.totalCartItems = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    ),
  }),
  selectors: {
    selectCartIsOpen: (cart) => cart.isOpen,
    selectTotalCartItems: (cart) => cart.totalCartItems,
    selectTotalPrice: (cart) => cart.totalPrice.toFixed(2),
    selectCartItems: (cart) => cart.cartItems,
  },
});

// Export the actions and reducer from the slice
export const {
  openCart,
  closeCart,
  addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
} = cartSlice.actions;

export const {
  selectCartIsOpen,
  selectTotalCartItems,
  selectTotalPrice,
  selectCartItems,
} = cartSlice.selectors;
