import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertController } from 'ionic-angular';

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

 
  formGroup : FormGroup; // Armazena dados do formuláro
                        // necessário import ReactiveFormsModule em app.module.ts
 
  imagem : any;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: false};


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    // Uso database firestore
    public formBuilder: FormBuilder,
    public storage : AngularFireStorage,
    public firebaseauth : AngularFireAuth) { // Uso de formulários

      this.firestore.settings(this.settings);
      // inicia o formulário
      this.formGroup = this.formBuilder.group({
        cnpj : ['', [Validators.required]],
        nome : ['', [Validators.required]],
        nomeEmpresa : ['', [Validators.required]],
        descricao : ['', [Validators.required]],
        email : ['', [Validators.required]],
        endereco : ['', [Validators.required]],
        imagem : [''],
        telefone : ['', [Validators.required]],
        id : [''],
        lat : [''],
        lon : [''],
      });

  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad EmpresasPage');
  }

  solicitacao(){

    this.formGroup.controls['id'].setValue(this.firebaseauth.auth.currentUser.uid);

    this.firestore.collection("solicitacao").add(
      this.formGroup.value
      ).then(ref => {
        console.log("cadastrado com sucesso");
        console.log(ref.id);
        this.add(ref.id)
      }).catch(err => {
        console.log("err");
      })

  }
  
  enviaArquivo(event){
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
  }

  add(id : string){
   
    // Diretório + caminho imagem no servidor
    let caminho = firebase.storage().ref().child(`imagens/${id}.jpg`);
    // Executa o upload
    caminho.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      caminho.getDownloadURL().then(url=>{
        // adicionar a url da imagem no form
        //this.formGroup.controls['imagem'].setValue(this.msg = url);
        // Cadastra os dados no Firestone
        console.log("imagem enviada")
        this.firestore.collection("solicitacao")
          .doc(id).update({'imagem' : url});
      });
    }).catch(err => {
      //Houve algum erro
      console.log(err.message);
    })
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Cadastrado com sucesso',
      buttons: ['OK']
    });
    alert.present();
  }
    
  }
