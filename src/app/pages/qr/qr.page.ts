import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode'; // Importa la biblioteca qrcode
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  qrData: string;
  generatedQRCode: string;

  constructor(private firebaseService: FirebaseService, private utilsService: UtilsService) {
    // Define las propiedades del JSON
    const jsonData = {
      horainicio: '10:41',
      horatermino: '11:20',
      nom_asignatura: 'Calidad de Software',
      seccion: 'CSY4111-003D',
    };

    // Convierte el objeto JSON a una cadena
    this.qrData = JSON.stringify(jsonData);

    // Llama a la función para generar el código QR
    this.generateQRCode();
  }

  ngOnInit() {}

  // Función para generar el código QR
  generateQRCode() {
    QRCode.toDataURL(this.qrData, async (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.generatedQRCode = url;

      // Obtén el UID del usuario desde el localStorage
      const uidUsuario = this.utilsService.getFromLocalStorage('user')?.uid;

      if (uidUsuario) {
        // Guarda la asignatura y vincula al profesor en Firestore
        await this.firebaseService.addAsignaturaToUsuario(uidUsuario, JSON.parse(this.qrData));
      } else {
        console.error('No se pudo obtener el UID del usuario desde el localStorage.');
      }
    });
  }
}