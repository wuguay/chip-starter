import '../imports/polyfills';
import { Meteor } from 'meteor/meteor';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../imports/app/app.module';
import { isBlank } from '@bomip/core';
// import { ChipIonicModule } from '@chip/ionic';

import * as fp from 'lodash/fp';

export default function ionicSelector(selector?: string) {
    const app = document.querySelector(selector || "app");
    const ionApp = document.createElement("ion-app");

    fp.map((v: any, ...args: any[]) => {
        const {name, value} = v;
        ionApp.setAttribute(name, value);
    }, app.attributes);

    document.body.replaceChild(ionApp, app);
}

function setClass(css: string): void {
    // document.body.className = compact([document.body.className, css]).join(' ');
    document.body.className = [document.body.className, css].join(' ');
}

function removeSpinner() {
    const circle = document.getElementById("sk-circle");
    setTimeout(function () {
        circle.parentNode.removeChild(circle);
    }, 2000);
}

Meteor.startup(() => {
  if (Meteor.isProduction) {
    enableProdMode();
  }

const isCordova = true;

  // if (Meteor.isCordova) {
  if (isCordova) {
      console.log('!isCordova');
      // document.addEventListener('deviceready', () => {
      ionicSelector('app');
      setClass('mobile');
      // platformBrowserDynamic().bootstrapModule(ChipIonicModule);
      module.dynamicImport('@chip/ionic')
      .then(({ChipIonicModule}) => platformBrowserDynamic().bootstrapModule(ChipIonicModule));

  } else {
      console.log('Web');
      setClass('web');
      platformBrowserDynamic().bootstrapModule(AppModule);
      // module.dynamicImport('@chip/material')
      // .then(({ChipMaterialModule}) => platformBrowserDynamic().bootstrapModule(ChipMaterialModule));
  }
  removeSpinner();

});
