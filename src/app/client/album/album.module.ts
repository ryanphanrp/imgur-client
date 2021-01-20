import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListAlbumComponent } from './list-album/list-album.component';
import { UpdateAlbumComponent } from './update-album/update-album.component';
import { DetailAlbumComponent } from './detail-album/detail-album.component';

/** Ant Module */
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';


/** Component */
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const antModule = [
  NzMessageModule,
  NzDrawerModule,
  NzProgressModule,
  NzModalModule,
  NzNotificationModule,
  NzFormModule,
  NzSelectModule
]


@NgModule({
  declarations: [AlbumComponent, CreateAlbumComponent, ListAlbumComponent, UpdateAlbumComponent, DetailAlbumComponent, UploadImagesComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    antModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlbumModule { }
