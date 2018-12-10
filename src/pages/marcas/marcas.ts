import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the MarcasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class MarcasPage {

    cadastro : any[] = new Array();
   
  
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public firebaseauth : AngularFireAuth, 
      public storage : AngularFireStorage,) {
    }
  
    ionViewDidLoad(){
      this.getList();
    }

  getList(){
    var postRef = firebase.firestore()
    .collection("cadastro");

    postRef.get().then(query => {
      query.forEach(doc => {
        this.cadastro.push(doc.data());
      });
    });
  }

}
