import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AlbumEditComponent } from './album-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AlbumEditGuard implements CanDeactivate<AlbumEditComponent> {
  canDeactivate(component: AlbumEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.albumForm.dirty) {
      const albumName = component.albumForm.get('albumName').value || 'New Album';
      return confirm(`Navigate away and lose all changes to ${albumName}?`);
    }
    return true;
  }
}
