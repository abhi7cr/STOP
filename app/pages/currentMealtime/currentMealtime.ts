import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-currentMealtime',
  templateUrl: 'build/pages/currentMealtime/currentMealtime.html'
})
export class currentMealtimePage {
   platform = null;
   navParams = null;
   date1:Date = null;
   date2:Date = null;
     constructor(platform: Platform, navParams: NavParams) {
        this.platform = platform;
        this.navParams = navParams;
        this.date1 = navParams.get("date1");
        this.date2 = navParams.get("date2");
    }

  
}