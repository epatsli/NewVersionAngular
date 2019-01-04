import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login-form/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  isDishList = false;
  isOrderList = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

}
