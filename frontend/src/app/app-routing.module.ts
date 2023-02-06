import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './components/sign/sign.component';

const routes: Routes = [
  {path:'sign-in/up',component:SignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
