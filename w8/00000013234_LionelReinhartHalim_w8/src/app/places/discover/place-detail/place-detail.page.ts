import { Component, OnInit } from '@angular/core';
import {Place} from '../../places.model';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';
import {ActionSheetController, ModalController, LoadingController} from "@ionic/angular";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

    loadedPlace: Place;

    constructor(
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private loadingController: LoadingController,
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            paramMap => {
                if (!paramMap.has('placeId')) {
                    return;
                }
                this.loadedPlace = this.placesService.getPlace(paramMap.get('placeId'));
            }
        );
    }

    async bookThisPlaceAlert() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Book Place',
            buttons: [{
                text: 'Book with Random Date',
                handler: () => {
                    this.bookPlace('random');
                }
            }, {
                text: 'Book with Selected Date',
                handler: () => {
                    this.bookPlace('select');
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel Clicked')
                }
            }]
        })

        await actionSheet.present();
    }

    async bookPlace(mode: 'select' | 'random') {
        console.log(mode);

        const modal = await this.modalController.create({
            component: CreateBookingComponent,
            componentProps: {
                'loadedPlace': this.loadedPlace,
                selectedMode: mode,
            }
        }).then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
        }).then(resultData => {
            console.log(resultData);
        })
    }
}
