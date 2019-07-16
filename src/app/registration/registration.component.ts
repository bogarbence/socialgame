import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Globals } from '../globals';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private username: string;
  constructor(db: AngularFireDatabase, private globals: Globals) {
    this.username = globals.username;
    console.log(this.username);
   }
currentUser = new User();
  ngOnInit() {
  }

  registration() {
    firebase.database().ref('/users').push(this.currentUser);
    this.username = 'Klotor';
    this.globals.username = this.username;
  }

}
