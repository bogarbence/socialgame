import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PostComponent } from './post/post.component';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { GamePipe } from './game.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { Globals } from './globals';
const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PostComponent,
    SidemenuComponent,
    GamePipe,
    RegistrationComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
