import {Component, Input} from '@angular/core';
import {ITimer} from './itimer';


@Component({
    templateUrl: 'timers.html'
})
export class TimerPage 
{
	defaultTimeInSeconds: Number = 300;
}