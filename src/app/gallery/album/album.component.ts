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

  constructor() {
    this.hideAlbumContainer = true;
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

  ngOnInit() {
    this.currentPicture = this.album.defaultPicture;
  }
}
