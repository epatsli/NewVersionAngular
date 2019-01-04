import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DishesComponent} from './dishes.component';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {OrderService} from '../template/listorders/order/order.service';
import {DishesService} from './dishes.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Dish} from '../models/dish.model';
import {of, Subject} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';


 fdescribe('DishesComponent', () => {
  let dishesComponent: DishesComponent;
  let shoppingcartservice: ShoppingCartService;
  let fixture: ComponentFixture<DishesComponent>;
  let dishesService: DishesService;
  let params: Subject<Params>;
  const dishes: Dish[] = [{id: 1, name: 'dishes', isAvailable: true, description: 'dishes', type: 'dishes', price: 1, count: 0}];
  const pizza: Dish[] = [{id: 2, name: 'pizza', isAvailable: true, description: 'pizza', type: 'pizza', price: 1, count: 0}];
  const pasta: Dish[] = [{id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0}];
  const drink: Dish[] = [{id: 4, name: 'drink', isAvailable: true, description: 'drink', type: 'drink', price: 1, count: 0}];
  const dishesServiceMock = {
    dishes: new Subject<Dish[]>(),
    getDishes: jasmine.createSpy('getDishes').and.returnValue(of(dishes)),
    getPizza: jasmine.createSpy('getPizza').and.returnValue(of(pizza)),
    getPasta: jasmine.createSpy('getPasta').and.returnValue(of(pasta)),
    getDrink: jasmine.createSpy('getDrink').and.returnValue(of(drink))
  };

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [DishesComponent],
      providers: [
        {provide: DishesService, useValue: dishesServiceMock},
        {provide: ActivatedRoute, useValue: {paramMap: params}},
        OrderService,
        DishesService,
        HttpClient
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule, ReactiveFormsModule]
    })
      .compileComponents();
    dishesService = TestBed.get(DishesService);
    shoppingcartservice = TestBed.get(ShoppingCartService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesComponent);
    dishesComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dishesComponent).toBeTruthy();
  });

   it('should init with list dishes', fakeAsync(() => {

     // given
     const spy = spyOn(dishesComponent, 'getDishes');
     dishesComponent.ngOnInit();

     // when
     params.next(<ParamMap>({
       get: (key: string) => ''
     }));

     // then
     expect(spy).toHaveBeenCalled();
   }));

  it('should init with pizza', fakeAsync(() => {

    // given
    const pizzaSpy = spyOn(dishesComponent, 'getPizza');
    dishesComponent.ngOnInit();

    // when
    params.next(<ParamMap>({
      get: (key: string) => 'pizza'
    }));

    // then
    expect(pizzaSpy).toHaveBeenCalled();
  }));

   it('should init with pasta', fakeAsync(() => {

     // given
     const pastaSpy = spyOn(dishesComponent, 'getPasta');
     dishesComponent.ngOnInit();

     // when
     params.next(<ParamMap>({
       get: (key: string) => 'pasta'
     }));

     // then
     expect(pastaSpy).toHaveBeenCalled();
   }));

   it('should init with drink', fakeAsync(() => {

     // given
     const drinkSpy = spyOn(dishesComponent, 'getDrinks');
     dishesComponent.ngOnInit();

     // when
     params.next(<ParamMap>({
       get: (key: string) => 'drink'
     }));

     // then
     expect(drinkSpy).toHaveBeenCalled();
   }));

   it('should get list dishes', fakeAsync(() => {

     // given
     const spy = spyOn(dishesService, 'getDishes').and.returnValue(of([]));

     // when
     dishesComponent.getDishes();

     // then
     expect(spy).toHaveBeenCalled();
   }));

   it('should get list Pizza', fakeAsync(() => {

     // given
     const pizzaSpy = spyOn(dishesService, 'getPizza').and.returnValue(of([]));

     // when
     dishesComponent.getPizza();

     // then
     expect(pizzaSpy).toHaveBeenCalled();
   }));

   it('should get list Pasta', fakeAsync(() => {

     // given
     const pastaSpy = spyOn(dishesService, 'getPasta').and.returnValue(of([]));

     // when
     dishesComponent.getPasta();

     // then
     expect(pastaSpy).toHaveBeenCalled();
   }));

   it('should get list Drink', fakeAsync(() => {

     // given
     const drinkSpy = spyOn(dishesService, 'getDrinks').and.returnValue(of([]));

     // when
     dishesComponent.getDrinks();

     // then
     expect(drinkSpy).toHaveBeenCalled();
   }));

   it('should add dish to shopping cart', fakeAsync(() => {

     // given
     const exampleDish = <Dish>{id: 1, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0};
     const shoppingcartServiceMock = spyOn(shoppingcartservice, 'addDishToOrder');

     // when
     dishesComponent.addDishToOrder(exampleDish);

     // then
     expect(shoppingcartServiceMock).toHaveBeenCalled();
   }));
});


