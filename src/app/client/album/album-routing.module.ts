import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { DetailAlbumComponent } from './detail-album/detail-album.component';
import { ListAlbumComponent } from './list-album/list-album.component';
import { UpdateAlbumComponent } from './update-album/update-album.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumComponent,
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ListAlbumComponent
      },
      {
        path: 'create',
        component: CreateAlbumComponent
      },
      {
        path: 'detail/:id',
        component: DetailAlbumComponent
      },
      {
        path: 'detail/:id/update',
        component: UpdateAlbumComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
