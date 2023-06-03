import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

export const authSlice = createSlice({
    name: 'authUser',
    initialState: {
        merchant_Id: null,
        token: null,
        userData: null,
        courses: [],
        courseLocations: [],
        darkMode: false
    },
    reducers: {
        loginAuth: (state, action) => {
            state.merchant_Id = action.payload.merchant_Id,
                state.token = action.payload.token,
                state.userData = action.payload.userData
        },
        logoutAuth: (state, action) => {
            storage.removeItem('persist:root')
            state.merchant_Id = null,
                state.token = null,
                state.userData = null
        },
        setCourses: (state, action) => {
            state.courses = action.payload
        },
        setCourseLocations: (state, action) => {
            state.courseLocations = action.payload
        },
        toggleDarkMode: (state, action) => {
            state.darkMode = action.payload
        },
        changeLogoUrl: (state, action) => {
            state.userData = {
                ...state.userData,
                merchantLogoUrl: action.payload
            }
        },

    },
})


export const { loginAuth, logoutAuth, setCourses, setCourseLocations, toggleDarkMode, changeLogoUrl } = authSlice.actions;

export default authSlice;