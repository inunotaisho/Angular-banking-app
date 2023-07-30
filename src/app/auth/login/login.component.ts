import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AppStateInterface, ILogin} from "../../shared/interface/userAuth";
import {select, Store} from "@ngrx/store";
import * as AuthActions from "../../core/store/Auth/actions";
import {BehaviorSubject,} from "rxjs";
import { isLoadingSelector} from "../../core/store/Auth/selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  LoginForm: UntypedFormGroup;
  email: UntypedFormControl;
  password: UntypedFormControl;
  showModal: boolean = false;


  formRoute$ = new BehaviorSubject('loginForm')
  loading: boolean;



  constructor(public authservice: AuthService, private store: Store<AppStateInterface>) {
    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)
  

  }

  ngOnInit(): void {
    this.createLoginForm()

  }

  createLoginForm() {
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
    this.LoginForm = new UntypedFormGroup({
      email: this.email,
      password: this.password
    });
  }

  handleLogin(value: ILogin) {
    // this.authservice.login(value);
    console.log(value);

    this.store.dispatch(AuthActions.login(value))
  }


  // toggleModal() {
  //   this.showModal = !this.showModal;
  //   this.showMe = true;
  // }

  handleModal($event: any) {
    console.log("I Bubbled", $event);
    this.showModal = $event;
  }

  updateRoute(route: string) {
    this.formRoute$.next(route)

  }
}
