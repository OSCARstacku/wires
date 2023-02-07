import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignComponent } from './components/sign/sign.component';

const routes: Routes = [
  {path:'sign-in-up',component:SignComponent},
  {path:'',redirectTo:'/sign-in-up',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
