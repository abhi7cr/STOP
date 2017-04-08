import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {BristolPage} from '../bristol/bristol';
import {LoginPage} from '../login/login';
import { LocalNotifications } from 'ionic-native';
import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';

//declare var firebase: any;

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

 private authState: FirebaseAuthState;

  constructor(private navController: NavController, 
    private navParams: NavParams,
     public menuCtrl: MenuController,
     private firebase: AngularFire,
     private auth$: AngularFireAuth) {
    //this.user = firebase.auth().currentUser;
      this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
   
    if(this.authState === undefined || this.authState === null){
           this.navController.setRoot(LoginPage); 
    }
    });
  }

  ngOnInit(){
   
   

    // Schedule delayed notification 

   //    LocalNotifications.schedule({
   //       title: 'Hey There!',
   //       text: 'Time to poop :)',
   //       at: new Date(new Date().getTime()+3000),
   //       sound: 'file://night_owl.mp3',
   //       data: { message : 'Time to poop' }
   //       //every: 'minute'
   // });
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
  auth = this.firebase.auth;
  user: any;

  logout(){
  
    this.firebase.auth.logout().then((response) => {
          //this.navController.setRoot(LoginPage);
            //this.auth$.unsubscribe();
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
  this.db = this.firebase.database;
  var currentDate = new Date().getTime();
  var ref = this.db.list('/logs/'+this.authState.uid);
  ref.push({
    name: this.authState.auth.email.split('@')[0].toString(),
    uid: this.authState.uid,
    stool: this.stool,
    dose: this.dose,
    stoolType: this.stool? this.stoolType: "None",
    sit: this.sit,
    time: this.myDate == null? "":this.myDate,
    date: currentDate
  }).then(result => this.parseResponse(result)).catch(this.handleError);
  }

  reset(){
    this.sit = false;
    this.stool = false;
    this.dose = false;
  }

  ionViewDidEnter(){
    if(this.authState !== null && this.authState.auth !== null){
       this.titleText = "Welcome "+ this.authState.auth.email.split('@')[0].toString();
  }
}

  setCurrentDateTime(){
    var date = new Date();
    let _myDate = date.getHours() +":"+ date.getMinutes();
    this.myDate = _myDate;
    //alert(this.myDate);
  }
}
