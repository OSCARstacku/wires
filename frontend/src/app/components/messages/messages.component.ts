import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { GlobalService } from '../../common/services/global.service';
import { GLOBAL } from '../../services/GLOBAL';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { Message } from '../../common/models';

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

  idUser: any;
  tokenUser: any;
  roleOfUser: any;

  token : any;
  messageArray : typeof Message = [];

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
    private _messageService: MessageService
  ){
    this.token = this._userService.getToken();
    this.getUserAndData();
    this.loadMessages();
  }

  ngOnInit(): void {
    this.socket.on('new-messages', () =>{
      this.getUserAndData();
      this.loadMessages();
    });
    this.listObserversMessagesComponent=[this.loadMessagesComponent$];
  }

  ngAfterViewInit(): void {
    this.getUserAndData();
    this.loadMessages();
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

  getUserAndData(){
    this.idUser = localStorage.getItem('_id,');
    this.tokenUser = localStorage.getItem('token');
  }

  getObservableMessage(){
    // this._globalService.messageObservable.subscribe(res=>{
    //   try {
    //     if(res.messagesOfInterface.length <= 0){
    //       this.messageArray.length = 0;
    //     }else{
    //       this.messageArray = res.messagesOfInterface.data;
    //     }
    //   } catch (error) {
    //     // console.log(error)
    //   }
    // })
  }

  loadMessages(){
    this.setPreloaderOn();
    this.loadMessagesComponent$ = this._messageService.list_messages_users(this.tokenUser).subscribe(res=>{
      this.messageArray = res.data;
      for(const Msn of res.data){
        try {
          this._globalService.messageObservableData = {
            messagesOfInterface : Msn,
          }
        } catch (error) {
          // console.log(error)
        }
        this.getObservableMessage();
        this.cdr.markForCheck();
      }
    })
    this.setPreloaderOff();
  }

  createMessageUser(dataForm:any){
    this.setPreloaderOn();
    const dataMessageUserCreated = dataForm;
    dataMessageUserCreated.idUser = this.idUser;

    this.loadMessagesComponent$ = this._messageService.create_message_user(dataMessageUserCreated,this.token).subscribe(res=>{
      this.socket.emit('socket-messages', {data:true});
      try {
        M.toast({ html: res.message });
      } catch (error) {
        // console.log(error)
      }
      this.cdr.markForCheck();
    })
    this.createMessageForm.reset();
    this.setPreloaderOff();
  }

  ngOnDestroy(): void {
    this. listObserversMessagesComponent.forEach(sub=>sub.unsubscribe());
  }

}
