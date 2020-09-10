import {ActionReducer, Action} from "@ngrx/store";
import {AuthUserActions} from "src/app/auth/actions";


export function logoutMetareducer(reducer: ActionReducer<any>) {
  return function (state: any, action: Action) {
    if (action.type === AuthUserActions.userComponentLogout.type) {
      return reducer(undefined, action)
    }
    return reducer(state, action)
  }

}
