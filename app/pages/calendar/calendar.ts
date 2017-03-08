import {Component, OnInit} from '@angular/core';
import {NavController, Nav, App} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {thisDayPage} from '../thisDay/thisDay';
// import {Schedule} from 'primeng/primeng';
import * as moment from 'moment';

declare var firebase: any;


@Component({
  templateUrl: 'build/pages/calendar/calendar.html'
})

export class CalendarPage implements OnInit{

  constructor(public navController: NavController, private app: App) {
  	this.navController = navController;
  }

  ngOnInit(){
  	 if(firebase.auth().currentUser === null || firebase.auth().currentUser === undefined){
         this.navController.push(LoginPage); 
    }
  }
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
	displayCurrentMonth: any[] = [];
	daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	offset = 0;
	db:any;
    ref:any
    auth = firebase.auth();

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
 											   url: "",
 											   color: 'gray',
 											   bgColor: 'white'});
 				}
			}
		}
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

	goToPreviousMonth()
	{
		if(this.currentMonthInNumber-1 < 0){
			this.currentMonth = "December";
			this.currentYear -= 1;
			this.currentMonthInNumber = 11;
		}
		else
		{
			this.currentMonth  = this.mapNumberToMonth(this.currentMonthInNumber-1);
			this.currentMonthInNumber -= 1;
		}

		this.updateCalendar();
	}

	goToNextMonth()
	{
		if(this.currentMonthInNumber+1> 11){
			this.currentMonth = "January";
			this.currentYear += 1;
			this.currentMonthInNumber = 0;
		}
		else
		{
			this.currentMonth  = this.mapNumberToMonth(this.currentMonthInNumber+1);
			this.currentMonthInNumber += 1;
		}
		this.updateCalendar();
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

	clear()
	{
		var month = this.currentMonthInNumber;
		for(var i=1; i <= this.days[month].length; i++)
		{
			this.days[month][i] = {}; 
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
			if(curYear != null && 
				curYear[currentMonth] != null && 
				curYear[currentMonth][l] != null){
				this.displayCurrentMonth.push({
												url:curYear[currentMonth][l].url,
												day:l,
												color: 'black',
											    bgColor: bgColor});
			}
			else{
					this.displayCurrentMonth.push({day: l, url: "", color: 'black', bgColor: bgColor});
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
				var url = "";
				var curYear = this.days[curYearId];
				if(curYear != null && curYear[curMonthId] != null && 
							curYear[curMonthId][i] != null){
					url = curYear[curMonthId][i].url;
				}

				if(url !== null)
					//alert(url);

				this.displayCurrentMonth.push({
												day: this.mapNumberToDisplayMonth(curMonthId) + " " + i, 
												url: url,
												color: 'gray',
												bgColor: 'white'
												});
				i++;
			}
		}
		var monthName: string = this.mapNumberToDisplayMonth(this.currentMonthInNumber);
		if(this.today.indexOf(this.currentYear.toString()) != -1 &&
			this.today.indexOf(monthName) != -1){
			this.displayCurrentMonth[this.currentDate+this.offset-1].bgColor = '#f17b63';
		}
				
	}

	updateCalendar()
	{
		this.displayCurrentMonth = [];
		this.updateInfo();
		this.processPosts();
		this.assignDaysOfPrevMonth();
		this.initializeCalendar();
	}

	updateInfo() {
      var url1;
      var url2;
      this.db = firebase.database();
      this.ref = this.db.ref('/emojiSetting/'+this.auth.currentUser.email.split('@')[0].toString());
      this.ref.on('value', function(snapshot){
        url1 = snapshot.child('url1').val();
        url2 = snapshot.child('url2').val();

      });
      this.Url1 = url1;
      //console.log(this.myMealtime1);
      this.Url2 = url2;

    }


	processPosts()
	{	
		var currentUser = firebase.auth().currentUser;	
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
				if(this.days[currYear] == null){
					this.days[currYear] = [];
				}
				if(this.days[currYear][currMonth] == null){
					this.days[currYear][currMonth] = [];
				}
				if(this.posts[i].stool)
				{
					this.days[currYear][currMonth][currentDate] = {};
					this.days[currYear][currMonth][currentDate].url= this.Url1;
				}		
				else if(this.posts[i].sit)
				{
					this.days[currYear][currMonth][currentDate] = {};
					this.days[currYear][currMonth][currentDate].url=this.Url2;
				}
			// }
		}
	}

	parseResponse(response)
	{		
		this.posts = response.val();
		this.updateCalendar();

	}

	ionViewWillEnter(){
			this.fetchLogs();
	}

    fetchLogs() {

    	if(firebase.auth().currentUser != null)
    	{
    		var user = firebase.auth().currentUser;
    		var ref = firebase.database().ref('logs').orderByChild('uid').equalTo(user.uid);
			ref.once("value").then(result => this.parseResponse(result));
    	}
    }

    goToMethod() {
    	//this.navController.push(thisDayPage);
    	this.app.getRootNav().setRoot(thisDayPage);
    }

}
