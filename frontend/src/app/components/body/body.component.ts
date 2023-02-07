import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from '../../common/services/global.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit, AfterViewInit {

  token: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private _globalService: GlobalService,
  ){

  }

  ngOnInit(): void {}

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

}
