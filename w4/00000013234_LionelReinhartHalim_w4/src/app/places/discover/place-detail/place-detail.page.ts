import { Component, OnInit } from '@angular/core';
import {Place} from '../../places.model';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';

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
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            paramMap => {
                if (!paramMap.has('placeId')) {
                    return;
                }
                console.log(paramMap.get('placeId'));
                this.loadedPlace = this.placesService.getPlace(paramMap.get('placeId'));
            }
        );
    }

}
