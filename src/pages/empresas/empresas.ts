import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the EmpresasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
})
export class EmpresasPage {

  formGroup : FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public firebaseauth : AngularFireAuth,
    public storage : AngularFireStorage,
    public formBuilder : FormBuilder) {

      this.formGroup = this.formBuilder.group({
        cnpj : ['', [Validators.required]],
        nome : ['', [Validators.required]],
        nomeEmpresa : ['', [Validators.required]],
        descricao : ['', [Validators.required]],
        email : ['', [Validators.required]],
        endereco : ['', [Validators.required]],
        imagem : [''],
        telefone : ['', [Validators.required]],
        id : ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresasPage');
  }

  cadastrar(){
    // Cria um id único
    let id = this.firestore.createId();
    // Utiliza o id no
    this.formGroup.controls['id'].setValue(id);
    // Pega o id único do usuário
    this.formGroup.controls['usuario'].setValue(
      this.firebaseauth.auth.currentUser.uid);
    
  }

}
