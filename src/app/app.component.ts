import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatSlideToggleModule],
  template:`<router-outlet><router-outlet>`
})
export class AppComponent {
  title = 'items';
  constructor(private translate:TranslateService){
    const currentLang= localStorage.getItem('lang')
    if (currentLang) {
      translate.setDefaultLang(currentLang);
      translate.use(currentLang)
    }
    else
    localStorage.setItem('lang','en');
  console.log(currentLang);
  
  }
}
