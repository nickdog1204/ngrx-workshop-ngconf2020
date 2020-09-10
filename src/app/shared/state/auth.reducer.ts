import {UserModel} from "../models";
import {Action, createReducer, createSelector, on, State} from "@ngrx/store";
import {AuthApiActions, AuthUserActions} from "src/app/auth/actions";


export interface IAuthState {
  currentUser: UserModel | null,
  isGettingAuthStatus: boolean,
  error: string | null
}

const initialState: IAuthState = {
  currentUser: null,
  isGettingAuthStatus: true,
  error: null
}

export const authReducer = createReducer<IAuthState>(
  initialState,
  on(AuthUserActions.loginPageComponentLoginStart, (state, action): IAuthState => {
    return {
      ...state,
      isGettingAuthStatus: true,
      currentUser: null,
      error: null
    }
  }),
  on(AuthUserActions.userComponentLogout, (state, action): IAuthState => {
    return {
      ...state,
      isGettingAuthStatus: false,
      currentUser: null,
      error: null,
    }
  }),
  on(AuthApiActions.getStatusSuccess, (state, action): IAuthState => {
    return {
      ...state,
      isGettingAuthStatus: false,
      currentUser: action.user,
      error: null
    }

  }),
  on(AuthApiActions.loginSuccess, (state, action): IAuthState => {
    return {
      ...state,
      isGettingAuthStatus: false,
      currentUser: action.user,
      error: null
    }
  }),
  on(AuthApiActions.loginFailure, (state, action): IAuthState => {
    return {
      ...state,
      isGettingAuthStatus: false,
      currentUser: null,
      error: action.reason
    }

  })
)

function reducer(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action)
}


export const selectIsGettingAuthStatus = (authState: IAuthState) => authState.isGettingAuthStatus
export const selectCurrentUser = (authState: IAuthState) => authState.currentUser
export const selectError = (authState: IAuthState) => authState.error
