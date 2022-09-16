import { createSlice } from "@reduxjs/toolkit"


interface IInitialStateService {
    // init
    statusService: 'idle' | 'loading' | 'success' | 'error',
    service: any // need to create type service,

    // specialists
    specialists: any // need to create type specialist[],

    // services
    services: any // need to create type service[],

    // schedule table
    statusSchedule: 'idle' | 'loading' | 'success' | 'error',
    schedule: any // need to create type schedule,

    timeSchedule: [number, number] | null | undefined // array it consists of the initial day to the final one,
    initSlots: any // need to create type slot[]
}




const initialState: IInitialStateService = {
    // init
    statusService: 'idle',
    service: null,

    // specialists
    specialists: null,

    // services
    services: null,

    // schedule table
    statusSchedule: 'idle',
    schedule: null,

    timeSchedule: null,
    initSlots: null,
}



export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        // init
        setStatusService: (state, action) => ({
            ...state,
            statusService: action.payload
        }),
        setService: (state, action) => ({
            ...state,
            service: action.payload
        }),

        // specialists
        setSpecialists: (state, action) => ({
            ...state,
            specialists: action.payload
        }),

        // services
        setServices: (state, action) => ({
            ...state,
            services: action.payload
        }),

        // schedule table
        setStatusSchedule: (state, action) =>({
            ...state,
            statusSchedule: action.payload
        }),
        setSchedule: (state, actions) => ({
            ...state,
            schedule: actions.payload
        }),

        setTimeSchedule: (state, action) => ({
            ...state,
            timeSchedule: action.payload
        }),
        setInitSlots: (state, action) => ({
            ...state,
            initSlots: action.payload
        })
    }
})



export const serviceReducer = serviceSlice.reducer
export const serviceActions = serviceSlice.actions