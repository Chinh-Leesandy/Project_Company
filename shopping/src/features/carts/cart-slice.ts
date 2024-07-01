import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image : string;
  rating: {
    rate: string;
    count: string;
  };
  category : string;
};


interface CartItem {
  product: Product;
  quantity: number;
}

interface CartShopping {
  cart: CartItem[];
}

const initialState: CartShopping = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addToCart(state, action: PayloadAction<{product: Product, quantity: number}>){
      const {product, quantity} = action.payload;
      const existingCartItem = state.cart.find(item => item.product.id === product.id)
      if(existingCartItem){
        existingCartItem.quantity += quantity;
      }else {
        state.cart.push({product, quantity});
      }
    }, 
    updateQuantityToCart(state, action: PayloadAction<{product: Product, quantity: number}>){
      const {product, quantity} = action.payload;
      const existingCartItem = state.cart.find(item => item.product.id === product.id)
      if(existingCartItem){
        existingCartItem.quantity = quantity;
      }
    }, 
    deleteToCart(state, action: PayloadAction<{ productID: number }>) {
      const { productID } = action.payload;
      state.cart = state.cart.filter(item => item.product.id !== productID);
    },
  }
});

export const {addToCart, updateQuantityToCart, deleteToCart} = cartSlice.actions;
export default cartSlice.reducer;