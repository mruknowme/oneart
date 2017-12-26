import { Component, OnInit } from '@angular/core';

declare var particlesJS;

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.sass']
})
export class MaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    particlesJS.load('particles-js', '/assets/particles.json');
  }

}
