import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from "../../api/user.service";
import authService from "../../api/auth.service";

export const login = createAsyncThunk("users/login", async ({korisnickoIme, lozinka}) => {

    console.log("username " + korisnickoIme + " password " + lozinka)
    return await authService.login(korisnickoIme, lozinka);
});



export const updateUser = createAsyncThunk("users/updateUser", async ({
                                                                          id,
                                                                          userDataToUpdate
                                                                      }, {rejectWithValue}) => {
    console.log("U reduxu sam userDataToUpdate " + JSON.stringify(userDataToUpdate));

    try {
        return await userService.updateUser(id, userDataToUpdate);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});

export const getUser = createAsyncThunk("/getUser", async ({id}, {rejectWithValue}) => {
    try {

        return await userService.getUserByID(id);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});


export const changePassword = createAsyncThunk("/changePassword",
    async ({id, changePasswordData}, {rejectWithValue}) => {

        try {

            return await userService.changePassword(id, changePasswordData);
        } catch (err) {
            return rejectWithValue("Error while updating model. Please try later.");
        }
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
        name: 'users',
        initialState: {
            authenticated: false,
            authenticatedFailed: false,
            user: null,
        },
        reducers: {
            logout: logoutAction,
            setUser: (state, action) => {
                state.user = action.payload;
                state.loading = false;
            },
            clearUser: (state, action) => {
                state.user = null;
                state.loading = false;
            }
        },
        extraReducers: {
            [login.fulfilled]: (state,action) =>
            {
                state.loading=false;
                state.error=null;
            },
            [login.pending]: (state) => {
                state.loading = true;
            },
            [login.rejected]: (state) => {
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
                state.authenticationFailed=false;
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
    })
;
export const {logout} = userSlice.actions
export default userSlice.reducer;