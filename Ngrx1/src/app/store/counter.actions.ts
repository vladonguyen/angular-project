import { createAction, props } from "@ngrx/store";

export const increment = createAction(
    '[Counter] Increment', //in the square breket is is announced for which feature it is
    props<{value: number}>()
);