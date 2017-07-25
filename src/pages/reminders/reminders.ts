import { Component, OnInit } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';
import { HomePage } from '../home/home';
import { NewHomePage } from '../newHome/newHome';
import { LocalNotifications } from 'ionic-native';
import {AngularFire, FirebaseAuthState, AngularFireAuth} from 'angularfire2';
//import * as moment from 'moment';

//declare var firebase:any;

@Component({
  templateUrl: 'reminders.html'
})


export class remindersPage implements OnInit {

  private authState: FirebaseAuthState;
  constructor(private navController: NavController,
            private firebase: AngularFire,
            public auth$: AngularFireAuth,
            private _platform: Platform) {
    //this.initApp();
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  myReminder1:any=null;
  myReminder2:any=null;
  notifications: any[] = [];
  db:any;
  ref:any;
  reminderText: string = 'Reminder to go to the toilet and complete questionnare!';

  //notifyTime: any;
  //notifications: any[] = [];
  //chosenHours: number;
  //chosenMinutes: number;

  ngOnInit(){
    this.updateInfo();
  }

  goToCurrentReminder() {
    this.navController.push(currentRemindersPage, {
    	param1: this.myReminder1, param2: this.myReminder2
    	});
  }

  //timeChange(time) {
        //this.chosenHours = time.hour.value;
        //this.chosenMinutes = time.minute.value;
  //}


  updateInfo() {
      this.db = this.firebase.database;
      this.ref = this.db.object('/reminderSetting/'+this.authState.auth.uid, {preserveSnapshot: true});
      this.ref.subscribe(snapshot => {
        this.myReminder1 = snapshot.child('reminder1').val();
        this.myReminder2 = snapshot.child('reminder2').val();
        //this.updateLocalNotifications();
      });
   
      
  }

  parseResponse(response: any)
  {
      alert("Your reminder has been set!");     
      this.updateLocalNotifications();
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting reminder:" + error.message);
 }

  submit() {
      this.db = this.firebase.database;
      this.db.object('reminderSetting/'+ this.authState.auth.uid).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

    updateLocalNotifications() {
       //reminder notifications
       if(this._platform.is('cordova')){
      let firstNotificationTime = new Date();
      let secondNotificationTime = new Date();

      let hourMinute1 = this.myReminder1.split(':');
      let hour1 = hourMinute1[0];
      let minute1 = hourMinute1[1];
      firstNotificationTime.setHours(hour1);
      firstNotificationTime.setMinutes(minute1);
      firstNotificationTime.setSeconds(0, 0);

      let hourMinute2 = this.myReminder2.split(':');
      let hour2 = hourMinute2[0];
      let minute2 = hourMinute2[1];
      secondNotificationTime.setHours(hour2);
      secondNotificationTime.setMinutes(minute2);
      secondNotificationTime.setSeconds(0, 0);

       //alert("Your first reminder will be at: " + firstNotificationTime.toLocaleString() + ", and your second reminder will be at: " + secondNotificationTime.toLocaleString());
     
       let notification1 = {
                    id: '1',
                    title: 'Hey!',
                    text: this.reminderText,
                    at: firstNotificationTime,
                    every: 'day'
        };
     
       let notification2 = {
                    id: '2',
                    title: 'Hey!',
                    text: this.reminderText,
                    at: secondNotificationTime,
                    every: 'day'
        };

        this.notifications.push(notification1);
        this.notifications.push(notification2);
     
        console.log("Notifications to be scheduled: ", this.notifications);
        LocalNotifications.cancelAll().then(() => {
        LocalNotifications.schedule(this.notifications);
        this.notifications = [];
        LocalNotifications.on('click', () => {
            let activeComponent = this.navController.getActive().component.name;
            if(activeComponent !== 'NewHomePage')
              this.navController.setRoot(NewHomePage);
        });
      });
    }
  }

}
