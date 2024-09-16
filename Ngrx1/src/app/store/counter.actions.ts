import { Action, createAction, props } from "@ngrx/store";
// import { INCREMENT } from "./counter.reducer";


export const increment = createAction(
    '[Counter] Increment', //in the square breket is is announced for which feature it is
    props<{value: number}>()
);



// export class IncrementAction implements Action {
//     readonly type =  INCREMENT;

//     constructor(public value: number){}
// }

// export type CounterActions = IncrementAction 
// | DecrementAction can be added above