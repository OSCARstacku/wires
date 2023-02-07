import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

import { MessagesComponent } from './components/messages/messages.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignComponent } from './components/sign/sign.component';

const routes: Routes = [
  {path:'signInUp',component:SignComponent},
  {path:'messages',component:MessagesComponent,canActivate:[UserGuard]},
  {path:'',redirectTo:'/messages',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
