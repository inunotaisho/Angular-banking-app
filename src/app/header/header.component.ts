import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as AuthActions from "../core/store/Auth/actions";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {isAuthenticated} from "../core/store/Auth/selectors";
import {Observable} from "rxjs";
import {currentUserSelector} from "../core/store/Profile/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  isAuthenticated;
  currentUser: Observable<IProfile | null>;


  constructor(private router: Router, public store: Store<AppStateInterface>) {

    this.isAuthenticated = this.store.pipe(select(isAuthenticated))
    this.currentUser = this.store.pipe(select(currentUserSelector))


  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('xxx')
  }

  ngOnInit(): void {
  }


  logout() {

    this.store.dispatch(AuthActions.logout())
    this.router.navigate(["auth/login"])

    // this.authService.logout();
  }


}
