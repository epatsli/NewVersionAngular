import {Component, OnInit, HostBinding, OnDestroy} from '@angular/core';
import {DishesService} from './dishes.service';
import {Dish} from '../models/dish.model';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  private _dish: Dish[] = [];
  value = 0;
  subscription: Subscription;
  @HostBinding('class.is-open')
  isOpen = true;

 // dishes: Observable<Dish[]>;

  constructor(
    private shoppingcartservice: ShoppingCartService,
    private dishesService: DishesService,
    private router: ActivatedRoute) {
  }

  ngOnInit() {

    this.subscription = this.dishesService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });

    this.subscription = this.router.paramMap.subscribe(params => {
      const type = params.get('type'); 
      if (type === 'pizza') {
        this.getPizza();
      } else if (type === 'pasta') {
        this.getPasta();
      } else if (type === 'drink') {
        this.getDrinks();
      } else {
        this.getDishes();
      }
    });
  }

  getDishes(): void {
    this.subscription = this.dishesService.getDishes()
      .subscribe(res => {
        this._dish = res;
      });
  }

  getPizza(): void {
    this.subscription = this.dishesService.getPizza()
      .subscribe(res => {
        this._dish = res;
      });
  }

  getPasta(): void {
    this.subscription = this.dishesService.getPasta()
      .subscribe(res => {
        this._dish = res;
      });
  }

  getDrinks(): void {
    this.subscription = this.dishesService.getDrinks()
      .subscribe(res => {
        this._dish = res;
      });
  }

  addDishToOrder(dish: Dish) {
    this.value++;
    this.shoppingcartservice.addDishToOrder(dish);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get dish(): Dish[] {
    return this._dish;
  }
/*
  reloadData() {
    this.dishes = this.dishService.getDishes();
  }
  */
}
