import { Routes } from '@angular/router';
import {SpeakerSessionsComponent} from "./components/speaker-sessions/speaker-sessions.component";
import {CertificationsComponent} from "./components/certifications/certifications.component";
import {BlogArticlesComponent} from "./components/blog-articles/blog-articles.component";

// remember to update sitemap.xml, when adding new routes
export const routes: Routes = [
  { path: 'articles', component: BlogArticlesComponent },
  { path: 'talks', component: SpeakerSessionsComponent },
  { path: 'certs', component: CertificationsComponent },
  { path: '', component: BlogArticlesComponent },
];
