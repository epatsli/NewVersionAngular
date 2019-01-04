import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdishesComponent } from './listdishes.component';

xdescribe('ListdishesComponent', () => {
  let component: ListdishesComponent;
  let fixture: ComponentFixture<ListdishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
