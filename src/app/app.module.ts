import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
