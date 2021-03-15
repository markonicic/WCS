import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patients } from '@app/@shared/interfaces/patients.model';
import { Doctors } from '@app/@shared/interfaces/doctors.model';
import { Patient } from '@app/@shared/interfaces/patient.model';

@Injectable({
  providedIn: 'root',
})
export class ListPatientsService {
  constructor(private http: HttpClient) {}

  deleteSinglePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`http://localhost:3000/patients/${id}`);
  }

  getSinglePatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`http://localhost:3000/patients/${id}`);
  }

  getPatients(): Observable<Patients[]> {
    return this.http.get<Patients[]>('http://localhost:3000/patients');
  }

  getDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>('http://localhost:3000/doctors');
  }
}
