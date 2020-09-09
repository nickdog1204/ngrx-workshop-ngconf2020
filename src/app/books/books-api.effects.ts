import {Injectable} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {catchError, concatMap, exhaustMap, map, mergeMap} from "rxjs/operators";
import {BooksService} from "../shared/services";
import {BooksPageActions, BooksApiActions} from "./actions";

@Injectable()
export class BooksApiEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {
  }

  loadFullBookList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.getFullBookListStart),
      exhaustMap(action =>
        this.booksService.all()
          .pipe(map(fullBookList => BooksApiActions.getFullBookListSuccess({fullBookList})))
      )
    )
  )

  createBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(BooksPageActions.createBookStart),
      concatMap(action =>
        this.booksService.create(action.bookProps)
          .pipe(
            map(createdBook => BooksApiActions.createBookSuccess({createdBook}))
          )
      )
    ),
  )

  updateBook$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(BooksPageActions.updateBookStart),
        concatMap(action =>
          this.booksService.update(action.bookIdToUpdate, action.changes)
            .pipe(
              map(updatedBook =>
                BooksApiActions.updateBookSuccess({updatedBook})
              )
            )
        )
      )
  )

  deleteBookByBookId$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(BooksPageActions.deleteBookByBookIdStart),
        mergeMap(action =>
          this.booksService.delete(action.bookIdToDelete)
            .pipe(
              map(_ => BooksApiActions.deleteBookSuccess({deletedBookId: action.bookIdToDelete}))
            )
        )
      )
  );
}
