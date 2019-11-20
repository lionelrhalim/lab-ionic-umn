import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {MapModalComponent} from "../../map-modal/map-modal.component";
import {HttpClient} from "@angular/common/http";
import {PlaceService} from "../../../home/place.service";
import {environment as ENV} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(
      private modalController: ModalController,
      private http: HttpClient,
      private placeService: PlaceService,
  ) { }

  ngOnInit() {}

  async onPickLocation() {
    const modal = await this.modalController.create({
      component: MapModalComponent
    });

    modal.onDidDismiss().then((modalData) => {
      console.log(modalData.data);

      this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
          (address) => {
            this.placeService.setAddress(address);
            console.log(address);
          }
      )
    });

    return await modal.present();
  }

  private getAddress(lat: number, lng:number) {
    return this.http.get<any>(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + ENV.mapsAPIKey
    ).pipe(
        map(geoData => {
          if (!geoData || !geoData.results || !geoData.results.length) {
            return null;
          }

          console.log(geoData);
          return geoData.results[0].formatted_address;
        })
    )
  }
}
