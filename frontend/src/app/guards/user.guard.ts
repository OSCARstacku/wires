import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private _userService:UserService,
    private _router:Router,
  ){

  }
  canActivate():any{
    //Si el método isAuth... es falso retorna al inicio de sesión
    if(!this._userService.isAuthenticated(['appUserAvailable'])){
      this._router.navigate(['/signInUp']);
      return false;
    }else{
      //Si isAuth... es verdadero da acceso a la ruta
      return true;
    }
  }
}
