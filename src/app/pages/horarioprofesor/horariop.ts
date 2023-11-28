// horario.model.ts
import { Asignatura } from './asignatura'; // Asegúrate de tener la ruta correcta

export const Horario: { [key: string]: Asignatura[] } = {
  'L': [
    new Asignatura('Calidad de Software', 'Sala 2', '10:00', '12:00', 'CSY4111-002D', 'Santiago', 'ALEJANDRO SEBASTIAN SEPULVEDA MONTERO'),
  ],
  'M': [
    // Asignaturas para el Martes
  ],
  'X': [
    new Asignatura('Calidad de Software', 'Sala 2', '10:00', '12:00', 'CSY4111-002D', 'Santiago', 'ALEJANDRO SEBASTIAN SEPULVEDA MONTERO'),
  ],
  'J': [
    // Asignaturas para el Jueves
  ],
  'V': [
    new Asignatura('Calidad de Software', 'Sala 2', '10:00', '12:00', 'CSY4111-002D', 'Santiago', 'ALEJANDRO SEBASTIAN SEPULVEDA MONTERO'),
  ],
  'S': [
    // Asignaturas para el Sábado
  ],
};
