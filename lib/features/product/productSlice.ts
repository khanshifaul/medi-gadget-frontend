import { createAppSlice } from "@/lib/createAppSlice";

export interface ProductImage {
  id: string;
  name: string;
  url: string;
}

export interface ProductState {
  name: string;
  code: string;
  details: string;
  category: string;
  regularPrice: number;
  discount: number;
  offerPrice: number;
  images: ProductImage[];
}

const initialState: ProductState = {
  name: "",
  code: "",
  details: "",
  category: "",
  regularPrice: 0,
  discount: 0,
  offerPrice: 0,
  images: [],
};

export const productSlice = createAppSlice({
  name: "product",
  initialState,
  reducers: (create) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setProductName: create.reducer((state, action) => {}),
    setOfferPrice: create.reducer((state) => {
      state.offerPrice = state.regularPrice * (1 - state.discount / 100);
    }),
  }),
  selectors: {
    selectProductName: (product) => product.name,
  },
});

export const { setOfferPrice } = productSlice.actions;

export const { selectProductName } = productSlice.selectors;
