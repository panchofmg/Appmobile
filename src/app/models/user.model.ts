export interface User {
  uid: string;
  email: string;
  password: string;
  name: string;
  tipoUsuario: string;
  asignaturas?: string[]; // Array de IDs de asignaturas en las que el usuario está registrado
  escaneos?: {
    ubicacion: string;
    hora: string;
    nombreAsignatura: string;
    asignaturaId: string;
  }[];
}
