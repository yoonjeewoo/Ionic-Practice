import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  ranks: Array<object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage, private http: Http) {

    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'text/plain');
      headers.append('x-access-token', val);
      // console.log(val);

      this.http.get('/rank', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          for(var i=0;i<data.posts.length;i++) {
            this.ranks[i] = data.posts[i];
          }
        });
    });




  }
}
