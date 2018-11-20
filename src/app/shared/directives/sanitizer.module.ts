import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizer.pipe';

@NgModule({
  imports: [],
  declarations: [SanitizeHtmlPipe],
  exports: [SanitizeHtmlPipe]
})
export class SanitizerModule {
  static forRoot() {
    return {
      ngModule: SanitizerModule,
      providers: []
    };
  }
}
