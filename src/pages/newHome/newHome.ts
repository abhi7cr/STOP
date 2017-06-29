import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {CalendarPage} from '../calendar/calendar';
import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
import {CalendarService} from '../calendar/calendar.service';
import {ThisDayPage} from '../thisDay/thisDay';
import * as moment from 'moment';

@Component({
  templateUrl: 'newHome.html'
})
export class NewHomePage {
	 private authState: FirebaseAuthState;
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
     private firebase: AngularFire,
     private auth$: AngularFireAuth,
     private calendarService: CalendarService) {
    //this.user = firebase.auth().currentUser;
      this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      let activeComponent = this.navController.getActive().component.name;
   
    if(this.authState === undefined || this.authState === null && activeComponent !== 'LoginPage'){
           this.navController.setRoot(LoginPage); 
    }
    else{
    	this.userName = this.authState.auth.email.split('@')[0].toString();
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
			//this.fetchLogs();
		// while(true){
			if(this.authState !== null)
			{
				this.calendarService.fetchLogs().subscribe(
				() => this.updateProperties());
			}
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
    	//this.app.getRootNav().setRoot(thisDayPage);
    }

   logout(){
  
    this.firebase.auth.logout().then((response) => {
          //this.navController.setRoot(LoginPage);
            //this.auth$.unsubscribe();
    });
  }

}