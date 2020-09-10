import {createAction} from "@ngrx/store";


export const loginPageComponentLoginStart = createAction(
  '[Auth/User login-page] Login Clicked',
  (username: string, password: string) => ({username, password})
)

export const userComponentLogout = createAction(
  '[Auth/User user] Logout Clicked'
)
