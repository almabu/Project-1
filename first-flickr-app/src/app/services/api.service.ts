
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getImages(page: number): Observable<any> {
    const apiKey = 'd01620d2161ae065d78112bd68695d93';
    const perPage = 20; 
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&per_page=${perPage}&page=${page}`;
    return this.http.get<any>(apiUrl);
  }

  searchImages(search:string,page:number){
    const apiKey = 'd01620d2161ae065d78112bd68695d93';
    const perPage = 20; 
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&text=${search}&method=flickr.photos.search&nojsoncallback=1&per_page=${perPage}&page=${page}`;
    return this.http.get(apiUrl);
  }
}