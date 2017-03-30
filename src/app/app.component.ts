import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {mealtimePage} from '../pages/mealtime/mealtime';
import {remindersPage} from '../pages/reminders/reminders';
import {TimerPage} from '../pages/timers/timer';
import {aboutPage} from '../pages/about/about';
import {helpPage} from '../pages/help/help';
import {HomePage} from '../pages/home/home';
import { settingEmojiPage } from '../pages/settingEmoji/settingEmoji';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.rootPage = TabsPage;


   this.pages= [
      { title: 'Home', component: TabsPage },
      { title: 'Set mealtime', component: mealtimePage },
      { title: 'Set reminders', component: remindersPage },
      { title: 'Set timers', component: TimerPage },
      { title: 'Set emojis', component: settingEmojiPage }, 
      { title: 'About app', component: aboutPage },  
      { title: 'Help', component: helpPage } 
  ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
