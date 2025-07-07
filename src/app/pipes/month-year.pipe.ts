import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'monthYear',
  pure: false
})
export class MonthYearPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    };

    const lang = this.translate.currentLang || 'en';
    return date.toLocaleDateString(lang, options);
  }

}
