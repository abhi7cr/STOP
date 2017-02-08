import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-currentTimers',
  templateUrl: 'build/pages/currentTimers/currentTimers.html'
})
export class currentTimersPage {
   platform = null;
   navParams = null;
   date1:Date = null;
   date2:Date = null;
     constructor(platform: Platform, navParams: NavParams) {
    }

  
}