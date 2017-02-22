import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { currentMealtimePage } from '../currentMealtime/currentMealtime';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/mealtime/mealtime.html'
})


export class mealtimePage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  myMealtime1: any = null;
  myMealtime2: any = null;

  goToDetails() {
    this.navCtrl.push(currentMealtimePage, {
    	date1: myMealtime1,date2: myMealtime2
    	});

  }

   submit() {
    this.db = firebase.database();
  	var key = this.db.ref().child('logs').push().key;
  	var updates = {}
  
	  updates['/logs/' + key] = {
	    mealTime1: this.myMealtime1 == null? "":this.myMealtime1,
	    mealTime2: this.myMealtime2 == null? "":this.myMealtime2
	  };

	  this.db.ref().update(updates).then(result => this.parseResponse(result)).catch(this.handleError);
	  }
  }
