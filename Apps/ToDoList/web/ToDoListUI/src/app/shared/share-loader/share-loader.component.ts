import { Component, DoCheck, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-share-loader',
  templateUrl: './share-loader.component.html',
  styleUrls: ['./share-loader.component.css']
})
export class ShareLoaderComponent implements OnInit, DoCheck{

  showLoader = false;

  constructor(
    public sharedService: SharedService
  ) { }
  ngDoCheck(): void {
    if(this.showLoader != this.sharedService.isLoaderActive){
      this.showLoader = this.sharedService.isLoaderActive
    }

  }

  ngOnInit(): void {
    this.showLoader = this.sharedService.isLoaderActive
  }


}
