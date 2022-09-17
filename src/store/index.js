import { configureStore } from "@reduxjs/toolkit";
import { serviceReducer } from "./service/service.slice.ts"


export const store = configureStore({
    reducer: {
        service: serviceReducer
    },
})



// export type TypeRootState = ReturnType<typeof store.getState>