import {Injectable} from '@angular/core';
import {Dish} from '../models/dish.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../models/order.model';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  dishes: Dish[] = [];
  totalPrice = 0;
  count = 0;
  value = 'Summary';

  constructor(readonly http: HttpClient) {
  }

  getDishes(): Dish[] {
    return this.dishes;
  }

  addDishToOrder(dish: Dish) {
    let repeat;
    let i;

    if (this.dishes.length === 0) {
      this.addDishToShoppingcart(dish);
      repeat = true;
    } else {
      repeat = false;
      for (i = 0; i < this.dishes.length; i++) {
        if (this.dishes[i].id === dish.id) {
          repeat = true;
          this.dishes[i].count += 1;
        }
      }
      if (repeat === false) {
        this.addDishToShoppingcart(dish);
      }
    }
    this.totalPrice = parseFloat((this.totalPrice + dish.price * 100 / 100).toFixed(2));
  }

  delete(dish: Dish) {
    if (dish.count > 1) {
      dish.count -= 1;
    } else if (dish.count === 1) {
      for (let i = 0; i < this.dishes.length; i++) {
        if (this.dishes[i] === dish) {
          this.dishes.splice(i, 1);
        }
      }
    }
    this.totalPrice = parseFloat(((this.totalPrice - dish.price) * 100 / 100).toFixed(2));
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  saveOrder(order: Order): Observable<Order> {
    let dishesIds: number[] = [];
    const amountDish: number[] = [];

    order.dishIds = dishesIds;
    order.amountDish = amountDish;
    order.status = 'waiting for implementation';

    for (let i = 0; i < this.dishes.length; i++) {
      dishesIds.push(this.dishes[i].id);
      amountDish.push(this.dishes[i].count);
    }
    order.price = this.totalPrice;
    return this.http.post<Order>('/api/orders', order, httpOptions);
  }

  addDishToShoppingcart(dish: Dish) {
    dish.count = 1;
    this.dishes.push(dish);
  }

  cleanShoppingCar() {
    this.dishes = [];
    this.totalPrice = 0;
  }

  showNameButton() {
    if (this.count === 0) {
      ++this.count;
      return this.value = 'Return';
    } else if (this.count === 1) {
      this.count = 0;
      return this.value = 'Summary';
    }
  }
}

