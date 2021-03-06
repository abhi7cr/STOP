import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'currentTimers.html'
})
export class currentTimersPage {
   platform = null;
   navParams = null;
   start1:any;
   start2:any;
   end1:any;
   end2:any;
   db:any;
   ref:any;

     constructor(platform: Platform, navParams: NavParams) {
     	this.platform = platform;
     	this.navParams = navParams;
     	this.start1 = navParams.get("param1");
     	this.end1 = navParams.get("param2");
     	this.start2 = navParams.get("param3");
     	this.end2 = navParams.get("param4");
    }
}