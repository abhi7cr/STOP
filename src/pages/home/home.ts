import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {BristolPage} from '../bristol/bristol';
import {LoginPage} from '../login/login';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';

//declare var firebase: any;

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

 private authState;
 private auth;
  constructor(private navController: NavController, 
    private navParams: NavParams,
     public menuCtrl: MenuController,
     private auth$: AngularFireAuth,
     public db: AngularFireDatabase) {
    //this.user = firebase.auth().currentUser;
      this.authState = auth$.authState;
      this.authState.subscribe((state) => {
       this.auth = state;
       if(this.auth === undefined || this.auth === null){
           this.navController.setRoot(LoginPage); 
      }
  })
    }


  ngOnInit() {
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
  sit = false;
  dose = false;
  titleText:string = "";
  user: any;

  logout(){
  
    this.auth$.auth.signOut().then((response) => {
          //this.navController.setRoot(LoginPage);
            //this.auth$.unsubscribe();
    });
  }


  toggleSit(){
  		if (this.sit){
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
  var currentDate = new Date().getTime();
  var ref = this.db.list('/logs/'+this.auth.uid);
  ref.push({
    name: this.auth.email.split('@')[0].toString(),
    uid: this.auth.uid,
    stool: !!this.stool,
    dose: this.dose,
    stoolType: this.stool? this.stoolType: "None",
    sit: !!this.sit,
    time: this.myDate == null? "":this.myDate,
    date: currentDate
  })
  .then(result => this.parseResponse(result))
  .catch(this.handleError);
  }

  reset(){
    this.sit = false;
    this.stool = false;
    this.dose = false;
  }

  ionViewDidEnter(){
    if(this.auth !== null){
       this.titleText = "Welcome "+ this.auth.email.split('@')[0].toString();
    }
  }

  setCurrentDateTime(){
    var date = new Date();
    let _myDate = date.getHours() +":"+ date.getMinutes();
    this.myDate = _myDate;
  }
}
