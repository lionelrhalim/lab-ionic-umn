import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {BookingsService} from "../bookings.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-new-booking',
    templateUrl: './new-booking.page.html',
    styleUrls: ['./new-booking.page.scss'],
})
export class NewBookingPage implements OnInit {

    constructor(
        private modalController: ModalController,
        private bookingService: BookingsService
    ) { }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss(null, 'cancel');
    }

    addNewBooking(f: NgForm) {
        this.bookingService.insertBooking({
            'booking_name': f.value.bookingName,
            'topic': f.value.topic,
            'details': f.value.details,
            'booking_date': f.value.bookingDate,
            'start_hour': f.value.startHour,
            'end_hour': f.value.endHour,
            'creator': f.value.creator,
        }).subscribe(() => {
            this.bookingService.fetchBookings().subscribe((bookings) => {
                console.log(bookings);
            });

            console.log("INSERTED");
            this.closeModal();
        })
    }
}
