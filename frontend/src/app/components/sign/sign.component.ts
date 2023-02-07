import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
// import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from '../../common/services/global.service';
import { Idioms } from '../nav-bar/nav-bar.model';



declare let M:any;
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SignComponent implements OnInit, AfterViewInit  {

  token : any = '';

  countClicks : number = 0;

  showPassword : boolean = false;
  showPassValue : boolean = false;

  idioms : any = [] = Idioms;
  selectedLanguage : any = [];

  signInForm = this.fb.group({
    email_login: ['',Validators.required],
    password_login: ['',Validators.required],
  })

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private translate: TranslateService,
    private _globalService: GlobalService,
    // private _adminService: AdminService,
  ){
    _globalService.globalObservableData = { hidden:true };

    this.getObservableLanguage();
    // this.token = this._adminService.getToken();
    translate.setDefaultLang('es');
    translate.use(this.selectedLanguage.prefix);
  }

  ngOnInit(): void {
    this.idioms;
    this.getObservableLanguage();
    this.signIn();
  }

  ngAfterViewInit(): void {
    this.idioms;
    this.getObservableLanguage();
    this.signIn();
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

  signIn(){
    let elemsTabsSignInUp = document.querySelector('#signInUp')
    let instancesTabsSignInUp = M.Tabs.init(elemsTabsSignInUp)
  }

  showPasswordLogin(event: Event){
    try {
      if(((<HTMLInputElement>event.target).checked == false) || ((<HTMLInputElement>event.target).checked == null )){
        this.showPassword = false;
      }else if ((<HTMLInputElement>event.target).checked == true) {
        this.showPassword = true;
      }
    } catch (error) {
      //
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


  startUserSession(){
    this.setPreloaderOn();
    this.countClicks += 1;
    if(this.countClicks < 4){
      if(this.signInForm.valid){
        let dataLogin = this.signInForm.value;

        // this._adminService.start_user_session(dataLogin).subscribe(
        //   res=>{
        //     if(res.data == undefined){
        //       M.toast({ html: res.message });
        //     }else{
        //       this.dialog.closeAll();
        //       this.authenticatedUser = res.data,
        //       localStorage.setItem('token',res.token);
        //       localStorage.setItem('_id,',res.data._id);
        //       localStorage.setItem('userOfCompany','true');
        //       this._router.navigate(['/']);
        //       this._userService.get_user_admin(res.data._id,this.token).subscribe(res=>{
        //         this.currentUser = res.data._id;
        //         this.tokenXCompany = res.token;
        //       },
        //       err=>{
        //         this.currentUser = res.data._id;
        //         this.tokenXCompany = res.token;
        //         this._companyService.list_admin_companies(res.token).subscribe(res=>{
        //           for (const i of res.data){
        //             for(const j of i.offices_company){
        //               for(const k of j.users_office){
        //                 if(`${k._id}` == this.currentUser){
        //                   this.arrayCurrentUser = k;
        //                   this._companyService.list_admin_companies(this.tokenXCompany).subscribe(resx=>{
        //                     for (const l of resx.data){
        //                       if (`${l._id}` == this.arrayCurrentUser.id_company_user){
        //                         this._globalService.currentCompanyObservableData = {
        //                           currentCompany: l,
        //                         },
        //                         this._globalService.currentUserObservableData = {
        //                           currentUser: true,
        //                           roleUser: "general",
        //                         }
        //                       }
        //                     }
        //                   })
        //                 }
        //               }
        //             }
        //           }
        //         })
        //       })
        //     }
        //   }
        // )
      }
    }else{
      this.countClicks = 0;
      this.signInForm.reset();
    }
    this.setPreloaderOff();
  }


}


