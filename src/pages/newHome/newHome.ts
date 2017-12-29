import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {CalendarPage} from '../calendar/calendar';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
import {CalendarService} from '../calendar/calendar.service';
import {ThisDayPage} from '../thisDay/thisDay';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'newHome.html'
})
export class NewHomePage {
	 private authState;
	 private auth;
	 today: string = moment().format('D MMM YYYY');
	 userName: string = '';
	 displayCurrentWeek:any[] = [];
	 currentMonth: string;
	 currentYear: number;
	 daysOfWeek: any[] = [];
	 currentMonthInNumber: number = 0;
	 hasLoaded: boolean = false;

	 constructor(private navController: NavController, 
     private navParams: NavParams,
     public menuCtrl: MenuController,
     private auth$: AngularFireAuth,
     private calendarService: CalendarService) {
     this.authState = auth$.authState;
      this.authState.subscribe((auth) => {   
      this.auth = auth;
      if(this.auth === undefined || this,auth === null){
           this.navController.setRoot(LoginPage); 
      }
      else{  	
    	this.userName = this.auth.email.split('@')[0].toString();
    	this.calendarService.fetchLogs().subscribe(
				() => this.updateProperties());
     }
    });
  }

  goToHomePage(){
  	this.navController.push(HomePage)
  }

  goToCalendarPage(){
  	this.navController.push(CalendarPage)
  }

  goToMenu(){
  	this.menuCtrl.open();
  }

  ionViewWillEnter = () => {
		// if(this.auth !== undefined && this.auth !== null)
		// {
		// 	this.calendarService.fetchLogs().subscribe(
		// 		() => this.updateProperties());
		// }
   }

  updateProperties = () => {
			let displayCurrentMonth = this.calendarService.displayCurrentMonth;
			this.currentMonth = this.calendarService.currentMonth;
			this.currentYear = this.calendarService.currentYear;
			this.currentMonthInNumber =  this.calendarService.currentMonthInNumber;
			this.daysOfWeek = this.calendarService.daysOfWeek;
			this.daysOfWeek = this.calendarService.daysOfWeek;
			let currentDate = new Date().getDate();
			let index = -1;
			displayCurrentMonth.filter((val, ind) => {			
				if(val.day === currentDate)
					index = ind;
				return val.day === currentDate;
			});

			let startWeekIndex = index % 7 === 0? index: index - index%7;
			//alert(startWeekIndex);

			this.displayCurrentWeek = displayCurrentMonth.filter((val, ind) => {			
				return ind >= startWeekIndex && ind <= (startWeekIndex+7);
			});
			this.hasLoaded = true;
	}

	goToMethod(day: any) {
    	this.navController.push(ThisDayPage, {param1: day});
    }

   logout(){
  
    this.auth$.auth.signOut().then((response) => {
    });
  }

}