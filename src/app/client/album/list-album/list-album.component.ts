import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImgurService } from 'src/app/_services/imgur.service';
import { IAlbum } from 'src/app/_shared/Imgur';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent implements OnInit {

  listAlbums$: Observable<IAlbum[]>;

  constructor(private imgurService: ImgurService) { }

  ngOnInit(): void {
    this.listAlbums$ = this.imgurService.getAlbums();
  }

}
