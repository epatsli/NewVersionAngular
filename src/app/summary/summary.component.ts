import {Component, HostBinding, OnInit} from '@angular/core';
import {SummaryService} from './summary.service';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Order} from '../models/order.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  orders: Order = new class implements Order {
    id: number;
    dishIds: number[];
    amountDish: number[];
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    zipCode: string;
    houseNumber: string;
    price: number;
    status: string;
  };

  @HostBinding('class.is-open')
  isOpen = true;
  price = 0;

  constructor(private summaryService: SummaryService, private shoppingcartService: ShoppingCartService, private router: Router) {
  }

  ngOnInit() {
    this.summaryService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  saveOrder() {
    if (this.getTotalCost() === 0) {
      this.prepareView();
    } else {
      this.shoppingcartService.saveOrder(this.orders).subscribe(x => alert('Order was accepted for execution.'));
      this.shoppingcartService.cleanShoppingCar();
      this.prepareView();
    }
  }

  getTotalCost() {
    if (this.shoppingcartService.getTotalPrice() === 0) {
      alert('Add dish to shopping-cart!');
      return 0;
    }
  }

  prepareView() {
   this.isOpen = false;
    this.router.navigate(['/dishes']);
    this.summaryService.toggle();
    this.shoppingcartService.showNameButton();
  }
}
