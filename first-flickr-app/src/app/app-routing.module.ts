
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageSearchComponent  } from './image-search/image-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Imagesearch',
  },
  {
    path: 'Imagesearch',
    component: ImageSearchComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }