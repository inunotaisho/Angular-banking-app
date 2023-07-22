import {Component} from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {

  isDarkMode = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleTheme(ev: any): void {
    ev.stopPropagation()
    console.log('light')
  }


}
