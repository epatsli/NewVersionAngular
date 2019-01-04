import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ListdishesComponent} from './template/listdishes/listdishes.component';
import {DetailsComponent} from './template/listdishes/details/details.component';
import {ListordersComponent} from './template/listorders/listorders.component';
import {OrderComponent} from './template/listorders/order/order.component';
import {AddressDetailsComponent} from './template/listorders/address-details/address-details.component';
import {AuthService} from './login-form/auth.service';
import {TemplateComponent} from './template/template.component';
import {SummaryComponent} from './summary/summary.component';
import {AddDishComponent} from './template/listdishes/add-dish/add-dish.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'dishes', component: DishesComponent},
  {path: 'dishes/:type', component: DishesComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'shopping-cart/summary', component: SummaryComponent},
  {path: 'listdishes', component: ListdishesComponent, canActivate: [AuthService]},
  {path: 'listdishes/add-dish', component: AddDishComponent, canActivate: [AuthService]},
  {path: 'listdishes/details/:id', component: DetailsComponent, canActivate: [AuthService]},
  {path: 'listorders', component: ListordersComponent, canActivate: [AuthService]},
  {path: 'listorders/order/:id', component: OrderComponent, canActivate: [AuthService]},
  {path: 'listorders/address-details/:id', component: AddressDetailsComponent, canActivate: [AuthService]},
  {path: 'admin', component: TemplateComponent, canActivate: [AuthService]},
  {path: '**', redirectTo: 'dishes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
