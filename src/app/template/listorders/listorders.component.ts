import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order.model';
import {ListordersService} from './listorders.service';
import {AuthService} from '../../login-form/auth.service';

@Component({
  selector: 'app-listorders',
  templateUrl: './listorders.component.html',
  styleUrls: ['./listorders.component.scss']
})
export class ListordersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private listordersService: ListordersService, public authService: AuthService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.listordersService.getOrders()
      .subscribe(res => {
        this.orders = res;
      });
  }

}
