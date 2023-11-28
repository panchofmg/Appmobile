import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode'; // Importa la biblioteca qrcode

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  qrData: string;
  generatedQRCode: string;

  constructor() {
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
    QRCode.toDataURL(this.qrData, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.generatedQRCode = url;
    });
  }
}