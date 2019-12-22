import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Album } from './album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumsUrl = 'api/albums';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAlbum(id: number): Observable<Album> {
    if (id === 0) {
      return of(this.initializeAlbum());
    }
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get<Album>(url)
      .pipe(
        tap(data => console.log('getAlbum: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createAlbum(album: Album): Observable<Album> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    album.id = null;
    return this.http.post<Album>(this.albumsUrl, album, { headers })
      .pipe(
        tap(data => console.log('createAlbum: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteAlbum(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.albumsUrl}/${id}`;
    return this.http.delete<Album>(url, { headers })
      .pipe(
        tap(data => console.log('deleteAlbum: ' + id)),
        catchError(this.handleError)
      );
  }

  updateAlbum(album: Album): Observable<Album> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.albumsUrl}/${album.id}`;
    return this.http.put<Album>(url, album, { headers })
      .pipe(
        tap(() => console.log('updateAlbum: ' + album.id)),
        // Return the product on an update
        map(() => album),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeAlbum(): Album {
    // Return an initialized object
    return {
      id: 0,
      albumName: null,
      albumCode: null,
      albumReleaseDate: null,
      albumAvail:false,
      price: null,
      description: null,
      composer: null,
      artist:null,
      starRating: null,
      imageUrl: null
    };
  }
}
