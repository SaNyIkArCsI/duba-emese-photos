import { Component, OnInit, Input } from '@angular/core';
import {Album} from '../gallery.component';
import {faChevronRight, faChevronLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  public rightArrow = faChevronRight;
  public leftArrow = faChevronLeft;
  public close = faTimes;

  @Input() album: Album;

  private dom;
  private currentPicture;

  public hideAlbumContainer: boolean;

  public getThumbnailFileName(fileName: string): string {
    const splitName: string[] = fileName.split('.');
    let thumbnailName = '';
    for (let i = 0; i < splitName.length - 2; i++) {
      thumbnailName += splitName[i] + '.';
    }
    thumbnailName += splitName[splitName.length - 2] + '_tn.' + splitName[splitName.length - 1];
    console.log(thumbnailName);
    return thumbnailName;
  }

  constructor() {
    this.hideAlbumContainer = true;
  }

  ngOnInit() {
    this.currentPicture = this.album.defaultPicture;
  }

  public nextPic() {
    this.currentPicture = this.getNextPictureIndex();
    this.setPictureByIndex();
  }
  public prevPic() {
    this.currentPicture = this.getPrevPictureIndex();
    this.setPictureByIndex();
  }

  public getPrevPictureIndex() {
    return this.currentPicture === 0 ? this.album.pictures.length - 1 : this.currentPicture - 1;
  }
  public getNextPictureIndex() {
    return (this.currentPicture + 1) % this.album.pictures.length;
  }

  public setPictureByIndex(index: number = this.currentPicture) {
    this.currentPicture = index;
    const image = <HTMLImageElement>this.DOM().getElementsByClassName('image-holder')[0].firstChild;
    image.src = this.album.folderName + this.album.pictures[this.currentPicture].url;
  }

  public toggleModal() {
    this.hideAlbumContainer = !this.hideAlbumContainer;
    const body = <HTMLElement>document.getElementsByTagName('BODY')[0];
    if (!this.hideAlbumContainer) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }

  private DOM(): HTMLElement {
    if (!this.dom) {
      this.dom = <HTMLElement>document.getElementById(this.album.id);
    }
    return this.dom;
  }

  // Always make thumbnails example converter: http://makethumbnails.com/
}
