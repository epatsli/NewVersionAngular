import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Order} from '../../../models/order.model';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';
import {takeUntil} from 'rxjs/internal/operators';
import {forkJoin, Subject, Subscription} from 'rxjs/index';
import {Dish} from '../../../models/dish.model';
import {ListdishesService} from '../../listdishes/listdishes.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  @Input()
  order: Order;
  dish: Dish;
  private readonly destroy$ = new Subject();

  dishes: Dish[] = [];
  subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly listdishService: ListdishesService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.subscription = forkJoin([this.orderService.getOrder(+id), this.listdishService.getDishes()]).subscribe(([order, dishes]) => {
      this.order = order;
      this.dishes = dishes;
    });
  }

  public changeStatusToInProgress(): void {
    this.order.status = 'in progress';
    this.update();
  }

  public changeStatusToInDelivery(): void {
    this.order.status = 'in delivery';
    this.update();
  }

  public changeStatusToDelivered(): void {
    this.order.status = 'delivered';
    this.update();
  }

  public update(): void {
    this.orderService.updateOrder(this.order).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}





