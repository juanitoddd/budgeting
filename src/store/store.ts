import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
  } from "@reduxjs/toolkit";
  import type { PreloadedState } from '@reduxjs/toolkit'
  
  // Reducers
  import categoryReducer from "../slices/categorySlice";
  import inputReducer from "../slices/inputSlice";
  
  const rootReducer = combineReducers({        
    categories: categoryReducer,
    input: inputReducer,
  });
  
  export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: rootReducer,
    //   middleware: (getDefaultMiddleware) =>
        // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
        // getDefaultMiddleware().concat(nodesApi.middleware).concat(flowsApi.middleware),
      preloadedState,
    });
  };
  
  export type AppStore = ReturnType<typeof setupStore>;
  export type AppDispatch = AppStore["dispatch"];
  export type RootState = ReturnType<typeof rootReducer>;
  
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;