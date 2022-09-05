import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortProperty {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type TSort = {
    name: string;
    sortProperty: SortProperty;
};

interface IFilters {
    categoryId: number;
    searchValue: string;
    currentPage: number;
    sort: TSort;
}

const initialState: IFilters = {
    categoryId: 0,
    searchValue: '',
    currentPage: 1,
    sort: {
        name: 'популярности (ASC)',
        sortProperty: SortProperty.RATING_DESC,
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },

        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },

        setSort(state, action: PayloadAction<TSort>) {
            state.sort = action.payload;
        },

        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setFilters(state, action: PayloadAction<IFilters>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortProperty.RATING_DESC,
                };
            }
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
