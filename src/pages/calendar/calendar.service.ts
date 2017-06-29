import {Injectable, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {NavController, Nav, App} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Observable} from 'rxjs';
import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';

@Injectable()
export class CalendarService {
	@ViewChild(Nav) navController;
	constructor(
            private firebase: AngularFire,
            public auth$: AngularFireAuth){
		 this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      if(this.authState === null || this.authState === undefined)
      	if(this.navController !== undefined)
      		this.navController.push(LoginPage);
    });

	}
	
	private authState: FirebaseAuthState;
	displayCurrentMonth: any[] = [];
	events: any[];
    user: any;
	posts: any[] = [];
	Url2:any;
	Url1:any;
	rows: any[] = [];
	d: Date = new Date();
	currentMonthInNumber = new Date(Date.now()).getMonth();
	currentDay = this.mapNumberToDay(new Date(Date.now()).getDay());
	currentDayInNumber = new Date(Date.now()).getDay();
	currentDate = new Date(Date.now()).getDate();
	currentYear = new Date(Date.now()).getFullYear();
	currentMonth = this.mapNumberToMonth(this.currentMonthInNumber);
	days: any[] = [];
	noOfDays: number;
	today: string = moment().format('D MMM YYYY');
	daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	offset = 0;
	db:any;
    ref:any



	assignDaysOfPrevMonth()
	{
		var firstDay = moment().year(this.currentYear).month(this.currentMonthInNumber).date(1).day();
		this.offset = firstDay;
		if(firstDay != 0){
			var prevMonthId;
			var prevYearId;
			if(this.currentMonthInNumber == 0){
					prevMonthId = 11;
					prevYearId = this.currentYear-1;
			}
			else{
				prevMonthId = this.currentMonthInNumber - 1;
				prevYearId= this.currentYear;
			}
 			var noOfDays = this.getNoOfDays(prevMonthId);
 			var start = noOfDays-firstDay+1;
 			for(var i = start; i <= noOfDays; i++){
 				var prevYear = this.days[prevYearId];
 				if(prevYear != null &&
 					prevYear[prevMonthId] != null &&
 					prevYear[prevMonthId][noOfDays-i] != null){
 				this.displayCurrentMonth[i] = prevYear[prevMonthId][i];
 				this.displayCurrentMonth[i].day = i;
 				this.displayCurrentMonth[i].color = 'gray';
 				this.displayCurrentMonth[i].bgColor = 'white';
 			}
 			else{
 				this.displayCurrentMonth.push({
 											   day: this.mapNumberToDisplayMonth(prevMonthId) + " " + i,
 											   url1: "",
 											   url2: "",
 											   url11: "",
 											   url22: "",
 											   morningStoolCount: 0,
 											   morningSitCount: 0,
 											   eveningStoolCount: 0,
 											   eveningSitCount: 9,
 											   color: 'gray',
 											   bgColor: 'white'});
 				}
			}
		}
	}

	updateCalendar(observer)
	{
		this.displayCurrentMonth = [];
		if(observer === null){
      	return Observable.create(observer => {
		this.updateInfo(observer);
			});
      }
      	else
      		this.updateInfo(observer);
		// this.processPosts();
		
	}

	getNoOfDays(month: number)
	{
		this.noOfDays = 30;
		if(month == 1){
			this.noOfDays = this.currentYear % 4 == 0? 29: 28;
		}
		else if(month == 0 || month == 2 || 
				month == 6 ||
				month == 4 || month == 7 || 
				month == 9 || month == 11){
			this.noOfDays = 31;
		}	
		return this.noOfDays;
	}

	mapNumberToDay(num: number)
	{
		switch (num) {
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
			default:
				// code...
				break;
		}
	}

	mapNumberToDisplayDay(num: number)
	{
		switch (num) {
			case 0:
				return "Sun";
			case 1:
				return "Mon";
			case 2:
				return "Tue";
			case 3:
				return "Wed";
			case 4:
				return "Thu";
			case 5:
				return "Fri";
			case 6:
				return "Sat";
			default:
				// code...
				break;
		}
	}

	mapNumberToMonth(num: number)
	{
		switch (num) {
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
			default:
				// code...
				break;
		}
	}

	mapNumberToDisplayMonth(num: number)
	{
		switch (num) {
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "Jul";
			case 7:
				return "Aug";
			case 8:
				return "Sep";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			case 11:
				return "Dec";
			default:
				// code...
				break;
		}
	}


	initializeCalendar()
	{
		this.rows = Array.from(Array(6).keys());
		var j: number = 0;
		var currentMonth = this.currentMonthInNumber;
		for(var l=1; l<=this.getNoOfDays(currentMonth); l++){
			var curYear = this.days[this.currentYear];
			var bgColor  = 'white';
			var fgColor  = 'black';
			if(curYear != null && 
				curYear[currentMonth] != null && 
				curYear[currentMonth][l] != null){

				this.displayCurrentMonth.push({
												url1:curYear[currentMonth][l].url1,
												url2:curYear[currentMonth][l].url2,
												url11:curYear[currentMonth][l].url11,
												url22:curYear[currentMonth][l].url22,
												morningStoolCount: curYear[currentMonth][l].morningStoolCount,
												morningSitCount: curYear[currentMonth][l].morningSitCount,
												eveningStoolCount: curYear[currentMonth][l].eveningStoolCount,
												eveningSitCount: curYear[currentMonth][l].eveningSitCount,
												day:l,
												color: fgColor,
											    bgColor: bgColor,
											    date: this.currentYear + "-" + currentMonth + "-" + l});
			}
			else{
					this.displayCurrentMonth.push({day: l,
												   url1: "",
												   url2: "",
												   url11: "",
												   url22: "",
												   morningStoolCount: 0,
												   morningSitCount: 0,
												   eveningStoolCount: 0,
												   eveningSitCount: 0,
												   color: fgColor,
												   bgColor: bgColor,
												   date: ''});
				}
				
			}
		
		if(this.displayCurrentMonth.length < 42)
		{
			var curMonthId=currentMonth+1;
			var curYearId = this.currentYear;
			if(currentMonth+1==12){
					curMonthId = 0;
					curYearId++;
			}

			var i = 1;
			for(l; l<= 42; l++){
				var url1 = "";
				var url2 = "";
				var url11 = "";
				var url22 = "";
				var morningStoolCount = 0;
				var morningSitCount = 0;
				var eveningStoolCount = 0;
				var eveningSitCount = 0;

				var curYear = this.days[curYearId];
				if(curYear != null && curYear[curMonthId] != null && 
							curYear[curMonthId][i] != null){
					url1 = curYear[curMonthId][i].url1;
					url2 = curYear[curMonthId][i].url2;
					url11 = curYear[curMonthId][i].url11;
					url22 = curYear[curMonthId][i].url22;
					morningStoolCount = curYear[curMonthId][i].morningStoolCount;
					morningSitCount = curYear[curMonthId][i].morningSitCount;
					eveningStoolCount = curYear[curMonthId][i].eveningStoolCount;
					eveningSitCount = curYear[curMonthId][i].eveningSitCount;
					// alert(morningStoolCount + ',' + morningSitCount + ',' +
					// 		eveningStoolCount + ',' + eveningSitCount)
				}

				this.displayCurrentMonth.push({
												day: this.mapNumberToDisplayMonth(curMonthId) + " " + i, 
												url1: url1,
												url2: url2,
												url11:url11,
												url22:url22,
												morningStoolCount: morningStoolCount,
												morningSitCount: morningSitCount,
												eveningStoolCount: eveningStoolCount,
												eveningSitCount: eveningSitCount,
												color: 'gray',
												bgColor: 'white',
												date: curYearId + "-" + curMonthId + "-" + i,
												});
				i++;
			}
		}
		var monthName: string = this.mapNumberToDisplayMonth(this.currentMonthInNumber);
		if(this.today.indexOf(this.currentYear.toString()) != -1 &&
			this.today.indexOf(monthName) != -1){
			this.displayCurrentMonth[this.currentDate+this.offset-1].color = '#f17b63';
		}
				
	}
	
   updateInfo = (observer) => {
      this.db = this.firebase.database;
      this.ref = this.db.object('/emojiSetting/'+this.authState.auth.uid, { preserveSnapshot: true });
      this.ref.subscribe(snapshot => {
      		this.postProcess(snapshot, observer);
      });
	}
     

   postProcess = (snapshot, observer) => {
   	this.Url1 = snapshot.child('url1').val();
    this.Url2 = snapshot.child('url2').val();

    if(this.Url1 === undefined || this.Url1 === null)
      	this.Url1 = "assets/images/poop_2.png";

    if(this.Url2 === undefined || this.Url2 === null)
      	this.Url2 = "assets/images/poop_3.png";

    this.processPosts();
    this.assignDaysOfPrevMonth();
	this.initializeCalendar();
	observer.next();
	observer.complete();
    
   }

	processPosts()
	{		
		for(var i in this.posts)
		{
			// if(this.posts[i].uid == currentUser.uid)
			// {
				//alert(this.posts[i].uid);
				var date = new Date(this.posts[i].date);
				var currentDate = date.getDate();
				var currMonth = date.getMonth();
				var currYear = date.getFullYear();
				this.d = date;
			// if(date.getFullYear() == this.currentYear)
				if( this.days[currYear] == undefined || 
					this.days[currYear] == null){
					this.days[currYear] = [];
				}
				if(this.days[currYear][currMonth] === undefined ||
					this.days[currYear][currMonth] === null){
					this.days[currYear][currMonth] = [];
				}
				if(this.days[currYear][currMonth][currentDate] === undefined || 
					this.days[currYear][currMonth][currentDate] === null ){
					this.days[currYear][currMonth][currentDate] = {};
					this.days[currYear][currMonth][currentDate].url1 = '';
					this.days[currYear][currMonth][currentDate].url2 = '';
					this.days[currYear][currMonth][currentDate].url11 = '';
					this.days[currYear][currMonth][currentDate].url22 = '';
					this.days[currYear][currMonth][currentDate].morningStoolCount = 0;
					this.days[currYear][currMonth][currentDate].morningSitCount = 0;
					this.days[currYear][currMonth][currentDate].eveningStoolCount = 0;
					this.days[currYear][currMonth][currentDate].eveningSitCount = 0;
				}
				
				//Morning
				if(this.posts[i].time.split(":")[0] <= 12)
				{

					if(this.posts[i].stool)								
					{
						this.days[currYear][currMonth][currentDate].url1= this.Url1;	
						this.days[currYear][currMonth][currentDate].morningStoolCount++;
					}							
					else if(this.posts[i].sit)
					{
					    this.days[currYear][currMonth][currentDate].url11= this.Url2;
					    this.days[currYear][currMonth][currentDate].morningSitCount++;			
					}
				}
				//Evening		
				else if(this.posts[i].time.split(":")[0] > 12)
				{
					if(this.posts[i].stool)	{
						this.days[currYear][currMonth][currentDate].url2= this.Url1;	
						this.days[currYear][currMonth][currentDate].eveningStoolCount++;
					}
					else if(this.posts[i].sit){
						this.days[currYear][currMonth][currentDate].url22=this.Url2;		
						this.days[currYear][currMonth][currentDate].eveningSitCount++;
					}
				}
		}
	}

	parseResponse(response, observer)
	{		
		this.posts = response;
		this.updateCalendar(observer);
	}


    fetchLogs() {

    	if(this.firebase.auth != null)
    	{
    		var uid = this.authState.auth.uid;
    		var ref = this.firebase.database.list('logs/'+uid);
    		this.currentMonthInNumber = new Date(Date.now()).getMonth();
			this.currentDay = this.mapNumberToDay(new Date(Date.now()).getDay());
			this.currentDayInNumber = new Date(Date.now()).getDay();
			this.currentDate = new Date(Date.now()).getDate();
			this.currentYear = new Date(Date.now()).getFullYear();
			this.currentMonth = this.mapNumberToMonth(this.currentMonthInNumber);
			return Observable.create(observer => {
				ref.subscribe(result => this.parseResponse(result, observer))
			});
    	}
    }

}