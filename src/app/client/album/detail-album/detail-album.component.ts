import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ImgurService } from 'src/app/_services/imgur.service';
import { IAlbum, Image } from 'src/app/_shared/Imgur';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';


@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.scss']
})
export class DetailAlbumComponent implements OnInit {

  visible = false;
  isShowDescription = false;
  isEditing = false;
  thisAlbum: IAlbum;
  idList: string[] = []
  isVisible: boolean;
  imgUrl: string;
  placement: NzDrawerPlacement = 'right';


  constructor(
    private activatedRoute: ActivatedRoute,
    private imgurService: ImgurService,
    private router: Router,
    private nzMessageService: NzMessageService,
    private modal: NzModalService
    ) { }

  ngOnInit(): void {
    this.getThisAlbum();
  }

  getThisAlbum(): void {
    // Using Higher-Order Observable to avoid nested subscribe anti-pattern
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('id')),
      switchMap(ID => this.imgurService.getSingleAlbum(ID))
    ).subscribe(item => this.thisAlbum = item);
  }

  backToList() {
    this.router.navigate(['/list']);
  }

  /** Images */
  deleteThisImage(id: string): void {
    this.imgurService.deleteImage(id).subscribe(
      next => {
        this.nzMessageService.success(`Delete this image successfully!`);
        this.getThisAlbum();
      },
      err => {
        this.nzMessageService.error(`Something went wrong.`);
      }
    );
  }


  /** Drawer */
  open(): void {
    this.visible = true;
    this.onResizeChange();
  }

  close(): void {
    this.visible = false;
  }

  /** Editing */
  switchMode(): void {
    this.isEditing = !this.isEditing;
  }

  onChangeCheckbox(isChecked: any, ID: string): void {
    if (isChecked.target.checked) {
      this.idList.push(ID);
    } else {
      this.idList = this.idList.filter(id => id !== ID);
    }
  }

  /** Modal comfirm */
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this images?',
      nzContent: '<b style="color: red;">You cant restore them.</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAllSelectedImage(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteAllSelectedImage(): void {
    for (const item of this.idList) {
      this.deleteThisImage(item);
    }
    this.idList = [];
  }

  
  /**
   *  Modal show image
   */
  showModal(url: string): void {
    this.isVisible = true;
    this.imgUrl = url;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  /** Responsive */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const sizeW = window.innerWidth;
    if(sizeW <= 600) {
      this.placement = 'bottom';
    } else {
      this.placement = 'right';
    }
  }
  
  onResizeChange() {
    const sizeW = window.innerWidth;
    if(sizeW <= 600) {
      this.placement = 'bottom';
    }
  }

  /** Delete this album */

  showDeleteAlbumConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this album?',
      nzContent: '<b style="color: red;">You cant restore it.</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteThisAlbum(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteThisAlbum(): void {
    this.imgurService.deleteAlbum(this.thisAlbum.id).subscribe(
      next => {
        this.nzMessageService.success(`Delete this album successfully!`);
        this.router.navigate(['./']);
      }
    )
  }

}
