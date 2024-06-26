
import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authSlice from "../services/authSlice";
import searchReducer from "../services/searchSlice";

export const store = configureStore({

    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        search: searchReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
setupListeners(store.dispatch);