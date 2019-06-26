// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { UserService } from './services/user.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'signup', component: UsersComponent,
        children: [{ path: '', component: SignUpComponent }]
      },
      {
        path: 'login', component: UsersComponent,
        children: [{ path: '', component: SignInComponent }]
      },
      {
        path: 'profile',component: UserProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: '', redirectTo: '/login', pathMatch: 'full'
      }
    ])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
