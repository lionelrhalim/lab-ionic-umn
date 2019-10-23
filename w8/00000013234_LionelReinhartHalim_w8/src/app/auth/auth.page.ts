import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    isLoading: boolean;
    isLogin = true;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isLoading = false;
        this.isLogin = true;
    }

    ionViewWillEnter() {
        this.isLoading = false;
        this.isLogin = true;
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }

    onLogin() {
        /*this.isLoading = true;
        this.authService.login();

        setTimeout(() => {
            this.isLoading = false;
            this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);*/
    }

    onSubmit(form: NgForm) {
        //this.isLoading = true;

        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);

        if (this.isLogin) {
            // Send a request to login server
        } else {
            // Send a request to a signup server
        }
    }
}
