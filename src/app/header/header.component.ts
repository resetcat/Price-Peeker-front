import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  initializeTheme() {
    const theme = localStorage.getItem('theme') || 'cupcake';
    document.body.setAttribute('data-theme', theme);
    this.isDarkTheme = theme === 'business';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const newTheme = this.isDarkTheme ? 'business' : 'cupcake';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (this.isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
