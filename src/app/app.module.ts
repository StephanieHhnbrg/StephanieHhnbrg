import {NgModule, provideZoneChangeDetection} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {routes} from "./app.routes";
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GithubIconComponent} from "./components/github-icon/github-icon.component";
import {SplineAnimationComponent} from "./components/spline-animation/spline-animation.component";
import {CvPdfDialog} from "./components/cv-pdf-dialog/cv-pdf-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {BlogArticlesComponent} from "./components/blog-articles/blog-articles.component";
import {SpeakerSessionsComponent} from "./components/speaker-sessions/speaker-sessions.component";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {CertificationsComponent} from "./components/certifications/certifications.component";
import {MatDividerModule} from "@angular/material/divider";
import {MonthYearPipe} from "./pipes/month-year.pipe";
import {TabNavigatorComponent} from "./components/tab-navigator/tab-navigator.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BurgerIconNavigatorComponent} from "./components/burger-icon-navigator/burger-icon-navigator.component";
import {ContactButtonsComponent} from "./components/contact-buttons/contact-buttons.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ChatButtonComponent} from "./components/chat-button/chat-button.component";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SplineAnimationComponent,
    ToolbarComponent,
    GithubIconComponent,
    CvPdfDialog,
    BlogArticlesComponent,
    SpeakerSessionsComponent,
    CertificationsComponent,
    TabNavigatorComponent,
    BurgerIconNavigatorComponent,
    ContactButtonsComponent,
    ChatComponent,
    ChatButtonComponent,
    MonthYearPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule,
    MatCardModule, MatChipsModule, MatDividerModule, MatSnackBarModule, MatBottomSheetModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule
  ],
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
