import {Injectable} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {AuthApiActions, AuthUserActions} from "./actions";


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }

  getAuthStatus$ = createEffect(() =>
    this.authService.getStatus()
      .pipe(
        map(userOrNull => AuthApiActions.getStatusSuccess(userOrNull))
      )
  )


  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthUserActions.loginPageComponentLoginStart),
        concatMap(action =>
          this.authService.login(action.username, action.password)
            .pipe(
              map(user =>
                AuthApiActions.loginSuccess(user)
              ),
              catchError(error => of(AuthApiActions.loginFailure(error)))
            )
        )
      )
  )

  logout$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(AuthUserActions.userComponentLogout),
          tap(action =>
            this.authService.logout()
          )
        )
    , {dispatch: false})
}
