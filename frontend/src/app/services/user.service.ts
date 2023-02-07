import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GLOBAL} from './GLOBAL';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:any;

  constructor(
    private _http:HttpClient
  ) {
    this.url=GLOBAL.url;
  }

  //GET
  get_user(id:any,token:any):Observable<any>{
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'get_admin/'+id,{headers:headers});
  }

  //POST
  create_user(data:any):Observable<any>{
    let headers=new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'create_user',data,{headers:headers})
  }

  //POST
  start_user_session(data:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'start_user_session',data,{headers:headers})
  }

  //GET
  getToken(){
    return localStorage.getItem('token');
  }

  //Validar token
  public isAuthenticated(allowRoles:string[]):boolean{
    //Obtener token
    const token=localStorage.getItem('token');
    //Si no hay un token en localStorage del Navegador retorna falso
    if(!token){
      return false;
    }
    try {
      const helper=new JwtHelperService();
      var decodedToken=helper.decodeToken(token);

      if(!decodedToken){
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
    return allowRoles.includes(decodedToken['role']);
  }
}
