import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-main',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'] // Stilizimi i rregulluar
})
export class ImageSearchComponent implements OnInit {
  images: any[] = [];
  page = 1;
  loading = false;
  search: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadImages();
    console.log(this.search);
  }

  searchImages() {
    if (this.search.length > 0) {
      this.apiService.searchImages(this.search, this.page).subscribe((data: any) => {
        this.images = data.photos.photo;
      });
    }
  }

  loadImages(): void {
    this.loading = true;
    this.apiService.getImages(this.page).subscribe(
      (data: any) => {
        this.images = this.images.concat(data.photos.photo);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.loading = false;
      }
    );
  }

  getPhotoUrl(photo: any): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
  

  onScroll(): void {
    if (!this.loading) {
      this.page++;
      if (this.search.length > 0) {
        this.searchImages();
      } else {
        this.loadImages();
      }
    }
  }
}
