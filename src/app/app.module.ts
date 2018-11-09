import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { FormsModule } from '@angular/forms';
import { MaterialNavigationModule } from './shared/modules/material/material-navigation.module';
import { MaterialIndicatorModule } from './shared/modules/material/material-indicator.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialButtonModule,
    MaterialIndicatorModule,
    MaterialNavigationModule
  ],
  exports: [],
  providers: [AngularWordpressApiService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
