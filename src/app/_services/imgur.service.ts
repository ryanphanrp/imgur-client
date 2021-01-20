import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IAlbum, Image } from '../_shared/Imgur';

const API = 'https://api.imgur.com/3/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const userName = 'anh4bi';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  constructor(private http: HttpClient) {
  }

  // https://api.imgur.com/3/account/{username}/images/{page}
  getAllImages(page: number): Observable<Image[]> {
    return this.http.get<any>(API + 'account/' + userName + '/images/0.json?perPage=8&page=' + page, httpOptions).pipe(delay(50),
      map(obs => obs.data));
  }

  getImagesCount(): Observable<any> {
    return this.http.get<any>(API + 'account/' + userName + '/images/count', httpOptions).pipe(
      delay(50),
      map(obs => obs.data)
    );
  }

  getImagesInAlbum(ID: string): Observable<Image[]> {
    while (ID) {
      return this.http.get<any>(API + 'album/' + ID + '/images', httpOptions).pipe(
        delay(50),
        map(obs => obs.data));
    }
    return of([]);
  }

  createAlbum(payload): Observable<any> {
    return this.http.post(API + 'album', {
      title: payload.title,
      description: payload.description,
      privacy: payload.privacy
    }, httpOptions).pipe(delay(50));
  }

  getAlbums(): Observable<IAlbum[]> {
    return this.http.get<any>(API + 'account/' + userName + '/albums', httpOptions).pipe(map(obs => obs.data),
    delay(50));
  }

  getSingleAlbum(id: string): Observable<IAlbum> {
    return this.http.get<any>(API + 'album/' + id, httpOptions).pipe(
      map(obs => obs.data),
      delay(50)
    )
  }

  updateAlbum(payload: any, id: string): Observable<any> {
    return this.http.post(API + 'album/' + id, {
      title: payload.title,
      description: payload.description,
      privacy: payload.privacy
    }, httpOptions).pipe(delay(50));
  }

  deleteAlbum(payload: any): Observable<any> {
    return this.http.delete(API + 'album/' + payload, httpOptions).pipe(delay(50));
  }

  /**
   * Image Services
   */
  uploadImage(file: File, idOfAlbum: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // Append fields
    formData.append('image', file);
    formData.append('album', idOfAlbum);
    return this.http.post(API + 'image', formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete(API + 'image/' + id, httpOptions).pipe(delay(50));
  }
}