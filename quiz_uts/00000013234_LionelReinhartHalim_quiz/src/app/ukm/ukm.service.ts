import { Injectable } from '@angular/core';
import {UKM} from "./ukm.model";

@Injectable({
    providedIn: 'root'
})
export class UkmService {

    private ukm: UKM[] = [
        new UKM(
            1,
            'Basket',
            'Basket adalah UKM olahraga UMN',
        ),

        new UKM(
            2,
            'Katak',
            'Katak adalah UKM yang berhubungan dengan teater'
        ),

        new UKM(
            3,
            'Badminton',
            'Badminton adalah UKM olahraga UMN'
        ),

        new UKM(
            4,
            'Ultima Sonora',
            'Ultima Sonora adalah UKM paduan suara di UMN'
        ),

        new UKM(
            5,
            'Karate',
            'Karate adalah UKM bela diri di UMN'
        ),
    ];

    constructor() { }

    getAllUkm() {
        return [...this.ukm];
    }
}
