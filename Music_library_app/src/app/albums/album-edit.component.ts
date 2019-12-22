import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Album } from './album';
import { AlbumService } from './album.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './album-edit.component.html'
})
export class AlbumEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Album Edit';
  errorMessage: string;
  albumForm: FormGroup;

  album: Album;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.albumForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private albumService: AlbumService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      albumName: {
        required: 'Album name is required.',
        minlength: 'Album name must be at least three characters.',
        maxlength: 'Album name cannot exceed 50 characters.'
      },
      albumCode: {
        required: 'Album code is required.'
      },
      starRating: {
        range: 'Rate the Album between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      albumName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      albumCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      artist:'',
      composer:'',
      description: '',
      albumReleaseDate:''
    });

    // Read the album Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAlbum(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.albumForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.albumForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getAlbum(id: number): void {
    this.albumService.getAlbum(id)
      .subscribe({
        next: (album: Album) => this.displayAlbum(album),
        error: err => this.errorMessage = err
      });
  }

  displayAlbum(album: Album): void {
    if (this.albumForm) {
      this.albumForm.reset();
    }
    this.album = album;

    if (this.album.id === 0) {
      this.pageTitle = 'Add Album';
    } else {
      this.pageTitle = `Edit Album: ${this.album.albumName}`;
    }

    // Update the data on the form
    this.albumForm.patchValue({
      albumName: this.album.albumName,
      albumCode: this.album.albumCode,
      starRating: this.album.starRating,
      description: this.album.description,
      artist: this.album.artist,
      composer: this.album.composer,
      albumReleaseDate:this.album.albumReleaseDate
    });
  }

  deleteAlbum(): void {
    if (this.album.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the album: ${this.album.albumName}?`)) {
        this.albumService.deleteAlbum(this.album.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveAlbum(): void {
    if (this.albumForm.valid) {
      if (this.albumForm.dirty) {
        const p = { ...this.album, ...this.albumForm.value };

        if (p.id === 0) {
          this.albumService.createAlbum(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.albumService.updateAlbum(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.albumForm.reset();
    this.router.navigate(['/albums']);
  }
}
