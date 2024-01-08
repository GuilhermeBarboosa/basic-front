import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  role = localStorage.getItem('role');
  constructor( private loginService: LoginService) { }

  ngOnInit() {
    this.openMenu();
  }

  openMenu() {
      let sidebar = document.querySelector('.sidebar');
      let closeBtn = document.querySelector('#btn');
      let searchBtn = document.querySelector('.bx-search');

      closeBtn!.addEventListener('click', () => {
        sidebar!.classList.toggle('open');
        menuBtnChange();
      });

      searchBtn!.addEventListener('click', () => {
        sidebar!.classList.toggle('open');
        menuBtnChange();
      });

      function menuBtnChange() {
        if (sidebar!.classList.contains('open')) {
          closeBtn!.classList.replace('bx-menu', 'bx-menu-alt-right');
        } else {
          closeBtn!.classList.replace('bx-menu-alt-right', 'bx-menu');
        }
      }
  }

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.loginService.logout();
  }
}
