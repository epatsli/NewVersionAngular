import {EventEmitter, Injectable, Output} from '@angular/core';
import {Dish} from '../models/dish.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  isOpen = true;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  showView = true;

  constructor(readonly http: HttpClient) {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  getDishes(): Observable<Dish[]> {
    this.showView = true;
    return this.http.get<Dish[]>('/api/dishes');
  }

  getPizza(): Observable<Dish[]> {
    this.showView = false;
    return this.http.get<Dish[]>('/api/dishes/pizzas');
  }

  getPasta(): Observable<Dish[]> {
    this.showView = false;
    return this.http.get<Dish[]>('/api/dishes/pastas');
  }

  getDrinks(): Observable<Dish[]> {
    this.showView = false;
    return this.http.get<Dish[]>('/api/dishes/drinks');
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`/api/dishes/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>('/api/dishes/create', dish);
  }

  updateDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`/api/dishes/${dish.id}`, dish);
  }

/*
  updateDish(id: number, value: any): Observable<Object> {
    return this.http.put(`/api/dishes/${id}`, value);
  }
  */
  deleteDish(id: number): Observable<any> {
    return this.http.delete<any>(`/api/dishes/${id}`);
  }
/*
  deleteDish(dish: Dish): Observable<Dish> {
    console.log('Delete dish');
    return this.http.delete<Dish>(`/api/dishes/${dish.id}`);
  }
*/
/*
  deleteDish(id: number): Observable<any> {
    console.log('Delete dish');
    return this.http.delete(`/api/dishes/${id}`, { responseType: 'text' });
  }
*/
  deleteAllDish(): Observable<any> {
    return this.http.delete('/api/dishes/delete');
  }

  saveDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>('/api/dishes', dish);
  }

  getSomeOtherDish() {
    return 'dish';
  }
}
