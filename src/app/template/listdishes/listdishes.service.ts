import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Dish} from '../../models/dish.model';
import {HttpClient} from '@angular/common/http';
import {DishesService} from '../../dishes/dishes.service';
import {ListdishesComponent} from './listdishes.component';

@Injectable({
  providedIn: 'root'
})
export class ListdishesService {

  constructor(readonly http: HttpClient ) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('/api/dishes/admin');
  }

}
