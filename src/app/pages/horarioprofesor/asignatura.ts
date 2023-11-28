export class Asignatura {
    nombre: string;
    sala: string;
    horaInicio: string;
    horaTermino: string;
    seccion: string;
    sede: string;
    profesor?: string;
    generatedQRCode?: string;
  
    constructor(
      nombre: string,
      sala: string,
      horaInicio: string,
      horaTermino: string,
      seccion: string,
      sede: string,
      profesor?: string,

    ) {
      this.nombre = nombre;
      this.sala = sala;
      this.horaInicio = horaInicio;
      this.horaTermino = horaTermino;
      this.seccion = seccion;
      this.sede = sede;
      this.profesor = profesor;
    }
  }
  