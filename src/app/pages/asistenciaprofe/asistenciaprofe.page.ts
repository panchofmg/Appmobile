import { Component } from '@angular/core';
import { Horario } from './horario';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-asistenciaprofe',
  templateUrl: './asistenciaprofe.page.html',
  styleUrls: ['./asistenciaprofe.page.scss'],
})
export class AsistenciaprofePage {
  usuariosAlumnos: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Llama a la función para obtener usuarios alumnos al inicializar el componente
    this.getUsuariosAlumnos();
  }

  async getUsuariosAlumnos() {
    try {
      // Obtiene la lista de usuarios alumnos desde Firebase
      this.usuariosAlumnos = await this.firebaseService.getUsuariosAlumnos();
    } catch (error) {
      console.error('Error al obtener usuarios alumnos desde el servicio:', error);
    }
  }
}