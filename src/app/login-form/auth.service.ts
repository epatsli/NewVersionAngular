import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {CanActivate, Router} from '@angular/router';
import {DishesService} from '../dishes/dishes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy, CanActivate {
  sub: Subscription;
  isLogin = false;

  constructor(
    private  http: HttpClient,
    private router: Router,
    public dishService: DishesService
  ) {
  }

  check(login: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(`${login}:${password}`));
    headers = headers.append("Content-Type", "application/json");
 
    this.sub = this.http.post<User[]>('/api/login', { login, password }, { headers }).subscribe(res => {

      if (!!res) {
        this.isLogin = true;
        this.router.navigate(['/listdishes']);
      } else {
        alert('Incorect name or pasword');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  canActivate(): boolean {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.sub = this.http.get<User[]>('/api/logout').subscribe(
      {complete: () => {
        this.isLogin = false;
        this.dishService.showView = true;
      }}
    );
  }
}
