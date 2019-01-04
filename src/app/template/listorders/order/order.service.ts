import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../../models/order.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(readonly http: HttpClient) {
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`/api/orders/${id}`);
  }

  public updateOrder(order: Order): Observable<Order> {

    return this.http.put<Order>(`/api/orders/${order.id}`, order);
  }
}
