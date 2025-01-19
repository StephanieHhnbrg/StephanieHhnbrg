import {Component, Inject} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-cv-pdf-dialog',
  templateUrl: './cv-pdf-dialog.component.html',
  styleUrl: './cv-pdf-dialog.component.css'
})
export class CvPdfDialog {

  public link;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { link: string},
              private sanitizer: DomSanitizer) {
    this.link = sanitizer.bypassSecurityTrustResourceUrl(data.link);
  }

}
