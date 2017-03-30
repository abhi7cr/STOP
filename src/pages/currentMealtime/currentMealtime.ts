import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'currentMealtime.html'
})
export class currentMealtimePage {
   platform = null;
   navParams = null;
   updateDate1:any;
   updateDate2:any;
   db:any;
   ref:any;

     constructor(platform: Platform, navParams: NavParams) {
        this.platform = platform;
        this.navParams = navParams;
        this.updateDate1 = navParams.get("param1");
        this.updateDate2 = navParams.get("param2");

    }

  
}