import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '@app/@shared/interfaces/patient.model';
import { Patients } from '@app/@shared/interfaces/patients.model';
import { Doctors } from '@app/@shared/interfaces/doctors.model';

@Injectable({
  providedIn: 'root',
})
export class AddPatientService {
  public singlePatient: any;

  constructor(private http: HttpClient) {}

  savePatient(data: any): Observable<Patient> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Patient>('http://localhost:3000/patient', JSON.stringify(data), { headers: headers });
  }

  getPatients(): Observable<Patients[]> {
    return this.http.get<Patients[]>('http://localhost:3000/patients');
  }

  getDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>('http://localhost:3000/doctors');
  }
}
