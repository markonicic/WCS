import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  editSinglePatient(id: number, data: Patient): Observable<Patient> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Patient>(`http://localhost:3000/patients/${id}`, JSON.stringify(data), { headers: headers });
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
