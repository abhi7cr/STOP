import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { currentTimersPage } from '../currentTimers/currentTimers';

declare var firebase:any;

@Component({
  selector: 'page-timers',
  templateUrl: 'build/pages/timers/timers.html'
})
export class timersPage {

  constructor(public navCtrl: NavController) {
  	this.navCtrl = navCtrl;
  }

  mytimerStart1:any=null;
  mytimerStart2:any=null;
  mytimerEnd1:any=null;
  mytimerEnd2:any=null;
  db:any;
  ref:any;
  auth = firebase.auth();

  goToCurrentTimers() {
    this.navCtrl.push(currentTimersPage, {
    	param1: this.mytimerStart1, param2: this.mytimerEnd1, param3: this.mytimerStart2, param4: this.mytimerEnd2
    	});
  }

  updateInfo() {
      var info1;
      var info2;
      var info3;
      var info4;
      this.db = firebase.database();
      this.ref = this.db.ref('/timerSetting/'+this.auth.currentUser.email.split('@')[0].toString());
      this.ref.on('value', function(snapshot){
        info1 = snapshot.child('Starter1').val();
        info2 = snapshot.child('Ender1').val();
        info3 = snapshot.child('Starter2').val();
        info4 = snapshot.child('Ender2').val();

      });
      this.mytimerStart1 = info1;
      //console.log(this.myMealtime1);
      this.mytimerEnd1 = info2;
      this.mytimerStart2 = info3;
      this.mytimerEnd2 = info4;

  }

    submit() {
      this.db = firebase.database();
      this.db.ref('timerSetting').child(this.auth.currentUser.email.split('@')[0].toString()).set({
        Starter1: this.mytimerStart1 == null? "":this.mytimerStart1,
        Ender1: this.mytimerEnd1 == null? "":this.mytimerEnd1,
        Starter2: this.mytimerStart2 == null? "":this.mytimerStart2,
        Ender2: this.mytimerEnd2 == null? "":this.mytimerEnd2
      });

    }

}