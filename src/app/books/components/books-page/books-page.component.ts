import {Component, OnInit} from "@angular/core";
import {
  BookModel,
  BookRequiredProps
} from "src/app/shared/models";
import {BookStateSelectors, IGlobalState} from "../../../shared/state";
import {Store} from "@ngrx/store";
import {BooksPageActions} from "../../actions";
import {Observable} from "rxjs";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  bookList$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | null>;
  total$: Observable<number>;

  constructor(private store: Store<IGlobalState>) {
    this.bookList$ = this.store.select(BookStateSelectors.selectFullBookList)
    this.currentBook$ = this.store.select(BookStateSelectors.selectActiveBook)
    this.total$ = this.store.select(BookStateSelectors.selectBooksEarningsTotals)
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter())
    this.store.dispatch(BooksPageActions.getFullBookListStart())

  }


  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBookByBookId({
      bookIdToSelect: book.id
    }))
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook())
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBookStart({bookProps}))
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBookStart({
      bookIdToUpdate: book.id,
      changes: book
    }));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBookByBookIdStart({
      bookIdToDelete: book.id
    }))
  }
}
