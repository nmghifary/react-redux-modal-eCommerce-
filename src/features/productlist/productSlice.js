import { createSlice } from "@reduxjs/toolkit";
import sortData from "./sortData";

const initialState = {
    productItems: [],
    filteredProducts: [],
    categoryItems: [],
    filteredCategories: [],
    sortedType: "",
    searchKeyword: "",
    filteredBookmark: false,
};

const getFilteredProducts = (state) => {
    let tempDatas = [];
    if (state.keywordSearch !== "") {
        tempDatas = state.productItems.filter(item => item.title.toLowerCase().includes(state.searchKeyword.toLowerCase()));
    } else {
        tempDatas = state.productItems
    }

    if (state.filteredBookmark) {
        tempDatas = tempDatas.filter(item => item.bookmark === true);
    }

    if (state.filteredCategories.length !== 0) {
        tempDatas = tempDatas.filter(item => state.filteredCategories.includes(item.category));
    }

    state.filteredProducts = sortData(tempDatas, state.sortedType)
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        storeProduct: (state, action) => {
            const newItem = action.payload;
            state.productItems = newItem.map((item) => {
                return {
                    ...item,
                    bookmark: false
                }
            })
            state.filteredProducts = state.productItems
            state.categoryItems = [...new Set(newItem.map(item => item.category))];
        },
        filterByCatagories: (state, action) => {
            const newCategory = action.payload;
            const selectCategoriesIndex = state.filteredCategories.findIndex(category => category === newCategory);

            if (selectCategoriesIndex === -1) {
                state.filteredCategories.push(newCategory);
            } else {
                state.filteredCategories.splice(selectCategoriesIndex, 1);
            }

            getFilteredProducts(state);
        },
        sortingProducts: (state, action) => {
            state.filteredProducts = sortData(state.filteredProducts, action.payload)
            state.sortedType = action.payload;
        },
        searchProduct: (state, action) => {
            const keyword = action.payload.toLowerCase();
            state.searchKeyword = keyword;

            getFilteredProducts(state);
        },
        storeBookmark: (state, action) => {
            const newItem = action.payload

            state.productItems.forEach((product) => {
                if (product.id === newItem.id) {
                    product.bookmark = !product.bookmark
                }
            });
            state.filteredProducts = state.productItems
        },
        filterByBookmark: (state) => {
            state.filteredBookmark = !state.filteredBookmark

            getFilteredProducts(state);
        }
    },
});

export const { storeProduct, filterByCatagories, sortingProducts, searchProduct, storeBookmark, filterByBookmark } = productSlice.actions;

export default productSlice;

// Selector
export const selectProductItems = state => state.product.productItems;
export const selectFilteredProducts = state => state.product.filteredProducts;
export const selectCategories = state => state.product.categoryItems;
export const selectFilteredCategories = state => state.product.filteredCategories;
export const selectSortedType = state => state.product.sortedType;
export const selectSearchKeyword = state => state.product.searchKeyword;
export const selectFilteredBookmark = state => state.product.filteredBookmark;
