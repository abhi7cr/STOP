import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {mealtimePage} from '../mealtime/mealtime';
import { remindersPage } from '../reminders/reminders';
import { TimerPage } from '../timers/timer';
import { settingEmojiPage } from '../settingEmoji/settingEmoji';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'thisDay.html'
})
export class ThisDayPage implements OnInit {
  posts: any[] = [];
  message1:any;
  message2:any;
  message3:any;
  activities: any[] = [];
  date: string;
  private authState;
  private auth;
  constructor(private navController: NavController,
            public auth$: AngularFireAuth,
            public db: AngularFireDatabase,
            private navParams: NavParams) {
    //this.initApp();
    this.authState = auth$.authState;
    this.authState.subscribe((state) => {
      this.auth = state;
      if(this.auth === undefined)
        this.navController.push(LoginPage);
    });
  }

  ngOnInit(){
  }

  goToMealtime() {
    this.navController.push(mealtimePage);
  }
  goToReminder() {
    this.navController.push(remindersPage);
  }
  goToTimer() {
    this.navController.push(TimerPage);
  }
  goToEmoji() {
    this.navController.push(settingEmojiPage);
  }

  viewActivity() {
    var currentUser = this.authState.auth.uid;
    var str1='';
    var str2=''; 
    var str3='';
    for(var i in this.posts)
    {
        let hourMinuteComponents = this.posts[i].time.split(':');
        let hourComponent = hourMinuteComponents[0]
        let minuteComponent = hourMinuteComponents[1]
        let stool = false;
        let sit = false;
        let noDose = false;
        let classColor = '';
        
        if(Number(minuteComponent) < 10)
          minuteComponent = '0' + minuteComponent;
        if(hourComponent === '0')
            this.posts[i].time = hourComponent + '0' + ':' + minuteComponent;

        let formattedTime = Number(hourComponent) >= 12?
                  this.posts[i].time + ' pm': this.posts[i].time + ' am';
              // if(date.getFullYear() == this.currentYear)
             var message1 = '', message2 = '', message3 = '';
            if(!this.posts[i].dose)
            {
              str1='Cool! You\'ve not used a dose softner.';
              message1 = str1;
              noDose = true;
            }   
            if(this.posts[i].sit)
            {
              str2='Great! You\'ve tried to sit down at '+formattedTime+' !';
              message2 = str2;
              sit = true;
            }
            if(this.posts[i].stool)
            {
              str3='Excellent! You\'ve produced a stool of type '+this.posts[i].stoolType+' !';
              message3 = str3;
              stool = true;
            }

            if(stool)
                classColor = 'green';
            else if(sit)
                classColor = 'red';
            else if(noDose)
                classColor = 'blue';

            this.activities.push({
              message1: message1,
              message2: message2,
              message3: message3,
              class: classColor
            });
          // }
      
    }
  }

  parseResponse(response)
  {   
    this.posts = response;
    this.viewActivity();
  }

  ionViewWillEnter(){
      this.date =  this.navParams.get("param1").date;
      let timeInMilliseconds = new Date(Number(this.date.split('-')[0]),
                                        Number(this.date.split('-')[1]),
                                        Number(this.date.split('-')[2]));
      this.fetchLogs(timeInMilliseconds.valueOf());
  }

  fetchLogs(ms: number) {  
        var uid = this.auth.uid;
        let oneDayInMs:number = 3600*1000*24;
        let nextDayinMs:number = ms + oneDayInMs;
        var ref = this.db.list('logs/'+ uid, 
          { 
            query: {
            orderByChild: 'date',
            startAt: ms,
            endAt: nextDayinMs
          }
        });
        ref.subscribe(result => this.parseResponse(result));    
    }

}