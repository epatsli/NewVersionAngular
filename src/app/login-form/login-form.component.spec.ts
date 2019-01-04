import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { AuthService} from './auth.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

xdescribe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;
  let spy: any;
  let username: DebugElement;
  let password: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers: [AuthService, HttpClient, HttpHandler],
      imports: [RouterTestingModule, FormsModule]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    username = fixture.debugElement.query(By.css('input[type=text]'));
    password = fixture.debugElement.query(By.css('input[type=password]'));
  });

  afterEach(() => {
    authService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('canLogin returns true when the user is authenticated', () => {

    // given
    // spy = spyOn(authService, 'check').withArgs('admin', 'admin').and.returnValue(true);
    spy =  spyOn(authService, 'check').and.callFake(function() {
      return true; });

    // when
    component.check();

    // then
    expect(component.login).toBeTruthy();
//    expect(authService.check('admin','admin' )).toHaveBeenCalled();

  });



});
