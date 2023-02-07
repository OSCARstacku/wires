import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GLOBAL} from './GLOBAL';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    url:any;

    constructor(
        private _http:HttpClient,
    ) {
        this.url = GLOBAL.url;
    }

    //GET
    list_messages_users(token:any):Observable<any>{
        let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token});
        return this._http.get(this.url+'list_messages_users/',{headers:headers});
    }

    //POST - CREATE
    create_message_user(data:any,token:any):Observable<any>{
        let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token});
        return this._http.post(this.url+'create_message_user',data,{headers:headers});
    }
}