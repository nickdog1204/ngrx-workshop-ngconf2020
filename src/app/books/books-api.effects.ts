import {Injectable} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
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
      mergeMap(action =>
        this.booksService.all()
          .pipe(map(fullBookList => BooksApiActions.getFullBookListSuccess({fullBookList})))
      )
    )
  )
}
