import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediumService} from "../../services/medium.service";
import {BlogArticle} from "../../data/blog-article.data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-blog-articles',
  templateUrl: './blog-articles.component.html',
  styleUrl: './blog-articles.component.css'
})
export class BlogArticlesComponent implements OnInit, OnDestroy{

  public articles: BlogArticle[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private mediumService: MediumService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.mediumService.fetchBlogArticles()
      .subscribe(result => { this.articles = result}));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }
}
