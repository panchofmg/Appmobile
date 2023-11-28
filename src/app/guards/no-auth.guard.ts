import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private firebaseSvc: FirebaseService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth) {
          this.firebaseSvc.getUserTipoUsuario(auth.uid).subscribe((tipoUsuario) => {
            if (tipoUsuario === 'alumno') {
              resolve(true); // Usuario autenticado y es un alumno, permite el acceso a la página de inicio
            } else {
              // Utiliza el servicio Router para redirigir a la página de profesor
              this.router.navigate(['/profesor']);
              resolve(false);
            }
          });
        } else {
          resolve(true); // No autenticado, permite el acceso a la página de inicio
        }
      });
    });
  }
}
