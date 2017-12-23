import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface Map {
  currentLocation: {
    lat: number;
    lng: number;
    zoom: number;
    allowed: boolean;
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  @Output() toggleMapEvent = new EventEmitter();

  public map: Map = {
    currentLocation: {
      lat: 0,
      lng: 0,
      zoom: 12,
      allowed: true
    }
  };

  constructor() { }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.map.currentLocation.lat = position.coords.latitude;
          this.map.currentLocation.lng = position.coords.longitude;
          this.map.currentLocation.zoom = 12;
        },
        error => {
          this.map.currentLocation.allowed = false;
          this.map.currentLocation.lat = -33.7817605;
          this.map.currentLocation.lng = 151.2551633;
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  toggleMap(event) {
    if (event.target === event.currentTarget) {
      this.toggleMapEvent.emit(true);
    }
  }

}
