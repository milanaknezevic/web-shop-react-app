import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import messageService from "../../api/message.service";

export const createMessage= createAsyncThunk("messages/createMessage", async ({messageData}, {rejectWithValue}) => {
    try {
        return await messageService.insertMessage(messageData);
    } catch (err) {
        return rejectWithValue("Error while adding new message. Please try later.");
    }
});

const messageSlice = createSlice({
    name:'messages',
    initialState: {},
    reducers: {},
    extraReducers: {
        [createMessage.fulfilled]: (state) => {
            state.loading=false;
            state.error=null;
        },
        [createMessage.pending]: (state) => {
            state.loading=true;
        },
        [createMessage.rejected]: (state) => {
            state.loading=false;
        }
    }


})

export default messageSlice.reducer;