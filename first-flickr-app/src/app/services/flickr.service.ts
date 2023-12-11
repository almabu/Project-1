import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private apiKey = 'd01620d2161ae065d78112bd68695d93'; // Replace with your actual API key
  private prevKeyword: string | undefined;
  private currPage = 1;

  constructor(private http: HttpClient) { }

  searchKeyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;

    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${this.apiKey}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}`;

    return this.http.get(url + params).pipe(map((res: any) => {
      return (res.photos && res.photos.photo)
        ? res.photos.photo.map((ph: any) => ({
            farm: ph.farm,
            server: ph.server,
            id: ph.id,
            secret: ph.secret,
            title: ph.title,
          }))
        : [];
    }));
  }
}