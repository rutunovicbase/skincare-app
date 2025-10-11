import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDetailsData } from '../../Constant/types';

type OrderState = {
  data: OrderDetailsData | null;
  selectedAddress: any | null;
};

const initialState: OrderState = {
  data: null,
  selectedAddress: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderDetailsData | null>) => {
      state.data = action.payload;
    },
    clearOrderData: state => {
      state.data = null;
      state.selectedAddress = null;
    },
    setSelectedAddress: (state, action: PayloadAction<any | null>) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setOrderData, clearOrderData, setSelectedAddress } =
  orderSlice.actions;
export default orderSlice.reducer;
