import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {mealtimePage} from './pages/mealtime/mealtime';
import {remindersPage} from './pages/reminders/reminders';
import {TimerComponent} from './pages/timers/timers';
import {aboutPage} from './pages/about/about';
import {helpPage} from './pages/help/help';
import {HomePage} from './pages/home/home';
import { settingEmojiPage } from './pages/settingEmoji/settingEmoji';


@Component({
  //template: '<ion-nav [root]="rootPage"></ion-nav>'
  templateUrl: "../app.html"
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  private rootPage:any;

    // set our app's pages
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, public menu: MenuController) {

    this.rootPage = TabsPage;


   this.pages= [
      { title: 'Home', component: TabsPage },
      { title: 'Set mealtime', component: mealtimePage },
      { title: 'Set reminders', component: remindersPage },
      { title: 'Set timers', component: TimerComponent },
      { title: 'Set emojis', component: settingEmojiPage }, 
      { title: 'About app', component: aboutPage },  
      { title: 'Help', component: helpPage } 
  ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hideSplashScreen();
      StatusBar.styleDefault();
    });

  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
      Splashscreen.hide();
      }, 100);
    }
  }

  openPage(pages) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario

    this.menu.close();
    this.nav.setRoot(pages.component);


  }

}

ionicBootstrap(MyApp)


