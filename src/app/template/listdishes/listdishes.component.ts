import {Component, OnInit, Input} from '@angular/core';
import {ListdishesService} from './listdishes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dish} from '../../models/dish.model';
import {Subscription} from 'rxjs';
import {DishesService} from '../../dishes/dishes.service';
import {AuthService} from '../../login-form/auth.service';
import {DishesComponent} from '../../dishes/dishes.component';

@Component({
  selector: 'app-listdishes',
  templateUrl: './listdishes.component.html',
  styleUrls: ['./listdishes.component.scss']
})
export class ListdishesComponent implements OnInit {

  dish: Dish[] = [];
  sub: Subscription;

  constructor(
    private listdishesService: ListdishesService,
    private router: ActivatedRoute,
    public dishService: DishesService,
    public authService: AuthService,
   // private listComponent: DishesComponent
  ) {
  }

  @Input()
  prop !: number;
 // dish_: Dish;

  ngOnInit() {
    this.getDishes();
  }

  getDishes(): void {
    this.listdishesService.getDishes()
      .subscribe(res => {
        this.dish = res;
      });
  }

  changeWhenIsNotAvailability(dish: Dish): void {

    if (dish.isAvailable) {
      dish.isAvailable = false;
    } else {
      dish.isAvailable = true;
    }

    console.log(dish.id);
    this.sub = this.dishService.updateDish(dish).subscribe();
  }

  deleteDish(id: number) {
    this.dishService.deleteDish(id)
      .subscribe(() => {
        this.dish = this.dish.filter(d => d.id !== id);
      });
  }

  deleteAllDish(){
    this.dishService.deleteAllDish().subscribe(res => this.dish = res);
  }
/*
  deleteDish() {
    this.dishService.deleteDish(this.dish_.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }
  */
}
