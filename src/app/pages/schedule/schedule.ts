import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule-service';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule {
  scheduleService = inject(ScheduleService);
}
