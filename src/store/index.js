import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./service/global.slice.ts";
import { serviceReducer } from "./service/service.slice.ts"


export const store = configureStore({
    reducer: {
        service: serviceReducer,
        global: globalReducer
    },
})



// export type TypeRootState = ReturnType<typeof store.getState>