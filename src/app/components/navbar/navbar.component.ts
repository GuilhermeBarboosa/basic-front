import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { LoginService } from 'src/app/routes/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Logout = 'Logout';

  constructor(private router: Router, private notifier: NotifierService, private loginService: LoginService) {}

  ngOnInit() {}

  logout() {
    this.loginService.logout();
  }
}
