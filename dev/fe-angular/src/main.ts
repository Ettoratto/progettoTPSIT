import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
      //provideRouter(routes),
      provideHttpClient(), provideAnimationsAsync()
  ]
}).catch((err) =>
  console.error(err)
);
