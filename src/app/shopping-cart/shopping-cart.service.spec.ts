import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ShoppingCartService} from './shopping-cart.service';
import {ShoppingCartComponent} from './shopping-cart.component';
import {Dish} from '../models/dish.model';
import {Order} from '../models/order.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

fdescribe('ShoppingCartService', () => {
  let shoppingcartComponent: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let httpMock: HttpTestingController;
  let service: ShoppingCartService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [ShoppingCartService],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    shoppingcartComponent = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Dish', () => {

    // given
    const firstDish: Dish = {id: 1, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0};
    const dishes: Dish[] = [firstDish];
    service.dishes = dishes;
    // when
    const result = service.getDishes();

    // then
    expect(result).toBe(dishes);
  });

  it('should add first dish to shoppingCart', () => {

    // given
    const dishList = [];
    const dish: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0};
    service.dishes = dishList;

    // when
    service.addDishToOrder(dish);

    // then
    expect(service.dishes.length).toBe(1);
  });

  it('should add one dish to not empty shoppingCart', () => {

    // given
    const dishList: Dish[] = [{id: 1, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0}];
    const dish: Dish = {id: 2, name: 'pizza', isAvailable: true, description: 'pizza', type: 'pizza', price: 1, count: 0};

    service.dishes = dishList;

    // when
    service.addDishToOrder(dish);

    // then
    expect(service.dishes.length).toBe(2);
  });

  it('should count Dish and return 2', () => {

    // given
    const dishOne: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0};
    const dishTwo: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 0};
    const dishList: Dish[] = [dishOne, dishTwo];
    service.dishes = dishList;

    // when
    service.addDishToOrder(dishTwo);

    // then
    expect(service.dishes.length).toBe(2);
  });

  it('should delete dish from shoppingCart', () => {

    // given
    const dishOne: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 1};
    const dishTwo: Dish = {id: 4, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 1};
    const dishList: Dish[] = [dishOne, dishTwo];
    service.dishes = dishList;

    // when
    service.delete(dishTwo);

    // then
    expect(service.dishes.length).toBe(1);
  });

  it('should get total price', () => {

    // given
    const totalPrice = 10;
    service.totalPrice = totalPrice;

    // when
    service.getTotalPrice();

    // then
    expect(service.getTotalPrice()).toBe(totalPrice);
  });

  it('should save order', () => {

    // given
    const order: Order = {
      id: 1,
      dishIds: [],
      amountDish: [],
      status: '',
      price: 1,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      street: '',
      houseNumber: '',
      zipCode: ''
    };

    // when
    service.saveOrder(order).subscribe();

    // then
    const req = httpMock.expectOne(newReq => newReq.url === '/api/orders');
    expect(req.request.method).toBe('POST');
  });

  it('should add dish to shoppingcart', () => {

    // given
    const dish: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 1};
    expect(service.dishes.length).toBe(0);

    // when
    service.addDishToShoppingcart(dish);

    // then
    expect(service.dishes.length).toBe(1);
  });

  it('should clean shoppingcart', () => {

    // given
    const dish: Dish = {id: 3, name: 'pasta', isAvailable: true, description: 'pasta', type: 'pasta', price: 1, count: 1};
    service.dishes = [dish];
    service.totalPrice = 10;
    expect(service.dishes.length).not.toBe(0);
    expect(service.totalPrice).not.toBe(0);

    // when
    service.cleanShoppingCar();

    // then
    expect(service.dishes.length).toBe(0);
    expect(service.totalPrice).toBe(0);
  });

  it('should show name return button', () => {

    // given
    service.count = 1;

    // when
    service.showNameButton();

    // then
    expect(service.showNameButton()).toBe('Return');
  });

  it('should show name summary button', () => {

    // given
    service.count = 0;

    // when
    service.showNameButton();

    // then
    expect(service.showNameButton()).toBe('Summary');
  });

});
