import {createReducer, on, Action, createSelector} from "@ngrx/store";
import {BookModel, calculateBooksGrossEarnings} from "src/app/shared/models";
import {BooksApiActions, BooksPageActions} from "../../books/actions";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";


export interface IBookState extends EntityState<BookModel> {
  // collection: BookModel[],
  activeBookId: string | null
}

const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>()

export const initialState: IBookState = adapter.getInitialState({
  activeBookId: null
})

export const booksReducer = createReducer<IBookState>(
  initialState,
  on(BooksPageActions.enter, (state, action): IBookState => {
    return {
      ...state,
      activeBookId: null
    }
  }),
  on(BooksPageActions.selectBookByBookId, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookIdToSelect,
    }
  }),
  on(BooksPageActions.clearSelectedBook, (state, action): IBookState => {
    return {
      ...state,
      activeBookId: null,
    }
  }),
  on(BooksApiActions.getFullBookListSuccess, (state, action): IBookState => {
    return adapter.setAll(action.fullBookList, state)
    // return {
    //   ...state,
    //   collection: action.fullBookList
    // }
  }),
  on(BooksApiActions.createBookSuccess, (state, action): IBookState => {
    return adapter.addOne(action.createdBook, {
      ...state,
      activeBookId: null
    })
    // return {
    //   ...state,
    //   collection: createBook(state.collection, action.createdBook),
    //   activeBookId: null
    // }
  }),
  on(BooksApiActions.updateBookSuccess, (state, action): IBookState => {
    return adapter.updateOne({id: action.updatedBook.id, changes: action.updatedBook}, {
      ...state,
      activeBookId: null
    })
    // return {
    //   ...state,
    //   collection: updateBook(state.collection, action.updatedBook),
    //   activeBookId: null
    // }
  }),
  on(BooksApiActions.deleteBookSuccess, (state, action): IBookState => {
    return adapter.removeOne(action.deletedBookId, state)
    // return {
    //   ...state,
    //   collection: deleteBook(state.collection, action.deletedBookId)
    // }
  })
)


export function reducer(state: IBookState | undefined, action: Action) {
  return booksReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors()

// export const selectAll = (state: IBookState): BookModel[] => state.collection

export const selectActiveBookId = (state: IBookState): string | null => state.activeBookId


export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (bookEntities, activeBookId) =>
    activeBookId ? bookEntities[activeBookId] : null
)

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
)

