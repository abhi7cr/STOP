import { Component, OnInit } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';
import { HomePage } from '../home/home';
import { NewHomePage } from '../newHome/newHome';
//import {AngularFire, FirebaseAuthState, AngularFireAuth} from 'angularfire2';
//import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

//declare var firebase:any;

@Component({
  templateUrl: 'reminders.html'
})


export class remindersPage implements OnInit {

  private authState;
  private auth;
  constructor(private navController: NavController,
            public auth$: AngularFireAuth,
            public db:AngularFireDatabase,
            private _platform: Platform) {
    this.authState = auth$.authState;
    this.authState.subscribe((state) => {
      this.auth = state;
    });
  }

  myReminder1:any=null;
  myReminder2:any=null;
  notifications: any[] = [];
  ref:any;
  phone: string;
  reminderText: string = 'Reminder to go to the toilet and complete questionnare!';

  ngOnInit(){
    this.updateInfo();
  }

  goToCurrentReminder() {
    this.navController.push(currentRemindersPage, {
    	param1: this.myReminder1, param2: this.myReminder2
    	});
  }

  updateInfo() {
      this.ref = this.db.object('/reminderSetting/'+this.auth.uid, {preserveSnapshot: true});
      this.ref.subscribe(snapshot => {
        this.myReminder1 = snapshot.child('reminder1').val();
        this.myReminder2 = snapshot.child('reminder2').val();
      });
      this.ref = this.db.object('/user/' + this.auth.uid, {preserveSnapshot: true});
      this.ref.subscribe(snapshot => {
        this.phone = snapshot.child('phone').val();
      });
  }

  parseResponse(response: any)
  {
      alert("Your reminder has been set!");
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting reminder:" + error.message);
 }

  submit() {
      this.db.object('reminderSetting/'+ this.auth.uid).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2,
        timeZoneOffset: new Date().getTimezoneOffset() / 60
      }).then(result => this.parseResponse(result)).catch(this.handleError);
      if (this.phone !== '') {
           this.db.object('/user/' + this.auth.uid).set({
           phone: this.phone
         })
        .then(result => console.log('saved phone' + this.phone))
        .catch(this.handleError);
      }
    }
}
