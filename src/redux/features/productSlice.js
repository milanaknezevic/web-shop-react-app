import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryService from "../../api/category.service";
import userService from "../../api/user.service";
import productService from "../../api/product.service";
import authService from "../../api/auth.service";

export const getProductsInCategory = createAsyncThunk("categories/getProducts", async ({
                                                                                           id,
                                                                                           page
                                                                                       }, {rejectWithValue}) => {
    try {
        return await categoryService.getAllProductsInCategory(id, page);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const getAllProductsForBuyer = createAsyncThunk("getProductForBuyer/", async ({ pageNumber, pageSize }, {rejectWithValue}) => {
    try {
        return await userService.getAllProductsForBuyer(pageNumber, pageSize);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});
export const getAllProductsForSeller = createAsyncThunk("getProductForSeller/", async ({ pageNumber, pageSize,finished }, {rejectWithValue}) => {
    try {
        return await userService.getAllProductsForSeller(pageNumber, pageSize,finished);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const getProductByID = createAsyncThunk("getProductByID/", async ({
                                                                             id
                                                                         }, {rejectWithValue}) => {
    try {
        return await productService.getProductByID(id);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


export const getAllProducts = createAsyncThunk("getProducts/", async ({ pageNumber, pageSize,naslov }, { rejectWithValue }) => {
    try {
        return await productService.getAllProducts(pageNumber, pageSize,naslov);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});
export const searchProducts = createAsyncThunk("searchProducts/", async ({ pageNumber, pageSize, searchData}, {rejectWithValue}) => {
    try {
        return await productService.searchProducts(pageNumber, pageSize, searchData);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


export const insertProduct = createAsyncThunk("insertProduct/", async ({
                                                                           productData
                                                                       }, {rejectWithValue}) => {
    try {
        return await productService.insertProduct(productData);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const sendQuestion = createAsyncThunk("sendQuestion/", async ({
                                                                         id, questionData
                                                                     }, {rejectWithValue}) => {
    try {
        return await productService.sendQuestion(id, questionData);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const sendAnswer = createAsyncThunk("sendAnswer/", async ({
                                                                     id, answerData
                                                                 }, {rejectWithValue}) => {
   console.log("redux id " + id + " answerdata " + JSON.stringify(answerData));
    try {
        return await productService.sendAnswer(id, answerData);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const deleteProduct = createAsyncThunk("deleteProduct/", async ({
                                                                           id
                                                                       }, {rejectWithValue}) => {
    try {
        return await productService.deleteProduct(id);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


export const purchaseProduct = createAsyncThunk("purchaseProduct/", async ({
                                                                               id
                                                                           }, {rejectWithValue}) => {
    try {
        return await productService.purchaseProduct(id);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

const removeProductFunc = (state) => {
    state.oneProduct = null;
}

const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        oneProduct: null,
        products: []
    },
    reducers:{
        removeProduct:removeProductFunc
    },
    extraReducers: {
        [getProductsInCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getProductsInCategory.pending]: (state) => {
            state.loading = true;
        },
        [getProductsInCategory.rejected]: (state) => {
            state.loading = false;

        },
        [getAllProductsForSeller.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getAllProductsForSeller.pending]: (state) => {
            state.loading = true;
        },
        [getAllProductsForSeller.rejected]: (state) => {
            state.loading = false;

        },
        [getAllProductsForBuyer.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getAllProductsForBuyer.pending]: (state) => {
            state.loading = true;
        },
        [getAllProductsForBuyer.rejected]: (state) => {
            state.loading = false;

        },
        [getProductByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.oneProduct = action.payload;
        },
        [getProductByID.pending]: (state) => {
            state.loading = true;
        },
        [getProductByID.rejected]: (state) => {
            state.loading = false;

        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getAllProducts.pending]: (state) => {
            state.loading = true;
        },
        [getAllProducts.rejected]: (state) => {
            state.loading = false;

        },
        [insertProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.oneProduct = action.payload;
        },
        [insertProduct.pending]: (state) => {
            state.loading = true;
        },
        [insertProduct.rejected]: (state) => {
            state.loading = false;

        },
        [sendQuestion.fulfilled]: (state) => {
            state.loading = false;
        },
        [sendQuestion.pending]: (state) => {
            state.loading = true;
        },
        [sendQuestion.rejected]: (state) => {
            state.loading = false;

        },
        [sendAnswer.fulfilled]: (state) => {
            state.loading = false;
        },
        [sendAnswer.pending]: (state) => {
            state.loading = true;
        },
        [sendAnswer.rejected]: (state) => {
            state.loading = false;

        },
        [deleteProduct.fulfilled]: (state) => {
            state.loading = false;
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.rejected]: (state) => {
            state.loading = false;

        },
        [searchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [searchProducts.pending]: (state) => {
            state.loading = true;
        },
        [searchProducts.rejected]: (state) => {
            state.loading = false;

        },
        [purchaseProduct.fulfilled]: (state) => {
            state.loading = false;

        },
        [purchaseProduct.pending]: (state) => {
            state.loading = true;
        },
        [purchaseProduct.rejected]: (state) => {
            state.loading = false;

        },
    }

})

export const {removeProduct} = productSlice.actions
export default productSlice.reducer;