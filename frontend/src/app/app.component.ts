import { Component, OnDestroy } from '@angular/core';
import { GlobalService } from './common/services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'frontend';

  preloader:boolean = false;
  hidden:boolean = false

  //Suscriptions
  loadAppComponent$:any;

  listObserversAppComponent:Array<Subscription>=[];

  constructor(
    private _globalService: GlobalService
  ){
    this.getPreloader();
    this.getLoadData();

    this.listObserversAppComponent=[this.loadAppComponent$];

  }

  getPreloader() {
    //Preloader
    this._globalService.preloaderObservable.subscribe(res=>{
      this.preloader = res.on;
    })
  }

  getLoadData() {
    this.loadAppComponent$ = this._globalService.globalObservable.subscribe(res=>{
      try {
        if (res.hidden == false) {
          this.hidden = true;
        } else if ( res.hidden == true ) {
          this.hidden = false;
        }
      } catch (error) {
        //console.log (error)
      }
    });
  }

  ngOnDestroy(): void {
    this.listObserversAppComponent.forEach(sub=>sub.unsubscribe());
  }
}
