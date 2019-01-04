import {Component} from '@angular/core';
import {AuthService} from './login-form/auth.service';
import {DishesService} from './dishes/dishes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pizza portal';

  constructor(public authService: AuthService) {
  }

}
