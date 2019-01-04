import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../../../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(readonly http: HttpClient) {
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`/api/dishes/${id}`);
  }
}
