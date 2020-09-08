import {createAction, props} from "@ngrx/store";
import {BookRequiredProps} from "src/app/shared/models";

export const enter = createAction(
  '[Books Page] Enter the Book Page'
)

export const getFullBookListStart = createAction(
  '[Books Page] Get Full Book List START'
)

export const selectBookByBookId = createAction(
  '[Books Page] Select a Book',
  props<{ bookIdToSelect: string }>()
)

export const clearSelectedBook = createAction(
  '[Books Page] Clear the Selected Book'
)

export const createBookStart = createAction(
  '[Books Page] Create a Book START',
  props<{ bookProps: BookRequiredProps }>()
)


export const updateBookStart = createAction(
  '[Books Page] Update a Book START',
  props<{ changes: BookRequiredProps, bookIdToUpdate: string }>()
)

export const deleteBookByBookIdStart = createAction(
  '[Books Page] Delete a Book START',
  props<{ bookIdToDelete: string }>()
)


