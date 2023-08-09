import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../api/user.service";
import authService from "../../api/auth.service";

export const login = createAsyncThunk("/login", async (loginData) => {
    return await authService.login(loginData);
});

export const signUp = createAsyncThunk("/signUp", async (signUpData) => {
    return await authService.signUp(signUpData);
});

export const activateAccount = createAsyncThunk("/acctivate-data", async (activationData) => {
    return await authService.activateAccount(activationData);
});

export const getUser = createAsyncThunk("/getUser", async (id) => {
    return await userService.getUserByID(id);
});
export const updateUser = createAsyncThunk("/updateUser", async (id, userDataToUpdate) => {

    return await userService.updateUser(id, userDataToUpdate);
});

export const changePassword = createAsyncThunk("/changePassword", async (id, changePasswordData) => {

    return await userService.changePassword(id, changePasswordData);
});
const logoutAction = (state) => {
    state.authenticated = false;
    state.loading = false;
    state.user = null;
    authService.logout();
}
const onSuccessAuth = (state, action) => {
    state.authenticated = true;
    state.authenticationFailed = false;
    state.loading = false;
};
const userSlice = createSlice({
    name: 'user',
    initialState: {
        authenticated: false,
        authenticatedFailed: false,
        loading: false,
        user: null,
    },
    reducers: {
        logout: logoutAction,
    },
    extraReducers: {
        [login.fulfilled]: onSuccessAuth,
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
        },

        [signUp.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        [signUp.pending]: (state, action) => {
            state.loading = true;
        },
        [signUp.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
        },
        [activateAccount.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [activateAccount.pending]: (state, action) => {
            state.loading = true;
        },
        [activateAccount.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
            state.user = null;
            state.authenticated = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
            state.user = null;
            state.authenticated = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [changePassword.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
            state.user = null;
            state.authenticated = false;
        },
    }
});
export const {logout} = userSlice.actions
export default userSlice.reducer;