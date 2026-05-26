import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScheduleService } from '../../services/schedule-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  scheduleService = inject(ScheduleService);

  navbarMobileVisible: boolean = false;

  toggleMobileMenu(): void {
    this.navbarMobileVisible = !this.navbarMobileVisible;
  }
}
