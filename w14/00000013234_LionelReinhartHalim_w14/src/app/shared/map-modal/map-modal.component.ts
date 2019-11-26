import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {google} from "@agm/core/services/google-maps-types";
import {Plugins, Capacitor} from "@capacitor/core";
import {environment as ENV} from "../../../environments/environment";

@Component({
    selector: 'app-map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit
{
    lat = 51.678418;
    lng = 7.809007;

    @ViewChild('map', {static: false}) mapElementRef: ElementRef;

    constructor(
        private alertController: AlertController,
        private modalController: ModalController,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.getGoogleMaps().then((googleMaps) => {
            const mapElement = this.mapElementRef.nativeElement;
            const map = new googleMaps.Map(mapElement, {
                center: {
                    lat: this.lat,
                    lng: this.lng,
                },
                zoom: 16,
            });

            googleMaps.event.addListenerOnce(map, 'idle', () => {
                this.renderer.addClass(mapElement, 'visible');
            });

            this.getLocation().then((loc) => {
                if (!loc) {
                    const marker = new googleMaps.Marker({
                        position: {
                            lat: loc.latitude,
                            lng: loc.longitude,
                        },
                        map
                    })
                } else {
                    const marker = new googleMaps.Marker({
                        position: {
                            lat: loc.latitude,
                            lng: loc.longitude,
                        },
                        map
                    });

                    map.panTo(new googleMaps.LatLng(loc.latitude, loc.longitude));
                }
            })

            map.addListener('click', event => {
                const selectedCoords = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };

                this.modalController.dismiss(selectedCoords);
            })
        }).catch(err => {
            console.log(err);
        })
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Failed',
            message: 'Could not get user location.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async getLocation() {
        if (!Capacitor.isPluginAvailable('Geolocation')) {
            this.presentAlert();
            return null;
        }

        const coordinates = await Plugins.Geolocation.getCurrentPosition();
        return coordinates.coords;
    }

    private getGoogleMaps(): Promise<any> {
        const win = window as any;
        const googleModule = win.google;

        if (googleModule && googleModule.maps) {
            return Promise.resolve(googleModule.maps);
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + ENV.mapsAPIKey + "&callback=initMap";
            script.async = true;
            script.defer = true;

            document.body.appendChild(script);
            script.onload = () => {
                const loadedGoogleModule = win.google;

                if (loadedGoogleModule && loadedGoogleModule.maps) {
                    resolve(loadedGoogleModule.maps);
                } else {
                    reject('Google maps SDK is not available');
                }
            }
        })
    }

    onChooseLocation(event: any) {
        console.log(event);
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
    }

    onCancel() {
        this.modalController.dismiss();
    }
}
