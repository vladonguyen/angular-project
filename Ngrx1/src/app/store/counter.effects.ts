import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { decrement, increment } from "./counter.actions";
import { tap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { selectCount } from "./counter.selector";

@Injectable()
export class CounterEffects {
    saveCount = createEffect(()=> this.actions$.pipe(
        ofType(increment, decrement), // the actions will continue if they are of these types
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter])=> {
            console.log(action);
            localStorage.setItem('count', counter.toString());
        })

    ), {dispatch: false});

    constructor(private actions$: Actions, private store: Store<{counter: number}>){}
}