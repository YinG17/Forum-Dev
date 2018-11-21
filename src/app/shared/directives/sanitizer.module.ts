import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizer.pipe';
import { SanitizeUrlPipe } from './urlSanitizer.pipe';

@NgModule({
  imports: [],
  declarations: [SanitizeHtmlPipe, SanitizeUrlPipe],
  exports: [SanitizeHtmlPipe, SanitizeUrlPipe]
})
export class SanitizerModule {
  static forRoot() {
    return {
      ngModule: SanitizerModule,
      providers: []
    };
  }
}
