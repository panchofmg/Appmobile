import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  DocumentSnapshot,
  collectionData,
  query,
  addDoc,
  collection,
  updateDoc,
  QuerySnapshot,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilSvc = inject(UtilsService);

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routerLink('/auth');
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  getUserTipoUsuario(uid: string): Observable<string> {
    const userDocRef = doc(getFirestore(), `users/${uid}`);
    return new Observable<string>((observer) => {
      getDoc(userDocRef)
        .then((docSnapshot: DocumentSnapshot<any>) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            observer.next(userData.tipoUsuario);
          } else {
            observer.next('unknown');
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addAsistencia(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'id' });
  }

  getAsistencia(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(ref, collectionQuery);
  }

  async checkAsignaturaExists(uidUsuario: string, asignaturaData: any): Promise<boolean> {
    const asignaturasCollectionRef = collection(doc(getFirestore(), 'users', uidUsuario), 'asignaturas');
    const q = query(asignaturasCollectionRef, where('nom_asignatura', '==', asignaturaData.nom_asignatura));

    try {
      const querySnapshot: QuerySnapshot<any> = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error al comprobar la existencia de la asignatura:', error);
      throw error;
    }
  }

  async saveLocationAndTimeInFirebase(asignaturaData: any, locationAndTime: any): Promise<void> {
    const path = `ubicaciones/${asignaturaData.uidUsuario}`;
  
    try {
      // Crear un documento con la información en la colección 'ubicaciones'
      await this.setDocument(path, locationAndTime);
      console.log('Ubicación y hora guardadas en Firebase correctamente.');
    } catch (error) {
      console.error('Error al guardar ubicación y hora en Firebase:', error);
    }
  }
  

  async addAsignaturaToUsuario(uidUsuario: string, asignaturaData: any): Promise<void> {
    const usuarioDocRef = doc(getFirestore(), 'users', uidUsuario);
    const asignaturasCollectionRef = collection(usuarioDocRef, 'asignaturas');

    const asignaturaExists = await this.checkAsignaturaExists(uidUsuario, asignaturaData);

    if (!asignaturaExists) {
      try {
        const asignaturaDocRef = await addDoc(asignaturasCollectionRef, asignaturaData);
        console.log('Asignatura agregada al usuario con ID:', asignaturaDocRef.id);
      } catch (error) {
        console.error('Error al agregar asignatura al usuario:', error);
        throw error;
      }
    } else {
      console.log('La asignatura ya está registrada para este usuario.');
    }
  }
}
