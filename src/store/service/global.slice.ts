import { createSlice } from "@reduxjs/toolkit"





const initialState: any = {
    percent: null
}



export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setPercent: (state: any, action: any) => ({
            ...state,
            percent: action.payload
        })
    }
})



export const globalReducer = globalSlice.reducer
export const globalActions = globalSlice.actions