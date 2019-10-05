import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {UKM} from "../ukm.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private joined_ukm = [];

    constructor(
        private toastController: ToastController,
    ) { }

    getAllJoinedUkm() {
        return [...this.joined_ukm];
    }

    getJoinedUkm(id: number) {
        return {
            ...this.joined_ukm.find(ukm => {
                return ukm.id === id;
            })
        }
    }

    addJoinedUkm(ukm: UKM) {
        let is_joined = this.getJoinedUkm(ukm.id);
        is_joined.hasOwnProperty('id') ? this.presentToast('Kamu sudah bergabung dalam UKM ini.', 1000) : this.joined_ukm.push(ukm);
    }

    deleteJoinedUkm(id: number) {
        this.joined_ukm = this.joined_ukm.filter(ukm => ukm.id !== id);
        this.presentToast("Berhasil Keluar dari UKM", 500);
    }

    async presentToast(message: string, duration: number) {
        let toast = await this.toastController.create({
            message: message,
            duration: duration
        });

        await toast.present();
    }
}
