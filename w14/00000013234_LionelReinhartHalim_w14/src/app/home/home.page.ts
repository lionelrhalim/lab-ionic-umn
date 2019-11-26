import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {PlaceService} from "./place.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit
{
  address = '';

  constructor(
      private router: Router,
      private authSvc: AuthService,
      private placeService: PlaceService,
  ) { }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth');
  }

  ngOnInit(){
    this.placeService.getAddress().subscribe(
        currAddress => {
          this.address = currAddress;
        }
    )
  }
}
