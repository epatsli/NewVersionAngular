import {Injectable, Output, EventEmitter} from '@angular/core';
import {DishesService} from '../dishes/dishes.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dish} from '../models/dish.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SummaryService {

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  dishes: Dish[] = [];

  constructor(readonly http: HttpClient, public dishesService: DishesService) {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
    this.dishesService.toggle();
  }
}
