import {Component} from "@angular/core";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {UserModel} from "src/app/shared/models";
import {AuthUserActions} from "../../actions";
import {LoginEvent} from "../login-form";
import {GlobalAuthStateSelectors, IGlobalState} from "../../../shared/state";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {

  gettingStatus$: Observable<boolean>;
  user$: Observable<UserModel | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<IGlobalState>) {
    this.gettingStatus$ = this.store.select(GlobalAuthStateSelectors.selectIsGettingAuthStatus);
    this.user$ = this.store.select(GlobalAuthStateSelectors.selectCurrentUser);
    this.error$ = this.store.select(GlobalAuthStateSelectors.selectError);
  }

  onLogin($event: LoginEvent) {
    this.store.dispatch(AuthUserActions.loginPageComponentLoginStart($event.username, $event.password))
  }
}
