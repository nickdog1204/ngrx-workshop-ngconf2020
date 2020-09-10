import {IGlobalState} from "./index";
import {createSelector} from "@ngrx/store";
import * as fromAuth from './auth.reducer'


const selectAuthState = (state: IGlobalState) => state.authState


export const selectIsGettingAuthStatus = createSelector(
  selectAuthState,
  fromAuth.selectIsGettingAuthStatus
)

export const selectError = createSelector(
  selectAuthState,
  fromAuth.selectError
)

export const selectCurrentUser = createSelector(
  selectAuthState,
  fromAuth.selectCurrentUser
)
