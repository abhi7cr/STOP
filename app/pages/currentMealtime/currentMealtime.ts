import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

declare var firebase: any;

@Component({
  selector: 'page-currentMealtime',
  templateUrl: 'build/pages/currentMealtime/currentMealtime.html'
})
export class currentMealtimePage {
   platform = null;
   navParams = null;
   updateDate1:any;
   updateDate2:any;
   db:any;
   auth = firebase.auth();
   ref:any;

     constructor(platform: Platform, navParams: NavParams) {
        this.platform = platform;
        this.navParams = navParams;
        this.updateDate1 = navParams.get("param1");
        this.updateDate2 = navParams.get("param2");

    }

  
}