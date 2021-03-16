import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ListPatientsRoutingModule } from './list-patients-routing.module';
import { ListPatientsComponent } from './list-patients.component';
import { MatTableModule } from '@angular/material/table';
import { ShowPatientComponent } from './show-patient/show-patient.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@app/@shared/shared.module';
// import { SharedModule } from '@app/@shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    FlexLayoutModule,
    MaterialModule,
    MatTableModule,
    ListPatientsRoutingModule,
  ],
  declarations: [ListPatientsComponent, ShowPatientComponent],
})
export class ListPatientsModule {}
