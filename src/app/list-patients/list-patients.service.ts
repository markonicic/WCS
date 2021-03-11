import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import patients from '../@shared/databases/patients.json';
import doctors from '../@shared/databases/doctors.json';

@Injectable({
  providedIn: 'root',
})
export class ListPatientsService {
  public singlePatient: any;

  constructor(private http: HttpClient) {}

  getPatients() {
    return patients;
  }

  getDoctors() {
    return doctors;
  }
}
