import { createReducer, on } from "@ngrx/store"
import { setLoadingSpinner } from "./shared.actions"
import { initialState } from "./shared.state";
import { setErrorMessage } from '../shared/shared.actions'

const _sharedReducer = createReducer(initialState, 
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
)

export function SharedReducer(state, action) {
    return _sharedReducer(state, action)
}