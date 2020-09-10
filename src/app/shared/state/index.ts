import {Action, ActionReducer, ActionReducerMap, createSelector, MetaReducer} from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import {BookModel} from "../models";
import * as BookStateGlobalSelectors from "./books.selectors"

export {BookStateGlobalSelectors}

export interface IGlobalState {
  bookState: fromBooks.IBookState
}

function logger(reducer: ActionReducer<any>) {

  return (state: any, action: Action) => {
    console.log('previous state', state)
    console.log('next action', action)


    const nextState = reducer(state, action)
    console.log('next state', state)

    return nextState
  }
}

export const reducers: ActionReducerMap<IGlobalState> = {
  bookState: fromBooks.reducer
};

export const metaReducers: MetaReducer<IGlobalState>[] = [logger];


/**
 * Books State
 */



