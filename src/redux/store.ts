import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import countryReducer from "./slices/country.slice";

import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  country: countryReducer,
});

// only for jest test cases
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer,
});
export default store;
