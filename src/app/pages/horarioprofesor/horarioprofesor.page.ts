// horarioprofesor.page.ts
import { Component } from '@angular/core';
import * as QRCode from 'qrcode';
import { Router } from '@angular/router';
import { Asignatura } from './asignatura';
import { Horario } from '../horarioprofesor/horariop';

@Component({
  selector: 'app-horarioprofesor',
  templateUrl: './horarioprofesor.page.html',
  styleUrls: ['./horarioprofesor.page.scss'],
})
export class HorarioprofesorPage {
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
  diaSeleccionado: string = '';
  asignaturasPorDia: (Asignatura & { generatedQRCode?: string })[] = []; // Añadir tipo específico

  constructor(private router: Router) {}

  mostrarAsignaturas(dia: string) {
    this.diaSeleccionado = dia;
    // Accede a las asignaturas correspondientes al día seleccionado desde la estructura de datos Horario.
    this.asignaturasPorDia = Horario[dia] || [];
  }

  navegarAAsignaturaProfesor(asignatura: Asignatura) {
    // Llama a la función para generar el código QR con la asignatura seleccionada
    this.generateQRCodeForSubject(asignatura);
    // Cuando se hace clic en una asignatura, navega a la vista "asignaturaprofesor"
    this.router.navigateByUrl('/asignaturaprofesor');
  }

  generateQRCodeForSubject(asignatura: Asignatura) {
    const jsonData = {
      horainicio: asignatura.horaInicio,
      horatermino: asignatura.horaTermino,
      nom_asignatura: asignatura.nombre,
      seccion: asignatura.seccion,
    };

    const qrData = JSON.stringify(jsonData);

    QRCode.toDataURL(qrData, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      // Asigna el resultado a la propiedad para mostrar el código QR en tu HTML
      asignatura.generatedQRCode = url;
    });
  }
}
