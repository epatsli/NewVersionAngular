import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderService} from './order.service';
import {DishesService} from '../../../dishes/dishes.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

class ActivatedRouteMock {
  snapshot: {
    paramMap: {
      'id': 1
    }
  };
}

xdescribe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        OrderService,
        DishesService,
        HttpClient,
        HttpHandler
      ],
      imports: [ RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the dishService', () => {
    const dishService = TestBed.get(DishesService);
    const getSomeOtherDishSpy = spyOn(dishService, 'getSomeOtherDish');
    getSomeOtherDishSpy.and.returnValue(null);
    expect(getSomeOtherDishSpy).toHaveBeenCalled();
  });
});
