import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ListPatientsComponent } from './list-patients.component';
import { ShowPatientComponent } from './show-patient/show-patient.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ListPatientsComponent, data: { title: marker('List Patient') } },
  { path: ':id', component: ShowPatientComponent, data: { title: marker('Show Patient') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListPatientsRoutingModule {}
