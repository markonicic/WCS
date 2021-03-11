import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import patients from '../@shared/databases/patients.json';
import doctors from '../@shared/databases/doctors.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPatientService {
  public singlePatient: any;

  constructor(private http: HttpClient) {}

  savePatient(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/patient', JSON.stringify(data), { headers: headers });
  }

  getPatients() {
    return patients;
  }

  getDoctors() {
    return doctors;
  }
}
