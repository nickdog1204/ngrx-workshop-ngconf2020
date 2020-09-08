import {ActionReducerMap, createSelector, MetaReducer} from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import {BookModel} from "../models";
import * as BookStateSelectors from "./books.selectors"

export {BookStateSelectors}

export interface IGlobalState {
  bookState: fromBooks.IBookState
}

export const reducers: ActionReducerMap<IGlobalState> = {
  bookState: fromBooks.reducer
};

export const metaReducers: MetaReducer<IGlobalState>[] = [];


/**
 * Books State
 */



