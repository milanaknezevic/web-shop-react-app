import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import messageSlice from "./features/messageSlice";

export default configureStore({
    reducer: {
        users: userSlice,
        categories: categorySlice,
        products: productSlice,
        messages: messageSlice,
    },
});