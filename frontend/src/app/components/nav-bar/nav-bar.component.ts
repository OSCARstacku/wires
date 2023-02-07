import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { GlobalService } from 'src/app/common/services/global.service';

import { Idioms } from './nav-bar.model';
import { Router } from '@angular/router';

declare let M:any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  //Suscriptions
  loadHeadComponent$ : any;

  listObserversHeadComponent:Array<Subscription>=[];
  hidden : boolean = false;
  idioms : any = [] = Idioms;
  selectedLanguage : any = [];

  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _globalService: GlobalService,
    private _router: Router,
  ){
    this.getObservableLanguage();
    translate.setDefaultLang('es');
    translate.use(this.selectedLanguage.prefix);
  }

  ngOnInit(): void {
    this.idioms;
    this.getObservableLanguage();
    this.listObserversHeadComponent=[this.loadHeadComponent$];
  }

  ngAfterViewInit(): void {
    this.idioms;
    this.getObservableLanguage();
    this.cdr.detectChanges();
  }

  setPreloaderOn () {
    this._globalService.preloaderObservableData = {
      on: true,
    }
  }

  setPreloaderOff () {
    this._globalService.preloaderObservableData = {
      on: false,
    }
  }

  getObservableLanguage () {
    this._globalService.languageObservable.subscribe(res=>{
      try {
        if (res.Idiom.length == 0 && res.prefix.length == 0 && res.flag.length == 0){
          this.selectedLanguage.Idiom = this.idioms[0].Idiom;
          this.selectedLanguage.prefix = this.idioms[0].prefix;
          this.selectedLanguage.flag = this.idioms[0].flag;
        }else {
          this.selectedLanguage.Idiom = res.Idiom;
          this.selectedLanguage.prefix = res.prefix;
          this.selectedLanguage.flag = res.flag;
        }
        return this.selectedLanguage
      } catch (error) {
        // console.log(error)
      }
      this.cdr.markForCheck();
    })

    this._globalService.languageObservableData = {
      Idiom : this.selectedLanguage.Idiom,
      prefix : this.selectedLanguage.prefix,
      flag : this.selectedLanguage.flag
    }
  }



  useLanguage(language: any): void {
    this.translate.use(language);

    try {
      for (let i of this.idioms) {
        if(language == i.prefix){
          let newSelectedLanguage = i;

          // Site Language
          this._globalService.languageObservableData = {
            Idiom : newSelectedLanguage.Idiom,
            prefix : newSelectedLanguage.prefix,
            flag : newSelectedLanguage.flag
          }
        }else {
          //
        }
      }
      this.getObservableLanguage();
    } catch (error) {
      // console.log(error)
    }
  }

  logOut(){
    this.setPreloaderOn();
    window.location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('_id,');
    // localStorage.removeItem('identity');
    // localStorage.removeItem('userOfCompany');
    // localStorage.removeItem('roleUser');
    this._router.navigate(['/']);
    window.location.reload();
    this.setPreloaderOff();
  }

  ngOnDestroy(): void {
    this.listObserversHeadComponent.forEach(sub=>sub.unsubscribe());
  }

}
