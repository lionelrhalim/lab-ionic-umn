import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {UkmService} from "../ukm.service";
import {UKM} from "../ukm.model";
import {ProfileService} from "../profile/profile.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    all_ukm: UKM[];

    constructor(
        private ukmService: UkmService,
        private profileService: ProfileService,
        private alertController: AlertController,
    ) { }

    ngOnInit() {
        this.all_ukm = this.ukmService.getAllUkm();
    }

    getUkm(id: number) {
        return {
            ...this.all_ukm.find(ukm => {
                return ukm.id === id;
            })
        }
    }

    async presentJoinAlert(id: number) {
        const alert = await this.alertController.create({
            header: 'Beneran Mau Join?',
            buttons: [
                {
                    text: 'Batal',
                    role: 'cancel',
                },
                {
                    text: 'Serius',
                    handler: () => {
                        this.joinUkm(id)
                    }
                }
            ]
        });

        await alert.present();
    }

    joinUkm(id: number) {
        let selected_ukm = this.getUkm(id);
        this.profileService.addJoinedUkm(selected_ukm);
    }
}
