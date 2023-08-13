import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import messageSlice from "./features/messageSlice";

export const store2 = configureStore({
    reducer:{
        messages:messageSlice,
        users:userSlice,
        categories:categorySlice,
        products:productSlice,
    }
});