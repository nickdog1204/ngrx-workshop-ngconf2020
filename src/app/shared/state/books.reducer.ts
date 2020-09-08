import {createReducer, on, Action, createSelector} from "@ngrx/store";
import {BookModel, calculateBooksGrossEarnings} from "src/app/shared/models";
import {BooksApiActions, BooksPageActions} from "../../books/actions";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter(book => bookId !== book.id);

export interface IBookState {
  collection: BookModel[],
  activeBookId: string | null
}

export const initialState: IBookState = {
  collection: [],
  activeBookId: null
}

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
    return {
      ...state,
      collection: action.fullBookList
    }
  }),
  on(BooksApiActions.createBookSuccess, (state, action): IBookState => {
    return {
      ...state,
      collection: createBook(state.collection, action.createdBook)
    }
  }),
  on(BooksApiActions.updateBookSuccess, (state, action): IBookState => {
    return {
      ...state,
      collection: updateBook(state.collection, action.updatedBook)
    }
  }),
  on(BooksApiActions.deleteBookSuccess, (state, action): IBookState => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.deletedBookId)
    }
  })
)


export function reducer(state: IBookState | undefined, action: Action) {
  return booksReducer(state, action);
}

export const selectAll = (state: IBookState): BookModel[] => state.collection

export const selectActiveBookId = (state: IBookState): string | null => state.activeBookId


export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (bookList, activeBookId) => {
    return bookList.find(book => book.id === activeBookId) || null
  }
)

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
)

