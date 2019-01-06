import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ListordersService {

  constructor(readonly http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }
}

