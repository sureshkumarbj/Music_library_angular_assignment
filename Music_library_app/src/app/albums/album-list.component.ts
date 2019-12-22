import { Component, OnInit } from '@angular/core';

import { Album } from './album';
import { AlbumService } from './album.service';

@Component({
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  pageTitle = 'Music List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  _listFilterComposer='';
  _listFilterArtist='';
  _listFilterReleaseDate='';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAlbums = this.listFilter ? (this.performFilter(this.listFilter) ): this.albums;
  }
  get listFilterReleaseDate(): string {
    return this._listFilterReleaseDate;
  }
  set listFilterReleaseDate(value: string) {
    this._listFilterReleaseDate = value;
    this.filteredAlbums = this.listFilterReleaseDate ? (this.performFilterReleaseDate(this.listFilterReleaseDate) ): this.albums;
  }
  get listFilterArtist(): string {
    return this._listFilterArtist;
  }
  set listFilterArtist(value: string) {
    this._listFilterArtist = value;
    this.filteredAlbums = this.listFilterArtist ? (this.performFilterArtist(this.listFilterArtist) ): this.albums;
  }
  get listFilterComposer(): string {
    return this._listFilterComposer;
  }
  set listFilterComposer(value: string) {
    this._listFilterComposer = value;
    this.filteredAlbums = this.listFilterComposer ? (this.performComposerFilter(this.listFilterComposer) ): this.albums;
  }

  filteredAlbums: Album[] = [];
  filteredComposerAlbums: Album[] = [];
  albums: Album[] = [];

  constructor(private albumService: AlbumService) { }

  performFilter(filterBy: string): Album[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.albums.filter((album: Album) =>
      album.albumName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performComposerFilter(filterBy: string): Album[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.albums.filter((album: Album) =>
    album.composer.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  performFilterArtist(filterBy: string): Album[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.albums.filter((album: Album) =>
    album.artist.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  performFilterReleaseDate(filterBy: string): Album[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.albums.filter((album: Album) =>
    album.albumReleaseDate.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: albums => {
        this.albums = albums;
        this.filteredAlbums = this.albums;
      },
      error: err => this.errorMessage = err
    });
  }
}
