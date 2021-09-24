import { createReducer, on } from "@ngrx/store";
import { changeText, customIncrement, decrement, double, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";


const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        };
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0
        };
    }),
    on(double, (state) => {
        return {
            ...state,
            counter: state.counter*2
        }
    }),
    on(customIncrement, (state, action) => {
        console.log(action);
        return {
            ...state,
            counter: state.counter + Number(action.value)
        }
    }),
    on(changeText, (state, action) => {
        console.log(action);
        return {
            ...state,
            text: action.text
        }
    })

);

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}