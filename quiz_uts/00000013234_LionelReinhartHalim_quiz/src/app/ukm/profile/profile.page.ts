import { Component, OnInit } from '@angular/core';
import {UkmService} from "../ukm.service";
import {UKM} from "../ukm.model";
import {ProfileService} from "./profile.service";
import {IonItemSliding} from "@ionic/angular";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    joined_ukm: UKM[];

    constructor(
        private ukmService: UkmService,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        this.joined_ukm = this.profileService.getAllJoinedUkm();
    }

    ionViewDidEnter() {
        this.joined_ukm = this.profileService.getAllJoinedUkm();
    }

    deleteJoinedUkm(id: number, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.profileService.deleteJoinedUkm(id);
        this.joined_ukm = this.profileService.getAllJoinedUkm();
    }
}
