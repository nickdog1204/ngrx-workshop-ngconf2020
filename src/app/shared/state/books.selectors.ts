// Getter Selector
import * as fromBooks from "./books.reducer";
import {BookModel} from "../models";
import {createSelector} from "@ngrx/store";
import {IGlobalState} from "./index";

const selectBookState = (state: IGlobalState): fromBooks.IBookState => state.bookState
// const selectActiveBook_unoptimized = (state: IGlobalState): BookModel | null => {
//   const bookState = selectBookState(state)
//
//   return fromBooks.selectActiveBook(bookState)
// }

export const selectActiveBook = createSelector(
  selectBookState,
  fromBooks.selectActiveBook
)

export const selectFullBookList = createSelector(
  selectBookState,
  fromBooks.selectAll
)

export const selectBooksEarningsTotals = createSelector(
  selectBookState,
  fromBooks.selectEarningsTotal
)
