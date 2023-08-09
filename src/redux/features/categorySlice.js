import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryService from "../../api/category.service";


export const getCategories = createAsyncThunk("/getCategories", async ({rejectWithValue}) => {


    try {
        return await categoryService.getAllCategories();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});
export const getCategory = createAsyncThunk("categories/getCategory", async ({id}, {rejectWithValue}) => {
    try {
        return await categoryService.getCategoryByID(id);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        oneCategory: null,
        categories: [],
    },
    reducers: [],
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [getCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategories.rejected]: (state) => {
            state.loading = false;

        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.oneCategory = action.payload;
        },
        [getCategory.pending]: (state,action) => {
            state.loading=true;
        },
        [getCategory.rejected]: (state,action) => {
            state.loading=false;
        }
    }
});

export default categorySlice.reducer;