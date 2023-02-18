import { createAction, props } from "@ngrx/store";

export const addDigit = createAction('[Calc] addDigit',props<{digit:string}>());
export const addOperator = createAction('[Calc] addOperator',props<{operator:string}>());
export const calculate = createAction('[Calc] Calculate');
export const reset = createAction('[Calc] reset')
