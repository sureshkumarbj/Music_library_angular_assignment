import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AlbumData } from './album-data';

import { AlbumListComponent } from './album-list.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumEditComponent } from './album-edit.component';
import { AlbumEditGuard } from './album-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(AlbumData),
    RouterModule.forChild([
      { path: 'albums', component: AlbumListComponent },
      { path: 'albums/:id', component: AlbumDetailComponent },
      {
        path: 'albums/:id/edit',
        canDeactivate: [AlbumEditGuard],
        component: AlbumEditComponent
      }
    ])
  ],
  declarations: [
    AlbumListComponent,
    AlbumDetailComponent,
    AlbumEditComponent
  ]
})
export class AlbumModule { }
