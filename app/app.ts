import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {mealtimePage} from './pages/mealtime/mealtime';
import {remindersPage} from './pages/reminders/reminders';
import {timersPage} from './pages/timers/timers';
import {aboutPage} from './pages/about/about';
import {helpPage} from './pages/help/help';


@Component({
  //template: '<ion-nav [root]="rootPage"></ion-nav>'
  templateUrl: 'index.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  private rootPage:any;
  pages: Array<{title: string, component: any}>;

  constructor(private platform:Platform, public menu: MenuController) {
    this.rootPage = TabsPage;

    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Set mealtime', component: mealtimePage },
      { title: 'Set reminders', component: remindersPage },
      { title: 'Set timers', component: timersPage }, 
      { title: 'About app', component: aboutPage },  
      { title: 'Help', component: helpPage },       
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp)


