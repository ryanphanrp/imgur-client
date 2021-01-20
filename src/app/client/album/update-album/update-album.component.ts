import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ImgurService } from 'src/app/_services/imgur.service';
import { IAlbum } from 'src/app/_shared/Imgur';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {
  alForm: FormGroup;
  thisAlbum: IAlbum;


  constructor(
    private fb: FormBuilder,
    private imgurService: ImgurService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getThisAlbum();
    this.alForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      privacy: ['', []]
    });
    
  }

  getThisAlbum(): void {
    // Using Higher-Order Observable to avoid nested subscribe anti-pattern
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('id')),
      switchMap(ID => this.imgurService.getSingleAlbum(ID))
    ).subscribe(
      next => {
        this.thisAlbum = next;
        this.alForm.patchValue({
          title: this.thisAlbum?.title,
          description: this.thisAlbum?.description
        });
      }
    )
  }


  submitForm(): void {
    this.imgurService.updateAlbum(this.alForm.value, this.thisAlbum.id).subscribe(
      next => {
        this.notification.success('SUCCESS', 'Create album successfully!');
        this.router.navigate(['./']);
      },
      err => {
        this.notification.error('ERROR', err.error.message);
      }
    );
  }
}
