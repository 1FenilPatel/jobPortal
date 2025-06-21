import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import companySlice from "./companySlice";
import jobSlice from "./jobSlice";
import applicationSlice from "./applicationSlice";
import savedJobSlice from "./savedJobSlice";
import providerSlice from "./providerSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    company:companySlice,
    job:jobSlice,
    pro:providerSlice,
    application:applicationSlice,
    savedJobs:savedJobSlice
  });
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };