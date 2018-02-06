import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { AdalService } from 'ng2-adal/dist/core';
import { Http } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { IndexHomeComponent } from './index/index-home/index-home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './index/login/login.component';
import { AboutUsComponent } from './index/about-us/about-us.component';
import { ContactUsComponent } from './index/contact-us/contact-us.component';
import { UploadHistoryComponent } from './admin/upload-history/upload-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanvasComponent } from './user/canvas/canvas.component';
import { LayoutsComponent } from './user/layouts/layouts.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { MessengerComponent } from './user/messenger/messenger.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { ReplyComponent } from './user/reply/reply.component';
// import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { UploadLayoutsComponent } from './admin/upload-layouts/upload-layouts.component';
import { UploadItemsComponent } from './admin/upload-items/upload-items.component';
import { ViewLayoutComponent } from './admin/view-layout/view-layout.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticateComponent } from './index/authenticate/authenticate.component';
import { AdminOrUserComponent } from './index/admin-or-user/admin-or-user.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexHomeComponent,
    AdminComponent,
    AdminDashboardComponent,
    UserComponent,
    UserDashboardComponent,
    FooterComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent,
    UploadHistoryComponent,
    CanvasComponent,
    LayoutsComponent,
    ProfileComponent,
    ViewUsersComponent,
    MessengerComponent,
    MessagesComponent,
    ReplyComponent,
    UploadLayoutsComponent,
    UploadItemsComponent,
    ViewLayoutComponent,
    HeaderComponent,
    AuthenticateComponent,
    AdminOrUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    RouterModule.forRoot([
      { path: 'id_token', redirectTo: "/authenticate", pathMatch: 'full' },
      { path: 'authenticate', component: AuthenticateComponent},
      { path: 'aou', component: AdminOrUserComponent },
      {
        path: '', component: IndexComponent,
        children: [
          { path: '', component: IndexHomeComponent },
          { path: 'login', component: LoginComponent },
          { path: 'about', component: AboutUsComponent },
          { path: 'contact', component: ContactUsComponent }
        ]
      },
      {
        path: 'admin', component: AdminComponent,
        children: [
          { path: '', component: AdminDashboardComponent },
          { path: 'messages', component: MessagesComponent },
          { path: 'layout', component: UploadLayoutsComponent },
          { path: 'item', component: UploadItemsComponent },
          { path: 'view-users', component: ViewUsersComponent },
          { path: 'view-layout', component: ViewLayoutComponent },
          { path: 'upload-history', component: UploadHistoryComponent }
        ]
      },
      { path: 'user', component: UserComponent,
    children:[
      {path: '', component: UserDashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'reply', component: ReplyComponent},
      {path: 'layouts/:category', component: LayoutsComponent},
     {path : 'canvas', component : CanvasComponent,canDeactivate:[UserComponent]},
     {path: 'canvas/:objid',component: CanvasComponent},
     {path : 'messenger', component : MessengerComponent}
    ]
    }

    ], {useHash: true})
  ],
  providers: [DataService,UserComponent,AdalService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
