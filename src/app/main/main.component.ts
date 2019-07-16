import { Component, OnInit } from '@angular/core';
import {Post} from '../post/post';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AppData } from '../AppData';
import { User } from '../registration/user';
import { Globals } from '../globals';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  posts: any[];
  base64textString = [];
  newP = new Post();
  currentUser: User;
  filterargs = '';
  post = new AppData('', '', new Date(), 'League of Legends', '');
  constructor(db: AngularFireDatabase, private globals: Globals) {
    db.list('/posts').valueChanges().pipe(
      map(xarr => {
        xarr.forEach(element => {
          element["date"] = (element["date"]).replace('T', ' ').replace('Z', '').substring(0, 21);
        });
        return xarr;
      })
    ).subscribe(postok => {
      this.posts = postok.sort((a,b) => (Date.parse(b["date"]))-(Date.parse(a["date"].toString())) );
    });
  }

  ngOnInit() {
  }
  changefilter(fil: string){
    this.filterargs = fil;
  }
  fbPostData() {
    this.newP.content = this.post.content;
    this.newP.poster = this.post.poster;
    /*this.newP.date = (new Date()).toISOString().replace('T', ' ').replace('Z', '').substring(0, 19); */
    this.newP.date = (new Date()).toLocaleString();
    this.newP.game = this.post.game;
    this.newP.image = this.base64textString[0];
    firebase.database().ref('/posts').push(this.newP);
    document.getElementById('photolb').innerHTML = 'Add Photo';
    this.resetData();
  }
  resetData() {
      this.newP = new Post();
      this.base64textString.length = 0;
      this.post.content = '';

  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      document.getElementById('photolb').innerHTML = 'Change Photo';
    }
  }
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }
}
