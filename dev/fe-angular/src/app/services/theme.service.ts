import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  isDarkTheme: boolean = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme) {
      this.setCustomProperty('--primary', '#FFFCF2');
      this.setCustomProperty('--secondary', '#C9C6BE');
      this.setCustomProperty('--third', '#92908A');
      this.setCustomProperty('--fourth', '#5C5A56');
      this.setCustomProperty('--fifth', '#252422');
      this.setCustomProperty('--accent', '#EB5E28');
    }else{

      this.setCustomProperty('--primary', '#252422');
      this.setCustomProperty('--secondary', '#5C5A56');
      this.setCustomProperty('--third', '#92908A');
      this.setCustomProperty('--fourth', '#C9C6BE');
      this.setCustomProperty('--fifth', '#FFFCF2');
      this.setCustomProperty('--accent', '#CB4B21');
    }
  }

  setCustomProperty(propertyName: string, value: string): void {
    document.documentElement.style.setProperty(propertyName, value);
  }
}
