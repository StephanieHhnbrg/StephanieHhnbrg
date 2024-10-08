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
import {WorkPageComponent} from "./pages/work-page/work-page.component";
import { SkillPageComponent } from './pages/skill-page/skill-page.component';
import { SchoolPageComponent } from './pages/school-page/school-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GithubIconComponent} from "./components/github-icon/github-icon.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CarouselComponent} from "./components/carousel/carousel.component";
import {BannerComponent} from "./components/banner/banner.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WorkPageComponent,
    SkillPageComponent,
    SchoolPageComponent,
    HomePageComponent,
    GithubIconComponent,
    CarouselComponent,
    BannerComponent
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
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule
  ],
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
