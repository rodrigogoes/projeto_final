import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalPage } from '../local/local';
import { EmpresasPage } from '../empresas/empresas';
import { SobrePage } from '../sobre/sobre';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

transf(map){
  this.navCtrl.push('LocalPage',{
    'mapa': map
  })}

  transf1(emp){
    this.navCtrl.push('EmpresasPage',{
      'empresa': emp
    })
}
transf2(sobre){
  this.navCtrl.push('SobrePage',{
    'sobrenos': sobre
  })
}

transf3(marca){
  this.navCtrl.push('MarcasPage',{
    'marcas': marca
  })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

}
