import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

    constructor(
        private modalController: ModalController,
        private authService: AuthService,
    ) { }

    ngOnInit() { }

    onSignUp(f: NgForm) {
        console.log(f.value);

        this.authService.signup(f.value.email, f.value.pwd).subscribe(response => {
            console.log(response);
            this.modalController.dismiss();
        })
    }

    onCancel() {
        this.modalController.dismiss();
    }
}
