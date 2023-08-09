import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "../../api/message.service";
export const createMessage = createAsyncThunk("/message", async (messageData) => {
    return await messageService.insertMessage(messageData);
});

const messageSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: [],
    extraReducers:{
        [createMessage.fulfilled]: (state)=>{
            state.loading = false;
            state.error=null;
        },
        [createMessage.pending]: (state) => {
            state.loading = true;
        },
        [createMessage.rejected]: (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        }

    }
});

export default messageSlice.reducer;