import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {BristolPage} from '../bristol/bristol';
import {LoginPage} from '../login/login';
import { LocalNotifications } from 'ionic-native';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  constructor(private navController: NavController, private navParams: NavParams, public menuCtrl: MenuController) {
    //this.user = firebase.auth().currentUser;
  }

  ngOnInit(){
    if(firebase.auth().currentUser === null || firebase.auth().currentUser === undefined){
         this.navController.push(LoginPage); 
    }

   
   

    // Schedule delayed notification 

      LocalNotifications.schedule({
         title: 'Hey There!',
         text: 'Time to poop :)',
         at: new Date(new Date().getTime()+3000),
         sound: 'file://build/night_owl.mp3',
         data: { message : 'Time to poop' },
         every: 'minute'
   });
    }

     openMenu() {
   this.menuCtrl.open();
 }


  hasSit = false;
  hasStool = false;
  checked = false;
  stool = false;
  myDate: any = null;
  event = {timeStarts:''};
  stoolType = 1;
  db: any;
  sit = false;
  dose = false;
  titleText:string = "";
  auth = firebase.auth();
  user: any;

  logout(){
    this.auth.signOut().then(response => {
  // Sign-out successful.
     this.navController.push(LoginPage);  
    });
  }


  toggleSit(){
  		if (this.checked){
  			this.hasSit = true;
  		}
  		else{
  			this.hasSit = false;
  		}
  }

   toggleStool(){
      if (this.stool){
        this.hasStool = true;
      }
      else{
        this.hasStool = false;
      }
  }

  viewBristolScale(){
    this.navController.push(BristolPage);
  }

  parseResponse(response: any)
  {
      alert("Thank you!");
      this.reset();
      
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error Submitting Response:" + error.message);

  }

  submit(){
      // Get a reference to the storage service, which is used to create references in your storage bucket
  this.db = firebase.database();
  var currentDate = new Date().getTime();
  var key = this.db.ref().child('logs').push().key;
  var updates = {}
  
  updates['/logs/' + key] = {
    uid: this.auth.currentUser.uid,
    stool: this.stool,
    dose: this.dose,
    stoolType: this.stool? this.stoolType: "None",
    sit: this.sit,
    time: this.myDate == null? "":this.myDate,
    date: currentDate
  };

  this.db.ref().update(updates).then(result => this.parseResponse(result)).catch(this.handleError);
  }

  reset(){
    this.sit = false;
    this.stool = false;
    this.dose = false;
  }

  ionViewDidEnter(){
    if(this.auth.currentUser !== null){
       this.titleText = "Welcome "+ this.auth.currentUser.email.split('@')[0].toString();
  }
}

  setCurrentDateTime(){
    var date = new Date();
    this.myDate = date.getHours() +":"+ date.getMinutes();
    //alert(this.myDate);
  }
}
