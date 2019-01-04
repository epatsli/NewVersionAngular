import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order/order.service';
import {Subject} from 'rxjs';
import {Order} from '../../../models/order.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, OnDestroy {

  @Input()
  order: Order;
  private readonly destroy$ = new Subject();

  constructor(private readonly route: ActivatedRoute, private readonly orderService: OrderService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(+id)
      .pipe(takeUntil(this.destroy$)).subscribe(res => this.order = res);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
