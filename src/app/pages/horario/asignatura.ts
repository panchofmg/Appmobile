export class Asignatura {
  nombre: string;
  sala: string;
  horaInicio: string;
  horaTermino: string;
  seccion: string;
  sede: string;
  profesor: string;
  generatedQRCode?: string; // Nueva propiedad para almacenar el código QR generado

  constructor(
    nombre: string,
    sala: string,
    horaInicio: string,
    horaTermino: string,
    seccion: string,
    sede: string
  ) {
    this.nombre = nombre;
    this.sala = sala;
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.seccion = seccion;
    this.sede = sede;
  }
}
