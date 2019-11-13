import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private router: Router, private authSvc: AuthService) { }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth');
  }

  ngOnInit(){
    console.log(this.authSvc.isAuthenticated);
  }
}
