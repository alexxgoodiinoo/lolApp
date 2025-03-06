import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampsRoutingModule } from './champs-routing.module';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ChampImagePipe } from './pipe/champ-image.pipe';
import { ChampPageComponent } from './pages/champ-page/champ-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ConfigDialogComponent } from './components/config-dialog/config-dialog.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';


@NgModule({
  declarations: [
    CardComponent,
    ChampImagePipe,
    ChampPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    ConfigDialogComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    ChampsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ChampsModule { }
