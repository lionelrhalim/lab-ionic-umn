import {Component, OnInit} from '@angular/core';
import {BookingsService} from "./bookings.service";
import {AlertController, ModalController} from "@ionic/angular";
import {NewBookingPage} from "./new-booking/new-booking.page";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    constructor(
        private bookingsService: BookingsService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
    ) {}

    ngOnInit(): void {
    }

    getBookings() {
        this.bookingsService.fetchBookings().subscribe((bookings) => {
            console.log(bookings);
        })
    }

    newBooking() {
        this.presentModal();
    }

    deleteBooking() {
        this.presentAlertPrompt();
    }

    async presentAlertPrompt() {
        const alert = await this.alertCtrl.create({
            header: 'Delete a Booking',
            inputs: [
                {
                    name: 'bookingId',
                    type: 'text',
                    placeholder: 'Enter your booking ID'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Ok',
                    handler: (data) => {
                        this.bookingsService.deleteBooking(data.bookingId).subscribe(() => {
                            this.bookingsService.fetchBookings().subscribe((bookings) => {
                                console.log(bookings);
                            });

                            console.log("DELETED");
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: NewBookingPage
        })

        return await modal.present();
    }
}
