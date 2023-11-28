import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  texto: string = '';

  constructor(
    private barcodescanner: BarcodeScanner,
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  async scan() {
    this.barcodescanner.scan().then(async (barcodedata) => {
      console.log('Scaneando...', barcodedata);
      this.texto = JSON.stringify(barcodedata);
  
      try {
        const jsonData = JSON.parse(barcodedata.text);
        console.log('JSON Decodificado:', jsonData);
  
        // Obtener información del usuario (puedes adaptar esta lógica según tu estructura de usuario)
        const usuario: any = this.utilsService.getFromLocalStorage('user');
  
        // Crear un objeto con la información de la asignatura y el usuario
        const asignaturaData = {
          horainicio: jsonData.horainicio,
          horatermino: jsonData.horatermino,
          nom_asignatura: jsonData.nom_asignatura,
          seccion: jsonData.seccion,
          // También puedes extraer información adicional del usuario si es necesario
          uidUsuario: usuario.uid,
          nombreUsuario: usuario.name,
        };
  
        // Registrar al usuario en la asignatura
        await this.firebaseService.addAsignaturaToUsuario(usuario.uid, asignaturaData);
        console.log('Usuario registrado en la asignatura correctamente.');
  
        // Guardar la ubicación y la hora en el LocalStorage
        this.saveLocationAndTime(asignaturaData);
  
      } catch (error) {
        console.error('Error al decodificar el JSON del código QR:', error);
      }
    }).catch((err) => {
      console.log('ERROR AL ESCANEAR!!!!', err);
    });
  }

  saveLocationAndTime(asignaturaData: any) {
    // Obtener la ubicación del dispositivo
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Obtener la hora actual del dispositivo
        const currentTime = new Date();

        // Crear un objeto con la ubicación y la hora
        const locationAndTime = {
          location,
          currentTime,
        };

        // Guardar en el LocalStorage
        this.utilsService.saveInLocalStorage('locationAndTime', locationAndTime);

        // Guardar en Firebase
        this.firebaseService.saveLocationAndTimeInFirebase(asignaturaData, locationAndTime);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }
}
