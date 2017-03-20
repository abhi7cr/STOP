import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { currentMealtimePage } from '../currentMealtime/currentMealtime';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/mealtime/mealtime.html'
})


export class mealtimePage {

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.navCtrl = navCtrl;

  }

  myMealtime1:any=null;
  myMealtime2:any=null;
  db:any;
  ref:any;
  auth = firebase.auth();


  goToDetails() {
    this.navCtrl.push(currentMealtimePage, {
    	param1: this.myMealtime1, param2: this.myMealtime2
    	});

  }

  updateInfo() {
      var info1;
      var info2;
      this.db = firebase.database();
      this.ref = this.db.ref('/mealtimeSetting/'+this.auth.currentUser.uid);
      this.ref.on('value', function(snapshot){
        this.myMealtime1 = info1;
        this.myMealtime2 = info2;
        info1 = snapshot.child('mealTime1').val();
        info2 = snapshot.child('mealTime2').val();
        alert("mealtime updated successfully!");
        

      });
  }

  submit2() {
      this.db = firebase.database();
      this.db.ref('mealtimeSetting').child(this.auth.currentUser.uid).set({
        mealTime1: this.myMealtime1 == null? "":this.myMealtime1,
        mealTime2: this.myMealtime2 == null? "":this.myMealtime2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

    parseResponse(response: any)
  {
      alert("Your Mealtime has been set!");     
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting mealtime:" + error.message);
}
}



