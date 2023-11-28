import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx'
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { asignatura } from 'src/app/models/asignaturas.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  texto:string=''
  constructor(private barcodescanner:BarcodeScanner) {}
  
  scan(){
    this.barcodescanner.scan().then(barcodedata=>{
      console.log("Scaneando...", barcodedata);
      this.texto=(JSON.stringify(barcodedata));
    }).catch(err=>{
      console.log("ERROR AL ESCANEAR!!!!");
    })

  }
}
