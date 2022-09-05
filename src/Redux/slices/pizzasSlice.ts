import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: number;
};

export const fetchPizzas = createAsyncThunk<IPizza, TParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<IPizza>(
            `https://63051ff2697408f7edc23a12.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        return data;
    },
);

type TPizza = {
    id: string;
    title: string;
    price: number;
    type: number[];
    size: number[];
    imageUrl: string;
    rating: number;
    itemsCount: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'erorr',
}

interface IPizza {
    items: TPizza[];
    itemsCount: number;
    status: Status;
}

const initialState: IPizza = {
    items: [],
    itemsCount: 0,
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IPizza>) {
            state.items = action.payload.items;
        },
        setItemsCount(state, action: PayloadAction<IPizza>) {
            state.itemsCount = action.payload.itemsCount;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.itemsCount = action.payload.itemsCount;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const selectPizza = (state: RootState) => state.pizza;

export const countPizzaSelector = (state: RootState) => state.pizza.itemsCount;

export const { setItems, setItemsCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
