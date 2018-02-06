import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(()=>{
  if('serviceWorker' in navigator){ // To check if the service Worker is in the Browser Navigator.And if True,  Register the Service Worker
    navigator.serviceWorker.register('/ngsw-worker.js')
  }
}) 
  .catch(err => console.log(err));
