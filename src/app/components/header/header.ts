import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  navbarMobileVisible: boolean = false;

  toggleMobileMenu(): void {
    this.navbarMobileVisible = !this.navbarMobileVisible;
  }
}
