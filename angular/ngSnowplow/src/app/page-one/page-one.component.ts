import { Component, OnInit } from '@angular/core';
import { SnowplowService } from '../snowplow.service';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

}
