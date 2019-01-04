import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {SummaryService} from '../summary/summary.service';
import {v} from '@angular/core/src/render3';
import {element} from 'protractor';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public shoppingCartService: ShoppingCartService,
              public summaryService: SummaryService) {
  }

  ngOnInit() {
  }

  hiddenButton() {
    this.shoppingCartService.showNameButton();
    this.summaryService.toggle();
  }
}
