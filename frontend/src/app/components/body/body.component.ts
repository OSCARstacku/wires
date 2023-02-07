import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GlobalService } from '../../common/services/global.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit, AfterViewInit {

  token: any;
  //Suscriptions
  loadBodyComponent$:any;

  listObserversBodyComponent:Array<Subscription>=[];

  constructor(
    private cdr: ChangeDetectorRef,
    private _globalService: GlobalService,
    private _userService: UserService
  ){
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.listObserversBodyComponent=[this.loadBodyComponent$];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getBodyClass(): string {
    let styleClass = '';

    this._globalService.globalObservable.subscribe(res=>{
      try {
        if ( res.hidden == true ) {
          styleClass = 'reset';
        }
      } catch (error) {
        //console.log (error)
      }
      this.cdr.markForCheck();
    });

    return styleClass;
  }

  ngOnDestroy(): void {
    this.listObserversBodyComponent.forEach(sub=>sub.unsubscribe());
  }

}
