import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {currentMealtimePage} from './pages/currentMealtime/currentMealtime';

@Component({
  selector: 'page-mealtime',
  templateUrl: 'build/pages/mealtime/mealtime.html'
})
export class mealtimePage {

  constructor(public navCtrl: NavController) {
  }

  change = false;
  edited = false;
  save = false;

  myMealtime1: any = null;
  myMealtime2: any = null;
  
  goTo(){
  	this.navCtrl.push(currentMealtimePage);
  }

  setChange(){
  		if (this.edited){
  			this.change = true;
  		}
  		else{
  			this.change = false;
  		}
  }


  displayChosenTime1(){
    var date = new Date();
    this.myMealtime1 = date.getHours() +":"+ date.getMinutes();
    //alert(this.myDate);
  }

  displayChosenTime2(){
    var date = new Date();
    this.myMealtime2 = date.getHours() +":"+ date.getMinutes();
    
  }

  saved(){
           var date1 = new Date();
           this.myMealtime1 = date1.getHours() +":"+ date1.getMinutes();
           var date2 = new Date();
           this.myMealtime2 = date2.getHours() +":"+ date2.getMinutes();

  }
}