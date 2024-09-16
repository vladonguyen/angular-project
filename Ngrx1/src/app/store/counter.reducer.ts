import { Action, createReducer, on } from "@ngrx/store";
// import { CounterActions, IncrementAction } from "./counter.actions";
import { increment } from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
    initialState, 
    on(increment, (state, action)=> state + action.value));


//alternative avoiding createReducer with vanilla JS

// export const INCREMENT = '[Counter] Increment'

// export function counterReducer(state = initialState, action: CounterActions | Action){
//     if(action.type === INCREMENT){
//         return state + (action as IncrementAction).value;
//     }
//     return state;
// }