import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TItems = {
    id: string;
    title: string;
    price: number;
    type: string;
    size: number;
    count: number;
    imageUrl: string;
};

interface ICart {
    totalPrice: number;
    items: TItems[];
}

const initialState: ICart = {
    totalPrice: 0,
    items: [],
};

const calcTotalPrice = (items: TItems[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TItems>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCartItemByID = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
