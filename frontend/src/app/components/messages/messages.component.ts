import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { GlobalService } from '../../common/services/global.service';
import { GLOBAL } from '../../services/GLOBAL';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare let M:any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {

  public socket = io(GLOBAL.urlSocketIo);

  loadMessagesComponent$ : any;

  listObserversMessagesComponent:Array<Subscription>=[];

  token : any;

  createMessageForm = this.fb.group({
    title_message_user: ['', Validators.required],
    body_message_user: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _globalService: GlobalService,
    private _router: Router,
    private _userService: UserService,
  ){
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.socket.on('new-messages', () =>{
      // this.getUserAndData();
      // this.loadCustomers();
    });
    this.listObserversMessagesComponent=[this.loadMessagesComponent$];
  }

  ngAfterViewInit(): void {
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

  createMessageUser(dataForm:any){
    // this.setPreloaderOn();
    const dataMessageUserCreated = dataForm;
    console.log(dataMessageUserCreated)

    this.loadMessagesComponent$ = this


  }

  ngOnDestroy(): void {
      
  }

}
