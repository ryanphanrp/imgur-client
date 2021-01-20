import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgurService } from 'src/app/_services/imgur.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {

  alForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private imgurService: ImgurService,
    private notification: NzNotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.alForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      privacy: ['', []]
    });
  }

  submitForm(): void {
    this.imgurService.createAlbum(this.alForm.value).subscribe(
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
