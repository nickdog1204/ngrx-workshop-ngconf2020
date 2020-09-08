import {createAction, props} from "@ngrx/store";
import {BookModel, BookRequiredProps} from "../../shared/models";

export const getFullBookListSuccess = createAction(
  '[Book API] Get Full Book List SUCCESS',
  props<{ fullBookList: BookModel[] }>()
)


export const updateBookSuccess = createAction(
  '[Book API] Updating Book SUCCESS',
  props<{ updatedBook: BookModel }>()
)

// Create

export const createBookSuccess = createAction(
  '[Book API] Creating Book SUCCESS',
  props<{ createdBook: BookModel }>()
)

// Delete

export const deleteBookSuccess = createAction(
  '[Book API] Deleting Book SUCCESS',
  props<{ deletedBookId: string }>()
)

