import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { ImgurService } from 'src/app/_services/imgur.service';
import { IProgress } from 'src/app/_shared/Imgur';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {

  // Upload Image
  selectedFiles: FileList | any;
  message = '';
  fileInfos: Observable<any> | undefined;

  listProgress: IProgress[] = [];
  count = 0;

  //Select file
  @ViewChild('selectfile') fileSelection: ElementRef;
  messageCount = `Select file`;

  // Albums - Optional
  @Input() idOfAlbum = '';
  @Output() isSuccess = new EventEmitter<boolean>();

  constructor(
    private imgurService: ImgurService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  // Changes Detection
  ngOnChanges(changes: SimpleChanges): void {
    const key = 'idOfAlbum';
    if (changes[key]) {
      this.idOfAlbum = changes?.idOfAlbum?.currentValue;
    }
  }

  // Upload Image
  clickSelectFiles(): void {
    const ele = this.fileSelection.nativeElement as HTMLElement;
    ele.click();
  }

  selectFile(event: any): void {
    this.listProgress = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length) {
      this.messageCount = `${this.selectedFiles.length} files selected`;
    } else {
      this.messageCount = `Select file`;
    }
    
  }

  upload(): void {
    // Select file to upload
    for (let idx = 0; idx < this.selectedFiles.length; idx++) {
      this.listProgress.push({
        preview: '',
        title: this.selectedFiles.item(idx).name,
        percentage: 0,
        show: true,
        status: 'active'
      });
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles.item(idx));
      reader.onload = (event) => {
        if (typeof reader.result === 'string') {
          this.listProgress[idx].preview = reader.result;
        }
      };
      this.uploadAImage(idx, this.selectedFiles.item(idx));
    }
    this.selectedFiles = undefined;
  }

  uploadAImage(idx: number, uploadFile: File): void {
    this.imgurService.uploadImage(uploadFile, this.idOfAlbum).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.listProgress[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.listProgress[idx].status = 'success';
          this.nzMessageService.success(`Upload Successfully!!!`);
          this.isSuccess.emit(true);
        }
      },
      err => {
        this.nzMessageService.error( `Can't Upload this image!!!`);
        this.listProgress[idx].status = 'exception';
      });
  }
}
