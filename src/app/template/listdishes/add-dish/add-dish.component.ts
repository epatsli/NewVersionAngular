import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DishesService} from '../../../dishes/dishes.service';
import {Dish} from '../../../models/dish.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  formAddDish = new FormGroup({
    name: new FormControl('', Validators.required),
    isAvailable: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
    price: new FormControl('',  [Validators.required, Validators.pattern('^[0-9.]*$')])
  });

  constructor(readonly dishesService: DishesService, readonly router: Router) { }

  ngOnInit() {
  }

  onSubmit () {
    const dish: Dish = this.formAddDish.value;
    if (this.formAddDish.value.isAvailable === '') {
      dish.isAvailable = false;
    }
    if (this.formAddDish.status === 'VALID') {
      this.dishesService.saveDish(dish).subscribe();
      this.router.navigate(['/listdishes']);
    } else {
      alert('Wypenij pola poprawnie!');
    }}
}
