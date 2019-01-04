import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Dish} from '../../../models/dish.model';
import {DishesService} from '../../../dishes/dishes.service';
import {DetailsService} from './details.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/internal/operators';
import {Subject, Subscription} from 'rxjs/index';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  @Input()
  dish: Dish;

  private readonly destroy$ = new Subject();
  sub: Subscription;

  constructor(private detailsService: DetailsService,
              private readonly route: ActivatedRoute,
              private dishService: DishesService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detailsService.getDish(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.dish = res);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeAfterClick(dish: Dish): void {

    if (dish.isAvailable) {
      dish.isAvailable = false;
    } else {
      dish.isAvailable = true;
    }

    console.log(dish.id);
    this.sub = this.dishService.updateDish(dish).subscribe();
  }
}
