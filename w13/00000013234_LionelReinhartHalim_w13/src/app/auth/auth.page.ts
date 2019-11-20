import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    constructor(
        private modalCtrl: ModalController,
        private authSvc: AuthService,
        private router: Router,
        private toastCtrl: ToastController,
    ) { }

    ngOnInit() {
        console.log(this.authSvc.isAuthenticated);

        if (this.authSvc.isAuthenticated) {
            console.log("User already Logged In");
            this.router.navigateByUrl('/home');
        }
    }

    onLogin(f: NgForm) {
        this.authSvc.login(f.value.email, f.value.pwd).subscribe(
            response => {
                if (response.idToken) {
                    console.log(response);
                    this.authSvc.isAuthenticated = true;
                    this.router.navigateByUrl('/home');
                } else {
                    this.presentToast('Login Failed', 1000);
                }
            },
            errorResponse => {
                console.log(errorResponse);
                this.presentToast('Username or Password Invalid', 1000);
            }
        );

        //this.router.navigateByUrl('/home');
    }

    async presentSignUpModal() {
        const modal = await this.modalCtrl.create({
            component: SignUpComponent
        });
        return await modal.present();
    }

    async presentToast(message: string, duration: number) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration
        });

        return await toast.present();
    }
}
