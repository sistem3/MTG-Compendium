import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ThemePreset } from './theme-preset';

import { mainRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withXhr()),
    provideZonelessChangeDetection(),
    provideRouter(mainRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ThemePreset
      }
    })
  ]
};
